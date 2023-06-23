interface Board {
  _id: string;
  title: string;
  description: string;
  dateCreated: string;
}

interface ApiBoardData {
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

interface PatchSectionData {
  title: string;
  sectionId: string;
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

export type {
  Board,
  ApiBoardData,
  Section,
  AddSectionData,
  PatchSectionData,
  Task,
  ApiTaskData,
};
