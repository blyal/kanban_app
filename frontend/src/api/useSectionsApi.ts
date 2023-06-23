import { useMutation, useQuery, useQueryClient } from 'react-query';
import { HttpMethod, client } from './api-client';
import {
  Section,
  AddSectionData,
  PatchSectionData,
  UpdateSectionOrderData,
} from '../types/types';

const SECTIONS_URL = 'sections';

function useGetSectionsByBoard(boardId: string | undefined) {
  const result = useQuery(['sections', boardId], () =>
    client<Section[]>(SECTIONS_URL, {
      params: {
        boardId,
      },
    })
  );
  return {
    ...result,
    sections: result.data?.data.sort((a, b) => a.order - b.order) ?? [],
  };
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

function usePatchSection() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ title, sectionId }: PatchSectionData) =>
      client(`${SECTIONS_URL}/${sectionId}`, {
        method: HttpMethod.PATCH,
        data: { title },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sections');
      },
    }
  );
}

function useDeleteSection() {
  const queryClient = useQueryClient();
  return useMutation(
    (sectionId: string) =>
      client(`${SECTIONS_URL}/${sectionId}`, {
        method: HttpMethod.DELETE,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sections');
      },
    }
  );
}

function useUpdateSectionOrder() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ sectionId, newOrder }: UpdateSectionOrderData) =>
      client(`${SECTIONS_URL}/reorder/${sectionId}`, {
        method: HttpMethod.PATCH,
        data: { newOrder },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('sections');
      },
    }
  );
}

export {
  useGetSectionsByBoard,
  useAddSectionToBoard,
  usePatchSection,
  useDeleteSection,
  useUpdateSectionOrder,
};
