import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import BlogItem from "../../components/blog/Item";

import styles from "../../styles/blog/blog.module.scss"
import { getPosts, Post } from "../../utils/blog";

type Props = {
  posts: Post[]
}

const Blog: NextPage<Props> = ({ posts }) => {
  return <div className={styles.container} >
    <Head>
      <title>Blog | Liam Clegg</title>
    </Head>

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

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=60'
  )

  const results = await getPosts() || [];

  return {
    props: {
      posts: results
    }
  }
}

export default Blog;