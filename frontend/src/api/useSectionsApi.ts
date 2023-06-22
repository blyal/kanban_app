import { useMutation, useQuery, useQueryClient } from 'react-query';
import { HttpMethod, client } from './api-client';
import { Section, AddSectionData } from '../types/types';

const SECTIONS_URL = 'sections';

function useGetSectionsByBoard(boardId: string) {
  const result = useQuery('sections', () =>
    client<Section[]>(SECTIONS_URL, {
      data: {
        boardId,
      },
    })
  );
  return { ...result, sections: result.data?.data ?? [] };
}

function useAddSectionToBoard() {
  const queryClient = useQueryClient();
  return useMutation(
    (data: AddSectionData) =>
      client(SECTIONS_URL, {
        method: HttpMethod.POST,
        data,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sections');
      },
    }
  );
}

export { useGetSectionsByBoard, useAddSectionToBoard };
