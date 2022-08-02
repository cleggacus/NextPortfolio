import { FC, useState } from "react";
import styles from "../../styles/blog/item.module.scss"
import Box from "../core/box";
import Image from "next/image";
import { Post } from "../../utils/blog";
import Link from "next/link";
import getLongDate from "../../utils/getLongDate";

type Props = {
  post: Post
}

const BlogItem: FC<Props> = ({ post }) => {
  return <Link href={`/blog/post/${post.id}`}>
    <Box className={styles.container}>
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          <Image alt="blog post cover image." layout="fill" className={styles.image} src={post.thumbnail}></Image>
        </div>

        <div className={styles.info}>
          <p className={styles.date}>{getLongDate(post.created)}</p>
          <h2>{post.title}</h2>
          <p>{post.description}</p>


          <div className={styles.tags}>
            {
              post.tags.map((tag, i) => (
                <div key={i} className={`${styles.tag} ${styles[tag.color]}`}><p>{tag.name}</p></div>
              ))
            }
          </div>
        </div>
      </div>
    </Box>
  </Link>
}

export default BlogItem;