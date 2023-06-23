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

interface Task {
  _id: string;
  title: string;
  dateCreated: string;
  boardId: string;
  sectionId: string;
}

interface ApiTaskData {
  title: string;
  boardId: string;
  sectionId: string;
}

export type { Board, AddBoardData, Section, AddSectionData, Task, ApiTaskData };
