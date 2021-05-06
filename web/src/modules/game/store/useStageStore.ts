import { Vector2d } from "konva/types/types";
import create from "zustand";

type StageState = {
  stageRef: any;
  setStageRef: (currentRef: any) => void;
  stageScale: number;
  stagePosition: Vector2d;
  updateScale: (scale: number) => void;
  updatePosition: (pos: Vector2d) => void;
  resetScale: () => void;
  resetPosition: () => void;
};

export const useStageStore = create<StageState>((set) => ({
  stageRef: undefined,
  setStageRef: (currentRef) => set({ stageRef: currentRef }),
  stageScale: 1,
  stagePosition: { x: 0, y: 0 },
  updateScale: (scale) => set({ stageScale: scale }),
  updatePosition: (pos) => set({ stagePosition: pos }),
  resetScale: () => set({ stageScale: 1 }),
  resetPosition: () => set({ stagePosition: { x: 0, y: 0 } })
}));
