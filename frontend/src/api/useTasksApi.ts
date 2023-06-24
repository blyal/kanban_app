import { useMutation, useQuery, useQueryClient } from 'react-query';
import { HttpMethod, client } from './api-client';
import { Task, ApiTaskData, MoveTaskData } from '../types/types';

const TASKS_URL = 'tasks';

function useGetTasksByBoard(boardId: string | undefined) {
  const result = useQuery(['tasks', boardId], () =>
    client<Task[]>(TASKS_URL, {
      params: {
        boardId,
      },
    })
  );
  return {
    ...result,
    tasks: result.data?.data.sort((a, b) => a.order - b.order) ?? [],
  };
}

function useAddTaskToSection() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: ApiTaskData) =>
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

function usePatchTask() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ taskId, data }: { taskId: string; data: ApiTaskData }) =>
      client<Task>(`${TASKS_URL}/${taskId}`, {
        method: HttpMethod.PATCH,
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );
}

function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation(
    (taskId: string) =>
      client(`${TASKS_URL}/${taskId}`, {
        method: HttpMethod.DELETE,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );
}

function useMoveTask() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ taskId, newSectionId, newOrder }: MoveTaskData) =>
      client(`${TASKS_URL}/move/${taskId}`, {
        method: HttpMethod.PATCH,
        data: { newSectionId, newOrder },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sections');
        queryClient.invalidateQueries('tasks');
      },
    }
  );
}

export {
  useGetTasksByBoard,
  useAddTaskToSection,
  usePatchTask,
  useDeleteTask,
  useMoveTask,
};
