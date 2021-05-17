import create from "zustand";

type MapStore = {
  mapUrl: string;
  selectMap: (url: string) => void;
};

export const useMapStore = create<MapStore>((set) => ({
  mapUrl: "",
  selectMap: (url: string) => set({ mapUrl: url })
}));
