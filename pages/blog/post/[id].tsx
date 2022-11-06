import { BlockObjectResponse, ImageBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { GetStaticProps, NextPage, GetStaticPaths, GetServerSideProps } from 'next';
import styles from "../../../styles/blog/post.module.scss"
import { getPosts, getPost, Post } from '../../../utils/blog';
import getLongDate from '../../../utils/getLongDate';
import Image from "next/image";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Box from '../../../components/core/box';
import Head from 'next/head';

type Props = {
  post?: Post
}

const getImageSrc = (block: ImageBlockObjectResponse) => {
  return block.image.type == "external" ?
    block.image.external.url :
    block.image.file.url
}

const renderBlock = (block: BlockObjectResponse) => {
  switch (block.type) {
    case 'heading_1': 
      return <h1>{block.heading_1.rich_text[0].plain_text}</h1>
    case 'heading_2': 
      return <h2>{block.heading_2.rich_text[0].plain_text}</h2>
    case 'heading_3':
      return <h3>{block.heading_3.rich_text[0].plain_text}</h3>
    case 'paragraph':
      return <p>{
        block.paragraph.rich_text.map((el, i) => {
          if(el.href)
            return <a key={i} href={el.href}>{el.plain_text}</a>

          return <span key={i}>{el.plain_text}</span>;
        })
      }</p>
    case 'code':
      if(block.code.rich_text[0])
        return <Box className={styles.syntaxHighlighter}>
          <SyntaxHighlighter language={block.code.language} >
            {block.code.rich_text[0].plain_text}
          </SyntaxHighlighter>
        </Box>
      return <p></p>
    case 'image': 
      return <div className={styles.image}>
        <Image 
          alt={
            block.image.caption[0] ?
              block.image.caption[0].plain_text :
              "Image has no caption."
          } 
          src={getImageSrc(block)} layout="fill"
        ></Image>
      </div>
  }

  return <></>
}

const PostPage: NextPage<Props> = ({ post }) => {
  return <div className={styles.container} >
    <Head>
      <title>{post?.title}</title>
      <meta name="description" content={post?.description} />
      <meta name="keywords" content={`${post?.tags.join(', ')}, blog, liam clegg blog, cleggacus blog, tech blog, tutorials, coding tutorials, portfolio, web developer, software engineer, frontend developer, backend developer, fullstack developer, liam clegg, clegg, liam, liamclegg, cleggacus, programmer, developer, computer science, swansea, london, swansea university`} />

      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:title" content={post?.title} />
      <meta name="twitter:description" content={post?.description} />
      <meta name="twitter:image" content={post?.thumbnail} />

      <meta property="og:title" content={post?.title} />
      <meta property="og:description" content={post?.description} />
      <meta property="og:image" content={post?.thumbnail} />
      <meta property="og:url" content={`https://liamclegg.co.uk/blog/post/${post?.id}`} />
    </Head>

    <div className={styles.content}>
      <div className={styles.info} >
        <p>{post ? getLongDate(post.created) : ""}</p>
        <h1>{post?.title}</h1>
      </div>

      <div className={styles.thumbnail} >
        <Image alt="Blog post cover image." className={styles.image} src={post?.thumbnail || ""} layout="fill"></Image>
      </div>

      <div className={styles.main}>
        {
          (post?.blocks) ?
            post.blocks.map(block => renderBlock(block)) :
            <></>
        }
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
      post
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
           id: el.id
         }
       }
     }),
     fallback: 'blocking'
   }
} 

export default PostPage;
