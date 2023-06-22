import { Board } from '../types/types';

interface BoardsProps {
  boards: Board[];
}

function Boards({ boards }: BoardsProps) {
  console.log(boards);
  return <div>Boards</div>;
}

export { Boards };
