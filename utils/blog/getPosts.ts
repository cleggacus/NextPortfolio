import { isFullPage } from '@notionhq/client';
import { Post } from '.';
import convertPageToPost from './convertPageToPost';
import notionClient from "./notionClient";

async function getPosts() {
  const pages = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE || ""
  })

  let posts: Post[] = [];

  for (const page of pages.results) {
    if (!isFullPage(page)) continue;

    posts.push(
      await convertPageToPost(page)
    );
  }

  return posts;
}

export default getPosts;