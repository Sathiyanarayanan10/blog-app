import { useState } from "react";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <h1 className="mb-8 text-2xl">Category Blog</h1>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-blue-800 text-white text-sm px-4 py-2 rounded-2xl mb-4 md:hidden"
      >
        {open ? "Close" : "Filter"}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        {/* Post list */}
        <div className="">
          <PostList />
        </div>
        {/* Side menu */}
        <div className={`${open ? 'block':'hidden'} md:block`}>
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
