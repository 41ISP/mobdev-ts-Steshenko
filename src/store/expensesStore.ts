import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpensesStory = create()(
    persist((set) => ({}), {name: 'expanses'})
)
