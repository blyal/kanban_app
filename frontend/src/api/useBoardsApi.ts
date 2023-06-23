import { useMutation, useQuery, useQueryClient } from 'react-query';
import { HttpMethod, client } from './api-client';
import { Board, ApiBoardData } from '../types/types';

const BOARDS_URL = 'boards';

function useGetBoards() {
  const result = useQuery('boards', () => client<Board[]>(BOARDS_URL));
  return { ...result, boards: result.data?.data ?? [] };
}

function useAddBoard() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: ApiBoardData) =>
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

function usePatchBoard() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ boardId, data }: { boardId: string; data: ApiBoardData }) =>
      client(`${BOARDS_URL}/${boardId}`, {
        method: HttpMethod.PATCH,
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('boards');
      },
    }
  );
}

function useDeleteBoard() {
  const queryClient = useQueryClient();
  return useMutation(
    (boardId: string) =>
      client(`${BOARDS_URL}/${boardId}`, {
        method: HttpMethod.DELETE,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('boards');
      },
    }
  );
}

export { useGetBoards, useAddBoard, usePatchBoard, useDeleteBoard };
