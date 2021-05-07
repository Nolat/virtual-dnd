import create from "zustand";

export enum ModalType {
  SELECT_MAP
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
