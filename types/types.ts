import internal from "stream";

export interface ILink {
  id: string;
  description: string;
  url: string;
  votes: [];
  postedBy: {
    name: string;
  };
  createdAt: number;
}
