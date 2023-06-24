import React, { ReactNode } from 'react';
import { useGetBoards, useAddBoard } from '../api/useBoardsApi';
import { Board } from '../types/types';

interface BoardsContextApi {
  boards: Board[];
  isLoading: boolean;
}

const BoardsContext = React.createContext<BoardsContextApi | undefined>(
  undefined
);
BoardsContext.displayName = 'BoardsContext';

interface BoardsProviderProps {
  children: ReactNode;
}

function BoardsProvider({ children }: BoardsProviderProps) {
  const { boards, isLoading, isSuccess } = useGetBoards();
  const { mutateAsync: addBoard } = useAddBoard();

  React.useEffect(() => {
    if (isSuccess && boards.length < 1) {
      addBoard({ title: 'Board', description: 'Default Board' });
    }
  }, [boards, isSuccess, addBoard]);

  const value: BoardsContextApi = {
    boards,
    isLoading,
  };

  return (
    <BoardsContext.Provider value={value}>{children}</BoardsContext.Provider>
  );
}

function useBoardsContext() {
  const context = React.useContext(BoardsContext);
  if (context === undefined) {
    throw new Error(
      `useBoardsContext must be used within a <BoardsProvider />`
    );
  }
  return context;
}

export { BoardsProvider, useBoardsContext };
