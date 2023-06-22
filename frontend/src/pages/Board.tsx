import { useParams } from 'react-router-dom';

function Board() {
  const { boardId } = useParams();

  return <>Hello</>;
}

export { Board };
