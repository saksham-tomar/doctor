"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Greeting from "./Greeting";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NavBar({ SigninButton }: { SigninButton: any }) {
  const { data: session } = useSession();

  const router = useRouter();

  const redirectPatient = () => {
    router.push("/patients");
  };

  const [toggle, setToggle] = useState(false);
  const listItemVariants = {
    closed: {
      x: -10,
      opacity: 0,
    },
    opened: {
      x: 0,
      opacity: 1,
    },
  };
  const listVariants = {
    closed: {
      x: "-100vw",
    },
    opened: {
      x: 0,
      y: -100,

      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <div className="fixed z-30 top-0 min-w-full overflow-hidden">
      <div className="relative">
        <div className="fixed min-w-full min-h-12 flex flex-row items-center justify-between bg-white pt-0">
          <Link href={"/"} className="flex flex-row pl-8 gap-4">
            <Image src={"/logo.png"} width={24} height={24} alt="logo" />
            <div className="font-bold">Medicare</div>
          </Link>
          <div
            onClick={() => setToggle((prev) => !prev)}
            className="pr-4 md:hidden hover:cursor-pointer flex items-center"
          >
            {toggle ? (
              ""
            ) : (
              <Image
                className="bg-gray-200 p-2 rounded-full cursor-pointer hover:bg-gray-300"
                src={"/menu.png"}
                alt="menu"
                height={38}
                width={38}
              />
            )}
          </div>
          <ul className="hidden md:flex lg:flex felx-row gap-6 text-gray-500 font-medium">
            <Link href={"/"}>
              <li className="bg-slate-100 px-4 rounded-lg py-1 shadow-md">
                Home
              </li>
            </Link>
            <Link href={"/help"}>
              <li className="bg-slate-100 px-6 rounded-lg py-1 shadow-md">
                Help
              </li>
            </Link>
          </ul>
          <div className="hidden md:flex  pr-4  flex-row gap-4 items-center">
            {SigninButton ? (
              <SigninButton />
            ) : (
              <div>
                <Link
                  className="text-gray-500 font-bold"
                  href={"/auth/sign-up"}
                >
                  Register
                </Link>
                <motion.div className="rounded-2xl bg-blue-600 shadow-lg shadow-blue-300 hover:cursor-pointer hover:translate-y-1 font-semibold text-white px-4 py-1">
                  <Link href={"/auth/log-in"}>Login</Link>
                </motion.div>
              </div>
            )}
          </div>
        </div>
        <div className={toggle ? "flex" : "hidden"}>
          <AnimatePresence>
            <motion.ul
              variants={listVariants}
              initial="closed"
              animate="opened"
              exit="closed"
              className="shadow-lg shadow-blue-300 bg-white mr-auto pl-4 mt-24 min-h-screen fixed left-0 translate-x-0 -translate-y-24 flex flex-col justify-between  min-w-56 rounded-r-3xl"
            >
              <div className="mt-8 ">
                {session ? (
                  <div className="bg-gradient-to-bl from-blue-200 to-indigo-300 p-2 mr-4 mb-8 rounded-2xl ring-1 ring-teal-200 shadow-lg flex flex-col items-center justify-center">
                    <Image
                      className="rounded-full shadow-lg"
                      src={session?.user.image}
                      alt="image"
                      height={40}
                      width={40}
                    />
                    <Greeting name={session?.user.name} />
                  </div>
                ) : (
                  <div
                    onClick={() =>
                      signIn(undefined, { callbackUrl: "/patients" })
                    }
                    className="px-4 py-1 rounded-lg shadow-lg bg-yellow-400 ring-1 ring-orange-300 font-bold mr-4 mb-4 text-white"
                  >
                    Login
                  </div>
                )}
                <div className="flex items-center flex-row gap-24 text-gray-700 text-sm font-bold pb-6 pl-2">
                  Menu
                  <span
                    className="ml-auto bg-gray-200 hover:bg-gray-300 p-2 rounded-full ring-1 ring-gray-300 mr-6 hover:cursor-pointer"
                    onClick={() => setToggle((prev) => !prev)}
                  >
                    <Image
                      src={"/close.png"}
                      alt="close"
                      height={12}
                      width={12}
                    />
                  </span>
                </div>
                <motion.ul
                  exit={{
                    x: -300,
                    opacity: 0,
                  }}
                  variants={listItemVariants}
                  className="text-base text-gray-600 font-medium flex flex-col gap-6 "
                >
                  <Link href={"/"}>
                    <li className="flex hover:cursor-pointer gap-4 items-center  flex-row">
                      <Image
                        src="/house.gif"
                        width={30}
                        height={30}
                        alt="house"
                      />
                      Home
                    </li>
                  </Link>
                  <li className="flex  hover:cursor-pointer gap-4 items-center  flex-row">
                    <Image
                      src="/calendar.gif"
                      width={30}
                      height={30}
                      alt="house"
                    />
                    About Us
                  </li>
                  <li className="flex gap-4 items-center  hover:cursor-pointer  flex-row">
                    <Image
                      src="/pharmacy.gif"
                      width={30}
                      height={30}
                      alt="house"
                    />
                    Our Services
                  </li>
                  <li
                    onClick={redirectPatient}
                    className="flex gap-4 items-center  hover:cursor-pointer  flex-row"
                  >
                    <Image
                      src="/activity.gif"
                      width={30}
                      height={30}
                      alt="house"
                    />
                    Find Doctor
                  </li>
                  <li className="flex gap-4  hover:cursor-pointer items-center  flex-row">
                    <Link
                      className="flex gap-4  hover:cursor-pointer items-center  flex-row"
                      href={`/account/${session?.user.name}`}
                    >
                      <Image
                        src="/settings.gif"
                        width={30}
                        height={30}
                        alt="house"
                      />
                      Settings
                    </Link>
                  </li>
                  {session && (
                    <li
                      onClick={() => signOut()}
                      className="flex gap-4 bg-red-500 max-w-36 px-2 py-0 text-white ml-1 rounded-2xl ring-1 ring-red-600 shadow-xl hover:cursor-pointer items-center  flex-row"
                    >
                      <Image
                        src="/exit.png"
                        width={20}
                        height={20}
                        alt="house"
                      />
                      Sign Out
                    </li>
                  )}
                </motion.ul>
              </div>
              <div className="felx flex-col">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enable-background="new 0 0 300 300"
                    viewBox="0 0 300 300"
                    id="scientist-experimenting-on-coronavirus"
                  >
                    <path
                      fill="#6a89c5"
                      d="M281.6,228.4c3.2-11.6,0.9-28.3-2.2-34.4c-6.3-12.3-18.7-14.5-29.3-23.3c-20.1-16.7-18-54.2-21.4-66.3   c-11.9-42.1-63.8-36.8-83-9.3c-3.2,4.6-13.5,20.4-32.7,26.3c-21.8,6.6-41.1-2-61.9,9.2c-6.3,3.4-12.9,8.8-17.6,14.1   c-6.7,7.5-11.6,16.5-14.2,26.2c-5.2,19.4-1.2,40.7,9.6,57.5H281.6z"
                    ></path>
                    <path
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width=".323"
                      d="M182.5,228.4v-19.2h52.3v19.2h2.6v-68.5h-2.6v0h-52.3v0h-2.6v68.5H182.5z M182.5,164h52.3v19.7h-3.9v-11h0.8   v-1.9H223v1.9h0.8v11h-8.5v-11h0.8v-1.9h-8.7v1.9h0.8v11h-15.4v-11h0.8v-1.9h-8.7v1.9h0.8v11h-2.9V164z M182.5,187.9h52.3V205   h-52.3V187.9z"
                    ></path>
                    <path
                      fill="#5269b0"
                      d="M92.7 161.6L92.7 161.6l-52.3 0v0h-2.6v65.5h2.6v-18.3h52.3v18.3h2.6v-65.5H92.7zM92.7 188.6H40.4v-10.2h52.3V188.6zM92.7 175.8H40.4v-11.7h52.3V175.8zM223.3 150.6l-.6-.4c-.1-.1-.2-.2-.2-.4v-4.3h.3c.3 0 .6-.2.6-.6s-.2-.6-.6-.6H219c-.3 0-.6.2-.6.6s.2.6.6.6h.3v4.3c0 .1-.1.3-.2.4l-.6.4c-2.8 1.7-3.8 5.3-2.2 8.2.3.6 1 1 1.7 1h5.9c.7 0 1.3-.4 1.7-1C227.1 155.9 226.1 152.2 223.3 150.6zM218.6 145c0-.2.2-.4.4-.4h3.8c.2 0 .4.2.4.4 0 .2-.2.4-.4.4h-.4-3H219C218.8 145.4 218.6 145.2 218.6 145zM218.5 150.7l.6-.4c.2-.1.3-.3.3-.5v-4.3h2.8v.8h-1.4c-.1 0-.1 0-.1.1s0 .1.1.1h1.4v2h-1.4c-.1 0-.1 0-.1.1 0 .1 0 .1.1.1h1.4v1.1c0 .2.1.4.3.5l.6.4c.1.1.2.1.3.2h-1.9c-.1 0-.1 0-.1.1s0 .1.1.1h2.1c.7.5 1.3 1.2 1.7 2h-2.6c-.1 0-.1 0-.1.1s0 .1.1.1h2.7c.2.4.4.9.4 1.4h-9c.3-1.3 1.2-2.5 2.4-3.2.1-.1.1-.2.1-.2-.1-.1-.2-.1-.2-.1-1.4.8-2.2 2.1-2.6 3.5h-.9C216.1 153.1 217 151.6 218.5 150.7zM206.5 153.3l-.4-.3c-.1-.1-.1-.1-.1-.2v-3h.2c.2 0 .4-.2.4-.4 0-.2-.2-.4-.4-.4h-2.6c-.2 0-.4.2-.4.4 0 .2.2.4.4.4h.2v3c0 .1-.1.2-.1.2l-.4.3c-2 1.2-2.6 3.7-1.5 5.7.2.4.7.7 1.2.7h4.1c.5 0 .9-.3 1.2-.7C209.1 157 208.5 154.5 206.5 153.3zM203.2 149.5c0-.1.1-.3.3-.3h2.6c.1 0 .3.1.3.3s-.1.3-.3.3h-.3-2.1-.3C203.3 149.7 203.2 149.6 203.2 149.5zM203.2 153.4l.4-.3c.1-.1.2-.2.2-.4v-3h2v.5h-1c0 0-.1 0-.1.1s0 .1.1.1h1v1.4h-1c0 0-.1 0-.1.1s0 .1.1.1h1v.8c0 .1.1.3.2.4l.4.3c.1 0 .1.1.2.1h-1.3c0 0-.1 0-.1.1 0 0 0 .1.1.1h1.5c.5.4.9.9 1.2 1.4h-1.8c0 0-.1 0-.1.1s0 .1.1.1h1.9c.1.3.2.6.3 1h-6.3c.2-.9.8-1.7 1.7-2.2.1 0 .1-.1 0-.2 0-.1-.1-.1-.2 0-.9.6-1.6 1.5-1.8 2.5h-.6C201.5 155.1 202.1 154 203.2 153.4z"
                    ></path>
                    <rect
                      width="48.2"
                      height="11.7"
                      x="41.6"
                      y="192"
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width=".323"
                    ></rect>
                    <path
                      fill="#77434e"
                      d="M137.3,117.4l-21.6-0.6c-1.4-5.7-2.8-12.5-2.6-14.2c0.2-1.2,0.6-1.8,1.1-2c1.1-0.5,2.1-1.3,2.8-2.4           c1.4-2.3,4.9-5.3,13.5-4.3c5.3,0.6,9.3,4.4,9.5,5.8c0.2,1.5-0.4,2.6-0.4,2.6s1.7,0.3,1,3.4           C140.2,107.4,138.7,112.7,137.3,117.4z"
                    ></path>
                    <rect
                      width="10"
                      height="20.1"
                      x="121.8"
                      y="117"
                      fill="#f8ad9c"
                    ></rect>
                    <path
                      fill="#f8ad9c"
                      d="M117.1,117.6c0,0-1.9-0.3-3.5-1.8c-1.7-1.5-1.3-4,0.4-4.5s3.2,1.2,3.2,1.2l0.8-8.7           c0.1-1.3,1.2-2.2,2.5-2.2l13.2,0.4c1.3,0,2.4,1.1,2.4,2.4l-0.1,8.4c0.1,0,3-2.9,4.4-0.4c2.1,3.8-4.3,5.9-4.3,5.9           s-3.6,7.5-9,7.4C120.9,125.6,117.1,117.6,117.1,117.6z"
                    ></path>
                    <ellipse
                      cx="121.8"
                      cy="108.1"
                      fill="#4d1e33"
                      rx="3.1"
                      ry=".5"
                      transform="rotate(-.992 121.748 108.133) scale(.99995)"
                    ></ellipse>
                    <ellipse
                      cx="132.1"
                      cy="108.4"
                      fill="#4d1e33"
                      rx=".5"
                      ry="3.1"
                      transform="rotate(-87.587 132.112 108.398)"
                    ></ellipse>
                    <path
                      fill="#d08487"
                      d="M126.4 125.7c-1.6-.1-3.1-.6-4.5-1.5-.1-.1-.2-.3-.1-.4l0 0c.1-.1.3-.2.4-.1 2.7 1.8 6.3 1.8 9 .1.1-.1.3-.1.4.1.1.1.1.3-.1.4C130.1 125.4 128.3 125.8 126.4 125.7zM116.2 114.2c-.3-1.1-1.7-1.3-1.8-1.3 0 0-.1 0-.1.1s0 .1.1.1c0 0 1.4.2 1.7 1.2 0 .1.1.3.1.4-.3.1-1 .5-1.4.3-.4-.2-.4-.5-.4-.5 0 0 0-.1-.1-.1 0 0-.1 0-.1.1 0 0 0 .4.5.7.1 0 .2.1.3.1.4 0 1-.2 1.1-.3.1.8-.1 1.4-.1 1.4 0 0 0 .1.1.1 0 0 0 0 0 0 0 0 .1 0 .1-.1C116.2 116.3 116.5 115.3 116.2 114.2zM137.6 114.2c.3-1.1 1.7-1.3 1.8-1.3 0 0 .1 0 .1.1s0 .1-.1.1c0 0-1.4.2-1.7 1.2 0 .1-.1.3-.1.4.3.1 1 .5 1.4.3.4-.2.4-.5.4-.5 0 0 0-.1.1-.1 0 0 .1 0 .1.1 0 0 0 .4-.5.7-.1 0-.2.1-.3.1-.4 0-1-.2-1.1-.3-.1.8.1 1.4.1 1.4 0 0 0 .1-.1.1 0 0 0 0 0 0 0 0-.1 0-.1-.1C137.6 116.3 137.3 115.3 137.6 114.2zM128 115.1l-.4.1c-.4.1-.8.1-1.2 0l-.6-.2c-.2-.1-.4.2-.2.4l.4.3c.6.6 1.6.6 2.2-.1l.2-.2C128.4 115.3 128.3 115 128 115.1z"
                    ></path>
                    <path
                      fill="#77434e"
                      d="M137.1,99.2c2.9,0.1,4.9,2.8,4.2,5.6c0,0,0,0,0,0c0,0.1-0.1,0.3-0.3,0.3c-1,0.5-1.6,1.4-1.6,2.4        l-0.1,2.6c0,0-3-0.9-3.1-2.5c-0.2-1.6-0.2-1.6-0.2-1.6s-5.1,0.7-8.9-0.6c-3.7-1.4-5.4-3-5.4-3c-0.6,1.3-1.9,2.2-3.4,2.4        l-0.3,0l-1.3,4l-1.2,0c0,0-0.2-1.3-0.5-3.1c-0.5-3.7,2.4-7,6.1-6.9L137.1,99.2z"
                    ></path>
                    <g>
                      <path
                        fill="#9e5f67"
                        d="M133.2,104.6c-1.8,0-3.9-0.2-5.7-0.8c-2.2-0.8-3.7-1.7-4.6-2.3c-0.1-0.1-0.1-0.2,0-0.2       c0.1-0.1,0.2-0.1,0.2,0c0.9,0.6,2.3,1.5,4.5,2.3c2.7,1,6.1,0.9,7.8,0.7c0.1,0,0.2,0.1,0.2,0.1c0,0.1-0.1,0.2-0.1,0.2       C134.8,104.6,134.1,104.6,133.2,104.6z"
                      ></path>
                    </g>
                    <g>
                      <path
                        fill="#d08487"
                        d="M126.5 125c-1.6-.1-3.2-.6-4.5-1.5-.1-.1-.2-.3-.1-.5l0 0c.1-.1.3-.2.5-.1 2.7 1.8 6.4 1.9 9.1.1.2-.1.4-.1.4.1.1.2.1.4-.1.4C130.2 124.6 128.3 125.1 126.5 125zM128.1 114.2l-.4.1c-.4.1-.8.1-1.2 0l-.6-.2c-.2-.1-.4.2-.2.4l.4.3c.6.6 1.6.6 2.2-.1l.2-.2C128.5 114.4 128.3 114.1 128.1 114.2z"
                      ></path>
                      <polyline
                        fill="none"
                        stroke="#3e586d"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                        points="117.3 112.3 126.7 118.2 136.3 112.3"
                      ></polyline>
                      <g>
                        <path
                          fill="#102230"
                          d="M133.5,115.7c-0.6,0-1.1,0.1-1.6,0.2l-3.3-2.6c-1.3-1.1-3.3-0.9-4.4,0.3l-3.5,3.6l-2.8,0.4        c-0.6,0.1-1.1,0.7-1,1.3l0.8,5c0.1,0.6,0.7,1.1,1.3,1l2.1-0.3l1,0.5c2.4,1.3,5.3,1.4,7.9,0.5c1,0.8,2.2,1.3,3.6,1.3        c3.1,0,5.6-2.5,5.6-5.6C139.1,118.3,136.6,115.7,133.5,115.7z"
                        ></path>
                        <path
                          fill="#3e586d"
                          d="M132.6 122c-.1 0-.1 0-.2-.1l-3.3-2.3c-1.3-.9-1.8-2.5-1.4-3.9l.6-2c.1-.2.3-.3.4-.2.2.1.3.3.2.4l-.6 2c-.4 1.2.1 2.4 1.1 3.1l3.3 2.3c.2.1.2.3.1.5C132.8 121.9 132.7 122 132.6 122zM120.8 122c-.1 0-.2-.1-.3-.2-.1-.2-.1-.4.1-.5l3.3-2.3c1-.7 1.5-2 1.1-3.1l-.6-2c-.1-.2 0-.4.2-.4.2-.1.4 0 .4.2l.6 2c.5 1.5-.1 3.1-1.4 3.9l-3.3 2.3C120.9 122 120.8 122 120.8 122z"
                        ></path>
                        <circle
                          cx="132.9"
                          cy="121.4"
                          r="4"
                          fill="#3e586d"
                        ></circle>
                        <circle
                          cx="134.3"
                          cy="121.4"
                          r="4"
                          fill="#f9be13"
                        ></circle>
                        <circle
                          cx="134.8"
                          cy="121.4"
                          r="4"
                          fill="#3e586d"
                        ></circle>
                        <circle
                          cx="135.4"
                          cy="121.6"
                          r="2.9"
                          fill="#f9be13"
                        ></circle>
                      </g>
                    </g>
                    <g>
                      <path
                        fill="#31c1da"
                        stroke="#fff"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                        d="M123.4 114.8H119c-1.2 0-2.1-.9-2.1-2.1v-2.3c0-1.2.9-2.1 2.1-2.1h4.4c1.2 0 2.1.9 2.1 2.1v2.3C125.5 113.8 124.6 114.8 123.4 114.8zM130.9 114.8h4.4c1.2 0 2.1-.9 2.1-2.1v-2.3c0-1.2-.9-2.1-2.1-2.1h-4.4c-1.2 0-2.1.9-2.1 2.1v2.3C128.8 113.8 129.7 114.8 130.9 114.8z"
                      ></path>
                      <line
                        x1="128.8"
                        x2="125.5"
                        y1="111.5"
                        y2="111.5"
                        fill="none"
                        stroke="#fff"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="116.9"
                        x2="115"
                        y1="112.5"
                        y2="111.4"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <g>
                        <line
                          x1="119.8"
                          x2="123"
                          y1="108.3"
                          y2="114.6"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                        <line
                          x1="121.8"
                          x2="123.9"
                          y1="109.3"
                          y2="113.5"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                      </g>
                      <g>
                        <line
                          x1="131.1"
                          x2="134.3"
                          y1="108.3"
                          y2="114.7"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                        <line
                          x1="133"
                          x2="135.2"
                          y1="109.4"
                          y2="113.6"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                      </g>
                    </g>
                    <g>
                      <path
                        fill="#ea3e2d"
                        d="M219.8,102.2h-13.7l-2.7,4.6c-1.2,2.1,0.3,4.7,2.7,4.7h13.8c2.4,0,3.9-2.6,2.7-4.7L219.8,102.2z"
                      ></path>
                      <path
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                        d="M216.1,95.6v-9.4h-2.5h-1.2h-2.5v9.4c0,0.2,0,0.3-0.1,0.5l-6.3,10.7c-1.2,2.1,0.3,4.7,2.7,4.7h6.1h1.7        h6.1c2.4,0,3.9-2.6,2.7-4.7l-6.3-10.7C216.2,95.9,216.1,95.8,216.1,95.6z"
                      ></path>
                      <line
                        x1="213.6"
                        x2="216"
                        y1="88.6"
                        y2="88.6"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="213.6"
                        x2="216"
                        y1="92.1"
                        y2="92.1"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="212.5"
                        x2="215.9"
                        y1="95.8"
                        y2="95.8"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="213.7"
                        x2="218.1"
                        y1="99.4"
                        y2="99.4"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="215.3"
                        x2="220.6"
                        y1="103.5"
                        y2="103.5"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="218.4"
                        x2="222.8"
                        y1="107.5"
                        y2="107.5"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <path
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                        d="M209.8,84.6h6.8c0.4,0,0.8,0.4,0.8,0.8v0.1c0,0.4-0.4,0.8-0.8,0.8h-6.8c-0.4,0-0.8-0.4-0.8-0.8v-0.1        C209,84.9,209.4,84.6,209.8,84.6z"
                      ></path>
                      <line
                        x1="210.8"
                        x2="204.5"
                        y1="97.8"
                        y2="108.5"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".646"
                      ></line>
                      <path
                        fill="#f8ad9c"
                        d="M212.8,97.5l-6.8,1.1c-0.3,0-0.7,0.4-0.7,0.4c-1.5,0.9-5,4.5-6,5.8c-0.1,0.1-4.1,4.8-6,7      c-0.2,0.1-0.7,3.1-0.7,3.1l8.2,4.6c0,0,0.8-3.4,0.7-3.6c2.8-2.2,4.8-5.3,5.6-8.8c0,0,2.8,1.7,3.7,0.7c0.6-0.7-3.2-3-3.2-3      s4.3,1.8,5.1,1.8c0.8,0,1.4-1.2,0.7-1.8c-0.8-0.6-5.4-3-5.4-3s5.3,1.7,6.4,1.6c0.4,0,0.8-1.1-0.4-1.7c-0.3-0.2-1.8-0.8-3.5-1.4      l2.7-0.4c0.7-0.1,1.1-0.8,0.9-1.5C213.9,97.7,213.4,97.4,212.8,97.5z"
                      ></path>
                      <g>
                        <path
                          fill="#fff"
                          d="M147.9,206l-10.2-72.6l-10.7,1l-10-0.8l-8.4,72.4C114.5,205.9,144.7,205.6,147.9,206z"
                        ></path>
                        <path
                          fill="#5269b0"
                          d="M136.9,132.2c-0.1-1.2-0.5-2.3-0.9-3.1c-0.2-0.4-1-0.4-1.2,0c-0.3,0.8-0.6,1.7-1.2,2.1              c-1,0.8-6.6,2.7-6.6,2.7s-5.3-2.4-6.2-3.4c-0.5-0.5-0.7-1.4-0.8-2.3c-0.1-0.5-0.9-0.6-1.2-0.2c-0.5,0.8-1.1,1.9-1.4,3.1              c-0.5,2.5-0.5,2.5-0.5,2.5s3.5,5.2,4.1,5.8c0.6,0.6,0.6,0.6,0.6,0.6s1.7-3.7,3.1-4.4s2.3-0.7,2.3-0.7s0.9,0.1,2.2,1              c1.3,0.9,2.6,4.7,2.6,4.7s0,0,0.7-0.5c0.7-0.5,4.7-5.3,4.7-5.3S137.1,134.7,136.9,132.2z"
                        ></path>
                        <path
                          fill="#191c39"
                          d="M152.5,228.4c8.7-2.2,13.6-4.3,13.6-4.3l-8.8-29.9H91.7l-2.3,34.1c0,0,0.2,0.1,0.5,0.2H152.5z"
                        ></path>
                        <path
                          fill="#c3d8e3"
                          d="M189.5,112.5l-10.6,42.7l-11.6-11.5c-5.3-5.2-12-8.8-19.2-10.3l-10.6-2.2c-0.3-0.1-0.6,0.2-0.6,0.5        c0.3,5.5,2.4,46.6,8.2,72.2c4.4,19.4,5.1,22.3,5.8,24.5h20.9l-9.2-49.5l21.3,6.3c8.7,2.6,17.5-3.5,18.3-12.5l3.7-58.3        L189.5,112.5z"
                        ></path>
                        <line
                          x1="176.7"
                          x2="178.9"
                          y1="161.8"
                          y2="155.4"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".646"
                        ></line>
                        <polygon
                          fill="#fff"
                          points="205.5 120.5 205.5 119.9 188.5 116.5 188.4 117.1"
                        ></polygon>
                        <circle
                          cx="204.3"
                          cy="116.7"
                          r=".8"
                          fill="#94a6b0"
                        ></circle>
                        <polyline
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".646"
                          points="141.1 132.6 153.4 150.9 148.2 156.5 154.7 161.3 150.8 183.6"
                        ></polyline>
                        <polygon
                          fill="#94a6b0"
                          points="162.6 178.9 161.3 170.4 163.9 179.2"
                        ></polygon>
                        <g>
                          <path
                            fill="#c3d8e3"
                            d="M72.4,228.4h10.3h20.9c0.7-2.2,1.4-5.1,5.8-24.5c5.8-25.7,7.9-66.7,8.2-72.2c0-0.3-0.3-0.6-0.6-0.5        l-10.6,2.2c-3.2,0.7-8.2,3.2-12.7,5.9c-6.9,4-11.6,11-12.6,18.9L72.4,228.4z"
                          ></path>
                          <polyline
                            fill="none"
                            stroke="#fff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-miterlimit="10"
                            stroke-width=".646"
                            points="113.4 132.6 101.1 150.9 106.3 156.5 99.7 161.3 103.7 183.6"
                          ></polyline>
                        </g>
                        <polyline
                          fill="none"
                          stroke="#2d3471"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".646"
                          points="131.2 215.5 128.2 217.5 128.2 227.1"
                        ></polyline>
                        <line
                          x1="94.3"
                          x2="92"
                          y1="201.6"
                          y2="227.1"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".646"
                        ></line>
                      </g>
                    </g>
                    <g>
                      <line
                        x1="284"
                        x2="16"
                        y1="228.4"
                        y2="228.4"
                        fill="none"
                        stroke="#000425"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".646"
                      ></line>
                      <path
                        fill="#f28e20"
                        d="M124.1,219.2c-0.5,2.4-0.1,4.9,1.2,7.2c0.6,1,1.6,1.6,2.8,1.6h10.5c1.2,0,2.2-0.6,2.8-1.6     c1.3-2.2,1.6-4.8,1.2-7.2H124.1z"
                      ></path>
                      <path
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                        d="M137.6,212.1l-1.1-0.7c-0.3-0.2-0.4-0.4-0.4-0.8v-7.7h-1h-1.4h-0.4h-0.4h-2v7.7c0,0.3-0.2,0.6-0.4,0.8      l-1.1,0.7c-5,3-6.6,9.4-3.8,14.3c0.6,1,1.6,1.6,2.8,1.6h10.5c1.2,0,2.2-0.6,2.8-1.6C144.2,221.5,142.6,215,137.6,212.1z"
                      ></path>
                      <path
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                        d="M130,201.3h6.7c0.5,0,0.8,0.4,0.8,0.8l0,0c0,0.5-0.4,0.8-0.8,0.8H130c-0.5,0-0.8-0.4-0.8-0.8l0,0      C129.1,201.7,129.5,201.3,130,201.3z"
                      ></path>
                      <line
                        x1="133.3"
                        x2="136"
                        y1="204.6"
                        y2="204.6"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="133.3"
                        x2="136"
                        y1="208.5"
                        y2="208.5"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="134.7"
                        x2="138.4"
                        y1="212.7"
                        y2="212.7"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="136.8"
                        x2="141.7"
                        y1="216.6"
                        y2="216.6"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="136.8"
                        x2="142.6"
                        y1="221.2"
                        y2="221.2"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <line
                        x1="136.8"
                        x2="141.7"
                        y1="225.6"
                        y2="225.6"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".323"
                      ></line>
                      <path
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width=".646"
                        d="M130.5,213.2c-4.6,2.7-6,8.5-3.5,13"
                      ></path>
                      <g>
                        <path
                          fill="#99daf3"
                          d="M161.4,219h-13.2l-2.6,4.4c-1.2,2,0.3,4.5,2.6,4.5h13.2c2.3,0,3.7-2.5,2.6-4.5L161.4,219z"
                        ></path>
                        <path
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                          d="M157.8,212.7v-9h-2.4h-1.1h-2.4v9c0,0.2,0,0.3-0.1,0.5l-6.1,10.3c-1.2,2,0.3,4.5,2.6,4.5h5.8h1.6h5.8      c2.3,0,3.7-2.5,2.6-4.5l-6.1-10.3C157.8,213,157.8,212.9,157.8,212.7z"
                        ></path>
                        <line
                          x1="155.4"
                          x2="157.7"
                          y1="206"
                          y2="206"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                        <line
                          x1="155.4"
                          x2="157.7"
                          y1="209.3"
                          y2="209.3"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                        <line
                          x1="154.3"
                          x2="157.6"
                          y1="212.9"
                          y2="212.9"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                        <line
                          x1="155.4"
                          x2="159.7"
                          y1="216.3"
                          y2="216.3"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                        <line
                          x1="157"
                          x2="162.1"
                          y1="220.3"
                          y2="220.3"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                        <line
                          x1="159.9"
                          x2="164.2"
                          y1="224.1"
                          y2="224.1"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                        ></line>
                        <path
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".323"
                          d="M151.8,202.1h6.4c0.4,0,0.8,0.4,0.8,0.8l0,0c0,0.4-0.4,0.8-0.8,0.8h-6.4c-0.4,0-0.8-0.4-0.8-0.8l0,0      C151,202.5,151.3,202.1,151.8,202.1z"
                        ></path>
                        <line
                          x1="152.7"
                          x2="146.7"
                          y1="214.8"
                          y2="225.1"
                          fill="none"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-miterlimit="10"
                          stroke-width=".646"
                        ></line>
                      </g>
                    </g>
                    <circle cx="65.5" cy="198.1" r="1.1" fill="#fff"></circle>
                    <g>
                      <path
                        fill="#74444a"
                        d="M114.1,104.6c-0.6-0.5-1.1-1.5-1.1-2.4c0-0.6,0.2-1.2,0.6-1.5l0.2-0.2c0.9-0.8,2.4-1.9,2.9-2.9    c0.7-1.4,2.9-3.3,5.7-4.2c1.9-0.6,5-0.9,8.3,0.9l-0.2,0.3c-3.2-1.8-6.2-1.5-8.1-0.9c-2.7,0.8-4.8,2.6-5.5,4c-0.5,1.1-2,2.3-3,3    l-0.2,0.2c-0.5,0.4-0.5,0.9-0.5,1.3c0,0.9,0.5,1.8,1,2.1L114.1,104.6z"
                      ></path>
                    </g>
                  </svg>
                </div>
                <p className="flex items-center justify-center flex-col font-bold text-3xl text-blue-700">
                  Medicare
                </p>
                <p className="ml-14 text-xs font-medium text-gray-400 pb-8">
                  Always with You
                </p>
              </div>
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
