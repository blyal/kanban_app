interface Board {
  _id: string;
  title: string;
  description: string;
  dateCreated: string;
}

interface AddBoardData {
  title: string;
  description: string;
}

export type { Board, AddBoardData };
