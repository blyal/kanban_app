import { useQuery } from 'react-query';
import { client } from './api-client';

const BOARDS_URL = 'boards';

function useGetBoards() {
  const result = useQuery('boards', () => client(BOARDS_URL));
  return { ...result, boards: result.data?.data ?? [] };
}

export { useGetBoards };
