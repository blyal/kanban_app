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
  order: number;
}

interface AddSectionData {
  title: string;
  boardId: string;
}

interface PatchSectionData {
  title: string;
  sectionId: string;
}

interface UpdateSectionOrderData {
  sectionId: string;
  newOrder: number;
}

interface Task {
  _id: string;
  title: string;
  dateCreated: string;
  boardId: string;
  sectionId: string;
  order: number;
}

interface ApiTaskData {
  title: string;
  boardId: string;
  sectionId: string;
}

interface MoveTaskData {
  taskId: string;
  newSectionId: string;
  newOrder: number;
}

export type {
  Board,
  ApiBoardData,
  Section,
  AddSectionData,
  PatchSectionData,
  UpdateSectionOrderData,
  Task,
  ApiTaskData,
  MoveTaskData,
};
