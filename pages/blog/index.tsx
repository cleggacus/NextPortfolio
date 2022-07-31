import { GetServerSideProps, NextPage } from "next";
import BlogItem from "../../components/blog/Item";

import styles from "../../styles/blog/blog.module.scss"
import posts, { Post } from "../../utils/blog/posts";

type Props = {
  posts: Post[]
}

const Blog: NextPage<Props> = ({ posts }) => {
  console.log(posts);

  return <div className={styles.container} >
    <div className={styles.content}>
      <div className={styles.grid}>
        {
          posts.map(post => (
            <BlogItem post={post}></BlogItem>
          ))
        }
        {/* <BlogItem blogInfo={testBlogInfo}></BlogItem>
        <BlogItem blogInfo={testBlogInfo}></BlogItem>
        <BlogItem blogInfo={testBlogInfo}></BlogItem>
        <BlogItem blogInfo={testBlogInfo}></BlogItem>
        <BlogItem blogInfo={testBlogInfo}></BlogItem>
        <BlogItem blogInfo={testBlogInfo}></BlogItem>
        <BlogItem blogInfo={testBlogInfo}></BlogItem>
        <BlogItem blogInfo={testBlogInfo}></BlogItem>
        <BlogItem blogInfo={testBlogInfo}></BlogItem> */}
      </div>
    </div>
  </div>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const results = await posts() || [];

  return {
    props: {
      posts: results
    }
  }
}
// 
export default Blog;