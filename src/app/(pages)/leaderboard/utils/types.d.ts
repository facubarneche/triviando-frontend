interface ILeaderBoardContentDTO {
  id: number;
  fullName: string;
  score: number;
  position: number;
}

interface ILeaderBoardDTO {
  content: ILeaderBoardContentDTO[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

interface ILeaderContentBoard {
  rank: number;
  username: string;
  score: number;
  avatar: string;
}
