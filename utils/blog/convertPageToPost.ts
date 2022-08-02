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

    if(block.type == "image") {
      if(block.image.type == "external") {
        const location = await saveImage(block.image.external.url, `blog/${post.id}`, block.id)
        block.image.external.url = location || block.image.external.url;
      } else {
        const location = await saveImage(block.image.file.url, `blog/${post.id}`, block.id)
        block.image.file.url = location || block.image.file.url;
      }
    }

    post.blocks.push(block);
  }
}

const convertPageToPost = async (page: PageObjectResponse, blocks = false) => {
  const thumbnail = (page.cover?.type == "external" ? page.cover.external.url : page.cover?.file.url) || ""
  const thumbnailLocation = await saveImage(thumbnail, `blog/${page.id}`, "thumbnail");
  const collectedProperties: Properties = await collectProperties(page);

  let post = {
    ...convertPropertiesToPost(collectedProperties),
    id: page.id,
    thumbnail: thumbnailLocation || ""
  }

  if(blocks)
    await addBlocksToPost(post);

  return post;
}

export default convertPageToPost;