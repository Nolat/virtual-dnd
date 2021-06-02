import create from "zustand";

import { DiceType, Roll } from "common/definitions/graphql/generated";

type RollState = {
  isContainerOpen: boolean;
  openContainer: () => void;
  closeContainer: () => void;
  toggleContainer: () => void;
  rolls: Roll[];
  incrementCount: (dice: DiceType) => void;
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
    { dice: DiceType.D4, count: 0 },
    { dice: DiceType.D6, count: 0 },
    { dice: DiceType.D8, count: 0 },
    { dice: DiceType.D10, count: 0 },
    { dice: DiceType.D12, count: 0 },
    { dice: DiceType.D20, count: 0 },
    { dice: DiceType.D100, count: 0 }
  ],
  incrementCount: (dice) =>
    set((state) => {
      const rolls = state.rolls;
      const index = rolls.findIndex((r) => r.dice === dice);
      rolls[index].count += 1;

      return { rolls };
    }),
  resetCount: () => set((state) => ({ rolls: state.rolls.map((r) => ({ ...r, count: 0 })) }))
}));
