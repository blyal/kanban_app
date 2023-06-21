import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 5001;

// logging middleware
app.use(morgan('dev'));

// body parsing middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript!');
});

// error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // prints the stack trace to the console
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
