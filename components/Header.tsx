import React from "react";
import Link from "next/link";
import { AUTH_TOKEN } from "../constants/constants";
import Router from "next/router";

const Header = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return (
    <div className="flex pa1 justify-between nowrap orange">
      <div className="flex flex-fixed black">
        <Link href="/" className="no-underline black">
          <div className="fw7 mr1">Hacker News</div>
        </Link>
        <Link href="/" className="ml1 no-underline black">
          new
        </Link>
        <div className="ml1">|</div>
        <Link href="/search" className="ml1 no-underline black">
          search
        </Link>
        {authToken && (
          <div className="flex">
            <div className="ml1">|</div>
            <Link href="/create" className="ml1 no-underline black">
              submit
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-fixed">
        {authToken ? (
          <div
            className="ml1 pointer black"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              Router.push(`/`);
            }}
          >
            logout
          </div>
        ) : (
          <Link href="/login" className="ml1 no-underline black">
            login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
