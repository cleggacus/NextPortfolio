import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import getPost from "./getPost";
import getPosts from "./getPosts";

export {
  getPost,
  getPosts
};

export type Post = {
  id: string,
  title: string,
  description: string,
  created: string,
  thumbnail: string,
  tags: {
    color: string,
    name: string
  }[],
  blocks?: BlockObjectResponse[]
}
