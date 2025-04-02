import { useEffect, useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const {getToken} = useAuth()
  useEffect(()=>{
    getToken().then(token=>console.log(token))
  },[])
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image
          src="https://ik.imagekit.io/mmkve0vsm6/logo.png"
          alt="Logo image"
          h={32}
          w={32}
        />
        <span>LearnDev</span>
      </Link>
      {/* mobile menu */}
      <div className="md:hidden">
        {/* mobile button */}
        <div
          className="cursor-pointer text-4xl"
          onClick={() => setOpen((prevState) => !prevState)}
        >
          {open ? "X" : "☰"}
        </div>
        {/* mobile links list */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg absolute top-16 bg-[#a7a7ff] transition-all ease-in-out duration-300 ${
            open ? "right-0" : "-right-[100%]"
          }`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </div>
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
export default NavBar;
