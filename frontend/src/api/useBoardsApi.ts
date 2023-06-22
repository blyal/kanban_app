import { useQuery } from 'react-query';
import { client } from './api-client';
import { Board } from '../types/types';

const BOARDS_URL = 'boards';

function useGetBoards() {
  const result = useQuery('boards', () => client<Board[]>(BOARDS_URL));
  return { ...result, boards: result.data?.data ?? [] };
}

export { useGetBoards };
