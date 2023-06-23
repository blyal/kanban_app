import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Section, { ISection } from '../models/section.model';

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

router.patch('/:id', (req: Request, res: Response) => {
  res.send(`Section ${req.params.id} updated`);
});

router.delete('/:id', (req: Request, res: Response) => {
  res.send(`Section ${req.params.id} deleted`);
});

export { router };
