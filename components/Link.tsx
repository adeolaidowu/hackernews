import React from "react";
import { useMutation } from "@apollo/client";
import { ILink } from "../types/types";
import { AUTH_TOKEN, LINKS_PER_PAGE } from "../constants/constants";
import { timeDifferenceForDate } from "../utils/utils";
import { FEED_QUERY } from "../graphql/queries";
import { VOTE_MUTATION } from "../graphql/mutations";

const Link = (props: { link: ILink; index: number }) => {
  const { link } = props;
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const take = LINKS_PER_PAGE;
  const skip = 0;
  const orderBy = { createdAt: "desc" };
  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { vote } }) => {
      const { feed }: any =
        cache.readQuery({
          query: FEED_QUERY,
          variables: {
            take,
            skip,
            orderBy,
          },
        }) || {};

      const updatedLinks = feed.links.map((feedLink: ILink) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
        variables: {
          take,
          skip,
          orderBy,
        },
      });
    },
  });
  return (
    <div className="bg-[#eee]">
      <div className="flex p-2 items-start">
        <div className="flex items-center">
          <span className="gray">{props.index + 1}.</span>
          {authToken && (
            <div
              className="ml1 gray f11"
              style={{ cursor: "cursor-pointer" }}
              onClick={() => {
                console.log("Clicked vote button");
              }}
            ></div>
          )}
        </div>
        <div className="ml1">
          <div>
            {link.description} ({link.url})
          </div>
          {
            <div className="f6 lh-copy gray">
              {link.votes.length} votes | by{" "}
              {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
              {timeDifferenceForDate(link.createdAt)}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Link;
