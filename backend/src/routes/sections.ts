import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Section, { ISection } from '../models/section.model';
import Task from '../models/task.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { boardId } = req.query;
    console.log(boardId);
    const sectionsByBoard = await Section.find({ boardId });
    res.send(sectionsByBoard);
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const sectionData: ISection = req.body;

  sectionData._id = uuid();
  sectionData.dateCreated = new Date();
  const newSection = new Section(sectionData);

  try {
    const savedSection = await newSection.save();
    res.send(savedSection);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with adding a section' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const updatedSection = await Section.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    res.send(updatedSection);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with updating a section' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete all tasks associated with this section
    await Task.deleteMany({ sectionId: id });

    // Delete the section
    const removedSection = await Section.findByIdAndRemove(id);
    if (!removedSection) {
      return res.status(404).send({ message: 'Section not found' });
    }

    res.send({ message: 'Section and associated tasks deleted successfully' });
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with deleting a section' });
  }
});

export { router };
