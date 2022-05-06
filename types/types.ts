export interface IDefinition {
  kind: string;
  operation?: string;
}

export interface ILink {
  id: string | number;
  description: string;
  url: string;
  postedBy: IUser;
  votes: [IVote];
  createdAt: Date;
}

export interface IUser {
  id: string | number;
  name: string;
  email: string;
  links: ILink;
}

export interface IVote {
  id: string | number;
  link: ILink;
  user: IUser;
}

export interface IFeed {
  id?: string | number;
  links?: [ILink];
  count?: number;
}
