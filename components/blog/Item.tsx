import { FC } from "react";
import styles from "../../styles/blog/item.module.scss"
import Box from "../core/box";
import Image from "next/image";
import { Post } from "../../utils/blog/posts";

type Props = {
  post: Post
}

const BlogItem: FC<Props> = ({ post }) => {
  return <Box className={styles.container}>
    <div className={styles.content}>
      <div className={styles.thumbnail}>
        <div>
          <img className={styles.image} src={post.thumbnail}></img>
        </div>
      </div>

      <div className={styles.info}>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
    </div>
  </Box>
}

export default BlogItem;