import { Router, Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import Task, { ITask } from '../models/task.model';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { boardId } = req.query;
    console.log(boardId);
    const tasksByBoard = await Task.find({ boardId });
    res.send(tasksByBoard);
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ message: 'Something went wrong' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  const taskData: ITask = req.body;
  const { sectionId } = taskData;

  const existingTasksCount = await Task.countDocuments({ sectionId });
  taskData.order = existingTasksCount;

  taskData._id = uuid();
  taskData.dateCreated = new Date();
  const newTask = new Task(taskData);

  try {
    const savedTask = await newTask.save();
    res.send(savedTask);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with adding a task' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  const { title, sectionId } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, sectionId },
      { new: true }
    );

    if (updatedTask) {
      res.send(updatedTask);
    } else {
      res.status(404).send({ message: 'Task not found' });
    }
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with updating the task' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return res.status(404).send({ message: 'Task not found' });
    }
    res.send({ message: `Task ${req.params.id} deleted` });
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .send({ message: 'Something went wrong with deleting the task' });
  }
});

export { router };
