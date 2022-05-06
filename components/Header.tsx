import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AUTH_TOKEN } from "../constants/constants";
import Router from "next/router";

const Header = () => {
  let authToken: string | null = "";
  // //useRef()
  // useEffect(() => {
  //   authToken = localStorage.getItem(AUTH_TOKEN);
  //   console.log(authToken, "logged from header useeffect");
  // }, []);
  // let authToken: string | null = "";
  // if (typeof window !== undefined) {
  //   debugger;
  //   authToken = localStorage.getItem(AUTH_TOKEN);
  //   console.log(authToken, "logged from header window undefined");
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    authToken =
      localStorage.getItem(AUTH_TOKEN) != null
        ? localStorage.getItem(AUTH_TOKEN)
        : "";
  }
  return (
    <div className="w-full flex text-black justify-between bg-[#f60] items-center p-2">
      <div className="md:flex flex-initial justify-center items-center">
        <Link href="/top" className="cursor-pointer">
          <div className="mr-5 text-black font-bold cursor-pointer">
            Hacker News
          </div>
        </Link>
        <Link href="/">
          <span className="mr-1 cursor-pointer">new</span>
        </Link>
        <div className="ml-1">|</div>
        <Link href="/search">
          <span className="ml-1 cursor-pointer">search</span>
        </Link>
        {authToken && (
          <div className="flex">
            <div className="ml-1">|</div>
            <Link href="/create">
              <span className="ml-1 cursor-pointer">submit</span>
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml-1 cursor-pointer"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              Router.push(`/`);
            }}
          >
            Logout
          </div>
        ) : (
          <Link href="/login" className="ml-1">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
