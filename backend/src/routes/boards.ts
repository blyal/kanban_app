import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Board, { IBoard } from '../models/board.model';

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
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with adding a board' });
  }
});

router.patch('/:id', (req: Request, res: Response) => {
  res.send(`Board ${req.params.id} updated`);
});

router.delete('/:id', (req: Request, res: Response) => {
  res.send(`Board ${req.params.id} deleted`);
});

export { router };
