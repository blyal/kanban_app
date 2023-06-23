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
  const { boardId } = sectionData;

  const existingSectionsCount = await Section.countDocuments({ boardId });
  sectionData.order = existingSectionsCount;

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

router.patch('/reorder/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newOrder } = req.body;

    const sectionToReorder = await Section.findById(id);
    if (!sectionToReorder) {
      return res.status(404).send({ message: 'Section not found' });
    }

    const currentOrder = sectionToReorder.order;
    const currentBoardId = sectionToReorder.boardId;

    // If the order has decreased, increment the order of all sections that are now after the current section
    if (newOrder < currentOrder) {
      await Section.updateMany(
        {
          order: { $gte: newOrder, $lt: currentOrder },
          boardId: currentBoardId,
        },
        { $inc: { order: 1 } }
      );
    }

    // If the order has increased, decrement the order of all sections that are now before the current section
    else if (newOrder > currentOrder) {
      await Section.updateMany(
        {
          order: { $gt: currentOrder, $lte: newOrder },
          boardId: currentBoardId,
        },
        { $inc: { order: -1 } }
      );
    }

    // Update the order of the current section
    sectionToReorder.order = newOrder;
    await sectionToReorder.save();

    res.send({ message: 'Section reordered successfully' });
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with reordering the section' });
  }
});

export { router };
