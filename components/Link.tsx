import React from "react";
import { ILink } from "../types/types";

const Link = (props: { link: ILink }) => {
  const { link } = props;
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};

export default Link;
