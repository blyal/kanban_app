import Section, { ISection } from '../models/section.model';
import { v4 as uuid } from 'uuid';

export const generateSection = async (
  boardId: string,
  title: string,
  order: number
): Promise<void> => {
  const newSection: ISection = new Section({
    _id: uuid(),
    title: title,
    dateCreated: new Date(),
    boardId: boardId,
    order: order,
  });

  try {
    await newSection.save();
  } catch (err: any) {
    console.error(err);
  }
};
