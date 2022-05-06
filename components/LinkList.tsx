import { useRouter } from "next/router";
import Link from "../components/Link";
import { ILink } from "../types/types";
import { useQuery, gql } from "@apollo/client";
import { FEED_QUERY } from "../graphql/queries";
import { LINKS_PER_PAGE } from "../constants/constants";

const LinkList = () => {
  const router = useRouter();
  const isNewPage = router.pathname.includes("new");
  const pageIndexParams = router.pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);

  const getQueryVariables = (isNewPage: boolean, page: number) => {
    const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
    const take = isNewPage ? LINKS_PER_PAGE : 100;
    const orderBy = { createdAt: "desc" };
    return { take, skip, orderBy };
  };

  const getLinksToRender = (isNewPage: boolean, page: number) => {
    if (isNewPage) {
      return data.feed.links;
    }
    const rankedLinks = data.feed.links.slice();
    rankedLinks.sort(
      (l1: ILink, l2: ILink) => l2.votes.length - l1.votes.length
    );
    return rankedLinks;
  };

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;
  const { data, loading, error } = useQuery(FEED_QUERY, {
    variables: getQueryVariables(isNewPage, page),
  });
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          {getLinksToRender(isNewPage, data).map((link: any, index: number) => (
            <Link key={link.id} link={link} index={index + pageIndex} />
          ))}
          {isNewPage && (
            <div className="flex bg-[#333]">
              <div
                className="cursor-pointer mr-2"
                onClick={() => {
                  if (page > 1) {
                    router.push(`/new/${page - 1}`);
                  }
                }}
              >
                Previous
              </div>
              <div
                className="cursor-pointer"
                onClick={() => {
                  if (page <= data.feed.count / LINKS_PER_PAGE) {
                    const nextPage = page + 1;
                    router.push(`/new/${nextPage}`);
                  }
                }}
              >
                Next
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LinkList;
