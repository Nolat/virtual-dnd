import create from "zustand";

export enum RollType {
  D4 = "D4",
  D6 = "D6",
  D8 = "D8",
  D10 = "D10",
  D12 = "D12",
  D20 = "D20",
  D100 = "D100"
}

interface Roll {
  type: RollType;
  count: number;
}

type RollState = {
  isContainerOpen: boolean;
  openContainer: () => void;
  closeContainer: () => void;
  toggleContainer: () => void;
  rolls: Roll[];
  incrementCount: (type: RollType) => void;
  resetCount: () => void;
};

export const useRollStore = create<RollState>((set) => ({
  isContainerOpen: false,
  openContainer: () => set({ isContainerOpen: true }),
  closeContainer: () => set({ isContainerOpen: false }),
  toggleContainer: () =>
    set((state) => ({
      isContainerOpen: !state.isContainerOpen
    })),
  rolls: [
    { type: RollType.D4, count: 0 },
    { type: RollType.D6, count: 0 },
    { type: RollType.D8, count: 0 },
    { type: RollType.D10, count: 0 },
    { type: RollType.D12, count: 0 },
    { type: RollType.D20, count: 0 },
    { type: RollType.D100, count: 0 }
  ],
  incrementCount: (type) =>
    set((state) => {
      const rolls = state.rolls;
      const index = rolls.findIndex((r) => r.type === type);
      rolls[index].count += 1;

      return { rolls };
    }),
  resetCount: () => set((state) => ({ rolls: state.rolls.map((r) => ({ ...r, count: 0 })) }))
}));
