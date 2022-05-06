import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import Link from "../components/Link";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    feed(filter: $filter) {
      id
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [executeSearch, { data }] = useLazyQuery(FEED_SEARCH_QUERY);
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-10">
        <div>Search</div>
        <input
          className="form-input border-2 px-3 rounded mb-3"
          type="text"
          placeholder="search here"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
          type="button"
          className="w-30 text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-1 mr-2 mb-2"
        >
          OK
        </button>
      </div>
      {data &&
        data.feed.links.map((link: any, index: number) => (
          <Link key={link.id} link={link} index={index} />
        ))}
    </>
  );
};

export default Search;
