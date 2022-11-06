import { isFullBlock } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Post } from ".";
import collectProperties, { Properties } from "./collectProperties";
import convertPropertiesToPost from "./convertPropertiesToPost";
import notionClient from "./notionClient";
import saveImage from "./saveImage";

const addBlocksToPost = async (post: Post) => {
  let response = (await notionClient.blocks.children.list({
    block_id: post.id
  })).results;

  post.blocks = [];

  for(let block of response) {
    if(!isFullBlock(block)) continue;

    post.blocks.push(block);
  }
}

const convertPageToPost = async (page: PageObjectResponse, blocks = false) => {
  const thumbnail = (page.cover?.type == "external" ? page.cover.external.url : page.cover?.file.url) || ""
  const collectedProperties: Properties = await collectProperties(page);

  let post = {
    ...convertPropertiesToPost(collectedProperties),
    id: page.id,
    thumbnail
  }

  if(blocks)
    await addBlocksToPost(post);

  return post;
}

export default convertPageToPost;