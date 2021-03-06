import create from "zustand";

export enum ModalType {
  CREATE_GAME,
  GAME_PASSWORD,
  INVITE_PLAYERS,
  PLAYER_COLOR_PICKER,
  RENAME_PLAYER,
  SELECT_MAP,
  SIGN_IN
}

type ModalState = {
  modal: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  modal: undefined,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: undefined })
}));
