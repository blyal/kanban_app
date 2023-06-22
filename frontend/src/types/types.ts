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

interface Section {
  _id: string;
  title: string;
  dateCreated: string;
  boardId: string;
}

interface AddSectionData {
  title: string;
  boardId: string;
}

export type { Board, AddBoardData, Section, AddSectionData };
