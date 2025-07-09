import { create } from "zustand";

type Store={
  theme: string;
  setTheme: (theme: string) => void;
}
export const useThemeStore = create<Store>((set) => ({
  theme: localStorage.getItem("streamifyt-theme") || "coffee",
  setTheme: (theme: string) => {
    localStorage.setItem("streamifyt-theme", theme);
    set({ theme })
  },
}));