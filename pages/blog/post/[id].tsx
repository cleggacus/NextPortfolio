import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import styles from "../../../styles/blog/post.module.scss"
import { getPosts, getPost, Post } from '../../../utils/blog';
import getLongDate from '../../../utils/getLongDate';
import Image from "next/image";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Box from '../../../components/core/box';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import { useEffect } from 'react';

import theme from 'react-syntax-highlighter/dist/cjs/styles/prism/one-light';

type Props = {
  post?: Post,
  date?: number
}

const PostPage: NextPage<Props> = ({ post, date }) => {
  useEffect(() => {
    console.log("generated at:", date);
  }, [date]);

  return <div className={styles.container} >
    <Head>
      <title>{post?.title}</title>
      <meta name="description" content={post?.description} />
      <meta name="keywords" content={`${post?.tags}, blog, liam clegg blog, cleggacus blog, tech blog, tutorials, coding tutorials, portfolio, web developer, software engineer, frontend developer, backend developer, fullstack developer, liam clegg, clegg, liam, liamclegg, cleggacus, programmer, developer, computer science, swansea, london, swansea university`} />

      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:title" content={post?.title} />
      <meta name="twitter:description" content={post?.description} />
      <meta name="twitter:image" content={post?.cover_image} />

      <meta property="og:title" content={post?.title} />
      <meta property="og:description" content={post?.description} />
      <meta property="og:image" content={post?.cover_image} />
      <meta property="og:url" content={`https://liamclegg.co.uk/blog/post/${post?.id}`} />
    </Head>

    <div className={styles.content}>
      <div className={styles.info} >
        <p>{post ? getLongDate(post.published_at) : ""}</p>
        <h1>{post?.title}</h1>
        <div className={styles.tags}>
            {
              post?.tag_list.map((tag, i) => (
                <div key={i} className={`${styles.tag}`} style={{
                    backgroundColor: tag.bg_color_hex,
                    color: tag.text_color_hex,
                }}><p>{tag.name}</p></div>
              ))
            }
        </div>
      </div>

      <div className={styles.thumbnail} >
        <Image alt="Blog post cover image." className={styles.image} src={post?.cover_image || ""} layout="fill"></Image>
      </div>

      <div className={styles.main}>
         <ReactMarkdown
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                <Box className={styles.code}>
                  <SyntaxHighlighter
                    {...props}
                    style={theme}
                    language={match[1]}
                    pre="div"
                  >
                    { String(children).replace(/\n$/, '') }
                  </SyntaxHighlighter>
                </Box>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                )
              }
            }}
         >
            {post?.body_markdown ?? ""}
         </ReactMarkdown>
      </div>

    </div>
  </div>
}

type IParams = {
  id: string
}

export const getStaticProps: GetStaticProps<{},IParams> = async ({ params }) => {
  if(!params)
    return {
      props: {}
    }

  const { id } = params;
  const post = await getPost(id);

  return {
    props: {
      post,
      date: Date.now()
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
   let res = await getPosts() || [];

   return {
     paths: res.map(el => { 
       return {
         params: { 
           id: el.id.toString()
         }
       }
     }),
     fallback: 'blocking'
   }
} 

export default PostPage;
