import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import parse from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark  } from "react-syntax-highlighter/dist/esm/styles/prism";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

// 🛠 Fix: Extract full multi-line code block properly
const options = {
  replace: (domNode) => {
    if (domNode.name === "div" && domNode.attribs?.class?.includes("ql-code-block-container")) {
      const codeBlocks = domNode.children
        .filter((child) => child.name === "div" && child.attribs?.class?.includes("ql-code-block"))
        .map((codeNode) => codeNode.children[0]?.data || "");

      if (codeBlocks.length > 0) {
        const language = domNode.children[0].attribs["data-language"] || "javascript"; // Default: JavaScript
        const fullCode = codeBlocks.join("\n"); // Join all lines into a single string

        return (
          <SyntaxHighlighter language={language} style={atomDark}>
            {fullCode}
          </SyntaxHighlighter>
        );
      }
    }
  },
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong..." + error.message;
  if (!data) return "Post not found";

  return (
    <div className="flex flex-col gap-8">
      {/* Post Details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Written by</span>
            <Link className="text-blue-700">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-blue-700">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        {data.img && (
          <div className="hidden lg:block w-2/5">
            <Image
              src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/${data.img}`}
              w="600"
              className="rounded-2xl"
            />
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Text Content */}
        <div className="lg:text-lg flex flex-col gap-6 text-justify">
          {parse(data.content, options)}
        </div>

        {/* Sidebar */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-m font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/user1.png`}
                className="w-8 h-8 rounded-full object-cover"
                w="48"
                h="48"
              />
              <Link className="text-blue-800">{data.user.username}</Link>
            </div>
            <p className="text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <div className="flex gap-2">
              <Link>
                <Image src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/facebook.svg`} />
              </Link>
              <Link>
                <Image src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/instagram.svg`} />
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-4 mb-2 text-m font-medium">Categories to explore</h1>
          <div className="flex flex-col gap-1 text-sm">
            <Link className="underline">All</Link>
            <Link className="underline">Projects</Link>
            <Link className="underline">Development</Link>
            <Link className="underline">Programming</Link>
            <Link className="underline">DSA</Link>
            <Link className="underline">People Stories</Link>
          </div>
          <h1 className="mt-4 mb-2 text-m font-medium">Search</h1>
          <Search />
        </div>
      </div>

      {/* Comments */}
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;


// import { Link, useParams } from "react-router-dom";
// import Image from "../components/Image";
// import PostMenuActions from "../components/PostMenuActions";
// import Search from "../components/Search";
// import Comments from "../components/Comments";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { format } from "timeago.js";
// import parse from "html-react-parser";

// const fetchPost = async (slug) => {
//   const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
//   return res.data;
// };

// const SinglePostPage = () => {
//   const { slug } = useParams();
//   const { isPending, error, data } = useQuery({
//     queryKey: ["post", slug],
//     queryFn: () => fetchPost(slug),
//   });
//   if (isPending) {
//     return "Loading...";
//   }
//   if (error) {
//     return "Something went wrong..." + error.message;
//   }
//   if (!data) {
//     return "Post not found";
//   }
//   return (
//     <div className="flex flex-col gap-8">
//       {/* details */}
//       <div className="flex gap-8">
//         <div className="lg:w-3/5 flex flex-col gap-8">
//           <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
//             {data.title}
//           </h1>
//           <div className="flex items-center gap-2 text-gray-600 text-sm">
//             <span>Written by</span>
//             <Link className="text-blue-700">{data.user.username}</Link>
//             <span>on</span>
//             <Link className="text-blue-700">{data.category}</Link>
//             <span>{format(data.createdAt)}</span>
//           </div>
//           <p className="text-gray-500 font-medium">{data.desc}</p>
//         </div>
//         {data.img && (
//           <div className="hidden lg:block w-2/5">
//             <Image
//               src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/${data.img}`}
//               w="600"
//               className="rounded-2xl"
//             />
//           </div>
//         )}
//       </div>
//       {/* content */}
//       <div className="flex flex-col md:flex-row gap-12 ">
//         {/* text */}
//         <div className="lg:text-lg flex flex-col gap-6 text-justify">
//           {parse(data.content)}
//           {/* <div dangerouslySetInnerHTML={{ __html: data.content }} /> */}
//           {/* {data.content} */}
//         </div>
//         {/* menu */}
//         <div className="px-4 h-max sticky top-8">
//           <h1 className="mb-4 text-m font-medium">Author</h1>
//           <div className="flex flex-col gap-4">
//             <div className="flex items-center gap-8">
//               <Image
//                 src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/${data.user.img}`}
//                 className="w-12 h-12 rounded-full object-cover"
//                 w="48"
//                 h="48"
//               />
//               {/* UserName */}
//               <Link className="text-blue-800">{data.user.username}</Link>
//             </div>
//             {/* User Bio:  */}
//             <p className="text-sm text-gray-600">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit
//             </p>
//             <div className="flex gap-2">
//               <Link>
//                 <Image
//                   src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/facebook.svg`}
//                 />
//               </Link>
//               <Link>
//                 <Image
//                   src={`${import.meta.env.VITE_IK_URL_ENDPOINT}/instagram.svg`}
//                 />
//               </Link>
//             </div>
//           </div>
//           <PostMenuActions />
//           <h1 className="mt-4 mb-2 text-m font-medium">
//             Categories to explore
//           </h1>
//           <div className="flex flex-col gap-1 text-sm">
//             <Link className="underline">All</Link>
//             <Link className="underline">Projects</Link>
//             <Link className="underline">Development</Link>
//             <Link className="underline">Programming</Link>
//             <Link className="underline">DSA</Link>
//             <Link className="underline">People Stories</Link>
//           </div>
//           <h1 className="mt-4 mb-2 text-m font-medium">Search</h1>
//           <Search />
//         </div>
//       </div>
//       <Comments />
//     </div>
//   );
// };

// export default SinglePostPage;
