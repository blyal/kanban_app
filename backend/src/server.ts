import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { connectDb, closeDb } from './db';
import { router as boardsRouter } from './routes/boards';

const app = express();
const port = process.env.PORT || 5001;

// cors middleware
app.use(cors());

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript!');
});

app.use('/boards', boardsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send({ message: 'Route not found' });
});

// error handling
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    console.error(err.stack); // prints the stack trace to the console
    res.status(500).send({ message: 'An error occurred' });
  } else {
    console.error(err);
    res.status(500).send({ message: 'An unknown error occurred' });
  }
});

// Connect to the database before starting the server
connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to establish a database connection', error);
    process.exit(1);
  });

// Handle clean up on various signals
process.on('SIGINT', closeDbAndExit);
process.on('SIGTERM', closeDbAndExit);

function closeDbAndExit() {
  closeDb()
    .then(() => {
      process.exit();
    })
    .catch((error) => {
      console.error('Failed to close the database connection', error);
      process.exit(1);
    });
}
