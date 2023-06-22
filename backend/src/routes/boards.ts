import { Router, Request, Response } from 'express';
import Board from '../models/board.model';

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

router.post('/', (req: Request, res: Response) => {
  res.send('Board posted');
});

router.patch('/:id', (req: Request, res: Response) => {
  res.send(`Board ${req.params.id} updated`);
});

router.delete('/:id', (req: Request, res: Response) => {
  res.send(`Board ${req.params.id} deleted`);
});

export { router };
