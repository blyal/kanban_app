import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Board, { IBoard } from '../models/board.model';
import Section from '../models/section.model';
import Task from '../models/task.model';
import { generateSection } from '../services/section.service';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const boards = await Board.find();
    res.send(boards);
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const boardData: IBoard = req.body;

  boardData._id = uuid();
  boardData.dateCreated = new Date();
  const newBoard = new Board(boardData);

  try {
    const savedBoard = await newBoard.save();
    res.send(savedBoard);
    await generateSection(savedBoard._id, 'Backlogs', 0);
    await generateSection(savedBoard._id, 'Planned', 1);
    await generateSection(savedBoard._id, 'In Progress', 2);
    await generateSection(savedBoard._id, 'Completed', 3);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with adding a board' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedBoard) {
      return res.status(404).send({ message: 'Board not found' });
    }
    res.send(updatedBoard);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with updating the board' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const totalBoards = await Board.countDocuments();
    if (totalBoards <= 1) {
      return res.status(400).send({
        message: 'Deletion not allowed. At least one board should exist.',
      });
    }

    // Delete all tasks associated with this board
    await Task.deleteMany({ boardId: id });

    // Delete all sections associated with this board
    await Section.deleteMany({ boardId: id });

    // Delete board
    const deletedBoard = await Board.findByIdAndDelete(id);
    if (!deletedBoard) {
      return res.status(404).send({ message: 'Board not found' });
    }

    res.send({
      message: 'Board and associated sections and tasks deleted successfully',
    });
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with deleting the board' });
  }
});

export { router };
