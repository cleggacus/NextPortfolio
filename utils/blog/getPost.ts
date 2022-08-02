import { isFullPage } from "@notionhq/client";
import convertPageToPost from "./convertPageToPost";
import notionClient from "./notionClient";

const getPost = async (id: string) => {
  const page = await notionClient.pages.retrieve({
    page_id: id
  });

  if (!isFullPage(page))
    return null;

  return await convertPageToPost(page, true);
}

export default getPost;
