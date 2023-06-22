import { useMutation, useQuery, useQueryClient } from 'react-query';
import { HttpMethod, client } from './api-client';
import { Board, AddBoardData } from '../types/types';

const BOARDS_URL = 'boards';

function useGetBoards() {
  const result = useQuery('boards', () => client<Board[]>(BOARDS_URL));
  return { ...result, boards: result.data?.data ?? [] };
}

function useAddBoard() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: AddBoardData) =>
      client(`${BOARDS_URL}`, {
        method: HttpMethod.POST,
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('boards');
      },
    }
  );
}

export { useGetBoards, useAddBoard };
