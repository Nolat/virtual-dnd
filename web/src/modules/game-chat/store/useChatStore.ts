import { Position } from "react-rnd";
import create from "zustand";

type ChatState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  isPinned: boolean;
  pin: () => void;
  unpin: () => void;
  togglePin: () => void;
  isPoppedOut: boolean;
  popOut: () => void;
  popIn: () => void;
  togglePopOut: () => void;
  rndPos: Position;
  setRndPos: (pos: Position) => void;
  resetRndPos: () => void;
  rndSize: { width: string; height: string };
  setRndSize: (size: { width: string; height: string }) => void;
  resetRndSize: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () =>
    set((state) => ({
      isOpen: !state.isOpen
    })),
  isPinned: false,
  pin: () => set({ isPinned: true }),
  unpin: () => set({ isPinned: false }),
  togglePin: () =>
    set((state) => ({
      isPinned: !state.isPinned
    })),
  isPoppedOut: false,
  popOut: () => set({ isPoppedOut: true }),
  popIn: () => set({ isPoppedOut: false }),
  togglePopOut: () =>
    set((state) => ({
      isPoppedOut: !state.isPoppedOut
    })),
  rndPos: { x: 0, y: 0 },
  setRndPos: (pos) => set({ rndPos: pos }),
  resetRndPos: () => set({ rndPos: { x: 0, y: 0 } }),
  rndSize: { width: "300px", height: "750px" },
  setRndSize: (size) => set({ rndSize: size }),
  resetRndSize: () => set({ rndSize: { width: "300px", height: "750px" } })
}));
