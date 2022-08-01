import {Client, isFullBlock, isFullPage} from '@notionhq/client';
import { BlockObjectResponse, GetPagePropertyResponse, ListBlockChildrenResponse, PageObjectResponse, PartialBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

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
  id: string,
  title: string,
  description: string,
  created: string,
  thumbnail: string,
  tags: {
    color: string,
    name: string
  }[],
  blocks?: (PartialBlockObjectResponse | BlockObjectResponse)[]
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
    id: "",
    title: "",
    description: "",
    created: "",
    thumbnail: "",
    tags: []
  };


  let post = {
    id: "",
    title: data.Name.results[0].title.plain_text,
    description: data.Description.results[0].rich_text.plain_text,
    created: data.Created.created_time,
    tags: data.Tags.multi_select.map(res => ({
      name: res.name,
      color: res.color
    })),
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
  let ids: string[] = []

  for (const page of pages.results) {
    if (!isFullPage(page))
      return null;

    const properties: Properties = await collectProperties(page);
    const thumbnail = (page.cover?.type == "external" ? page.cover.external.url : page.cover?.file.url) || ""

    thumbnails.push(thumbnail);
    ids.push(page.id);
    responses.push(properties);
  }

  const posts = responses.map((res, i) => ({
    ...postFromProperties(res),
    thumbnail: thumbnails[i],
    id: ids[i]
  }));

  return posts;
}

const getPost = async (id: string) => {
  const page = await client.pages.retrieve({
    page_id: id,
  });

  if (!isFullPage(page))
    return null;

  const properties: Properties = await collectProperties(page);
  const thumbnail = (page.cover?.type == "external" ? page.cover.external.url : page.cover?.file.url) || "";

  const blocks = await client.blocks.children.list({
    block_id: id
  });

  const post: Post = {
    ...postFromProperties(properties),
    id: id,
    thumbnail,
    blocks: blocks.results
  }

  if(post.blocks)
    console.log(post.blocks[0]);

  return post;
}

export default posts;
export {
  getPost
} 

export type {
  Post
}
