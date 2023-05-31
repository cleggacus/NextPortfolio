import getPost from "./getPost";
import getPosts from "./getPosts";

export {
  getPost,
  getPosts
};

export type Tag = {
    id: number,
    name: string,
    bg_color_hex: string,
    text_color_hex: string,
}

export type Post = {
    id: number,
    title: string,
    description: string,
    published_at: string,
    cover_image: string,
    tag_list: Tag[],
    tags: string,
    body_markdown: string | undefined
}
