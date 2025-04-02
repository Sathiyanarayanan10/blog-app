import { Link } from "react-router-dom";
import Image from "./Image";
import {format} from 'timeago.js'




export default function PostListItem({post}) {
  
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      {/* {console.log(post.img)} */}
      { post.img&&<div className="md:hidden xl:block xl:w-1/3">
        <Image
          src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/${post.img}`}
          className="rounded-2xl object-cover"
          w='735'
        />
      </div>}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-4xl font-semibold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>Written by: </span>
          <Link to={`/posts?author=${post.user.username}`} className="text-blue-700">{post.user.username}</Link>
          <span>on</span>
          <Link to={`/posts?cat=${post.category}`} className="text-blue-700">{post.category}</Link>
          <span>{format(post.createdAt)}</span>
        </div>
        <p>
          {post.desc}
        </p>
        <Link to={`/${post.slug}`} className='text-sm text-blue-900 underline'>Read more...</Link>
      </div>
    </div>
  );
}
