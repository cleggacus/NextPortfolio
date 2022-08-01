import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import styles from "../../../styles/blog/post.module.scss"
import posts, { getPost, Post } from '../../../utils/blog/posts';

type Props = {
  post?: Post
}

const PostPage: NextPage<Props> = ({ post }) => {
  return <div className={styles.container} >
    <div className={styles.content}>
      <div className={styles.info} >
        <h1>{post?.title}</h1>
      </div>

      <div className={styles.thumbnail} >
        <img src={post?.thumbnail}></img>
      </div>
    </div>
  </div>
}

type IParams = {
  id: string
}

export const getStaticProps: GetStaticProps<{},IParams> = async (ctx) => {
  if(!ctx.params)
    return {
      props: {}
    }

  const { id } = ctx.params;
  const post = await getPost(id);

  return {
    props: {
      post
    }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
   let res = await posts() || [];

   return {
     paths: res.map(el => { 
       return {
         params: { 
           id: el.id
         }
       }
     }),
     fallback: false
   }
} 

export default PostPage;
