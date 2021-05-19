import create from "zustand";

export enum GameModalType {
  GAME_PASSWORD,
  SELECT_MAP
}

type GameModalState = {
  modal: GameModalType;
  openModal: (type: GameModalType) => void;
  closeModal: () => void;
};

export const useGameModalStore = create<GameModalState>((set) => ({
  modal: undefined,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: undefined })
}));
