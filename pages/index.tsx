import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import LinkList from "../components/LinkList";

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

      <div>
        <Header />
        <LinkList />
      </div>
    </>
  );
};

export default Home;
