import type { ICat } from "@/shared/api/model";
import { create } from "zustand";

interface IUseCatsStore {
    cats: ICat[];
    setCats: (cats: ICat[]) => void;
    catId: number | null;
    setCatId: (catId: number | null) => void;
}

export const useCatsStore = create<IUseCatsStore>((set) => ({
    cats: [],
    setCats: (cats) => set({ cats: cats }),
    catId: null,
    setCatId: (catId) => set({ catId: catId }),
}));
