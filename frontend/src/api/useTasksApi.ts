import { useMutation, useQuery, useQueryClient } from 'react-query';
import { HttpMethod, client } from './api-client';
import { Task, AddTaskData } from '../types/types';

const TASKS_URL = 'tasks';

function useGetTasksByBoard(boardId: string | undefined) {
  const result = useQuery(['tasks', boardId], () =>
    client<Task[]>(TASKS_URL, {
      params: {
        boardId,
      },
    })
  );
  return { ...result, tasks: result.data?.data ?? [] };
}

function useAddTaskToSection() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: AddTaskData) =>
      client(TASKS_URL, {
        method: HttpMethod.POST,
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );
}

export { useGetTasksByBoard, useAddTaskToSection };
