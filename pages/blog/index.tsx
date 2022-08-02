import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import BlogItem from "../../components/blog/Item";

import styles from "../../styles/blog/blog.module.scss"
import { getPosts, Post } from "../../utils/blog";

type Props = {
  posts: Post[]
}

const Blog: NextPage<Props> = ({ posts }) => {
  return <div className={styles.container} >
    <div className={styles.content}>
      <div className={styles.grid}>
        {
          posts.map((post, i) => (
            <BlogItem key={i} post={post}></BlogItem>
          ))
        }
      </div>
    </div>
  </div>
}

export const getStaticProps: GetStaticProps = async () => {
  const results = await getPosts() || [];

  return {
    props: {
      posts: results
    }
  }
}

export default Blog;