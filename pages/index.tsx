import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Link from "../components/Link";
import { ILink } from "../types/types";
import { useQuery, gql } from "@apollo/client";

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link: ILink) => (
            <Link key={link.id} link={link} />
          ))}
        </>
      )}
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Hacker News</title>
        <meta
          name="description"
          content="news, hackernews, ondemand news, world news"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="center w85">
        <Header />
        <LinkList />
      </div>
    </>
  );
};

export default Home;
