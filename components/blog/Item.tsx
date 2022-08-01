import { FC } from "react";
import styles from "../../styles/blog/item.module.scss"
import Box from "../core/box";
import Image from "next/image";
import { Post } from "../../utils/blog/posts";
import Link from "next/link";

type Props = {
  post: Post
}

const BlogItem: FC<Props> = ({ post }) => {
  const date = new Date(post.created);

  const getMonth = () => {
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }

  const getHours = () => {
    const hours = date.getHours();

    if(hours > 12)
      return hours - 12;

    if(hours == 0)
      return 12;

    return hours;
  }

  const isAM = () => {
    return date.getHours() < 12;
  }

  return <Link href={`/blog/post/${post.id}`}>
    <Box className={styles.container}>
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          <img className={styles.image} src={post.thumbnail}></img>
        </div>

        <div className={styles.info}>
          <p className={styles.date}>{date.getDate()} {getMonth()} {date.getFullYear()},&nbsp;&nbsp;{getHours()}:{date.getMinutes()} {isAM() ? "AM" : "PM"}</p>
          <h2>{post.title}</h2>
          <p>{post.description}</p>


          <div className={styles.tags}>
            {
              post.tags.map(tag => (
                <div className={`${styles.tag} ${styles[tag.color]}`}><p>{tag.name}</p></div>
              ))
            }
          </div>
        </div>
      </div>
    </Box>
  </Link>
}

export default BlogItem;