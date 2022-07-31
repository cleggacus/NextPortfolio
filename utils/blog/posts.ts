import {Client, isFullPage} from '@notionhq/client';
import { GetPagePropertyResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const client = new Client({
  auth: process.env.NOTION_TOKEN,
});

type Properties = {
  [key: string]: GetPagePropertyResponse
}

const collectProperties = async (page: PageObjectResponse) => {
  const properties = page.properties;

  let responses: Promise<GetPagePropertyResponse>[] = [];

  for(const key in properties) {
    responses.push(
      client.pages.properties.retrieve({
        page_id: page.id,
        property_id: properties[key].id
      })
    )
  }

  const responsesParsed = await Promise.all(responses);

  let obj: Properties = {};

  for(let i = 0; i < responsesParsed.length; i++) {
    const key = Object.keys(properties)[i];
    obj[key] = responsesParsed[i];
  }

  return obj;
}

type Post = {
  title: string,
  description: string,
  created: string,
  thumbnail: string,
  tags: string[],
}

const postFromProperties = (data: Properties): Post =>{
  if(!(
    data.Name.object == "list" && 
    data.Name.results[0].type == "title" &&
    data.Description.object == "list" && 
    data.Description.results[0].type == "rich_text" &&
    data.Created.object == "property_item" &&
    data.Created.type == "created_time" &&
    data.Tags.object == "property_item" &&
    data.Tags.type == "multi_select"
  )) return {
    title: "",
    description: "",
    created: "",
    thumbnail: "",
    tags: []
  };


  let post = {
    title: data.Name.results[0].title.plain_text,
    description: data.Description.results[0].rich_text.plain_text,
    created: data.Created.created_time,
    tags: data.Tags.multi_select.map(res => res.name),
    thumbnail: ""
  }

  return post;
}

async function posts() {
  const pages = await client.databases.query({
    database_id: process.env.NOTION_DATABASE || ""
  })

  let responses = [];
  let thumbnails: string[] = []

  for (const page of pages.results) {
    if (!isFullPage(page))
      return null;

    const properties: Properties = await collectProperties(page);
    const thumbnail = (page.cover?.type == "external" ? page.cover.external.url : page.cover?.file.url) || ""

    thumbnails.push(thumbnail);
    responses.push(properties);
  }

  const posts = responses.map((res, i) => ({
    ...postFromProperties(res),
    thumbnail: thumbnails[i]
  }));

  return posts;
}

export default posts;

export type {
  Post
}
