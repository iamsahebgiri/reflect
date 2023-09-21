import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrentThought = {
  currentThoughtId: null | string;
  setCurrentThoughtId: (id: string) => void;
  clearCurrentThoughtId: () => void;
};

export const useCurrentThought = create<CurrentThought>((set) => ({
  currentThoughtId: null,
  setCurrentThoughtId: (id) => set(() => ({ currentThoughtId: id })),
  clearCurrentThoughtId: () => set(() => ({ currentThoughtId: null })),
}));

type CommandMenuStore = {
  open: boolean;
  setOpen: (val: boolean) => void;
};

export const useCommandMenuStore = create<CommandMenuStore>((set) => ({
  open: false,
  setOpen: (val) => set(() => ({ open: val })),
}));

type Thought = {
  id: string;
  timestamp: string;
  value: string;
};

type Thoughts = {
  thoughts: Thought[];
  add: (value: string) => void;
  edit: (id: string, value: string) => void;
  delete: (id: string) => void;
};

export const useThoughts = create(
  persist<Thoughts>(
    (set) => ({
      thoughts: [],
      add: (value) => {
        const thought = {
          id: Math.random().toString(36).slice(2),
          value,
          timestamp: new Date().toISOString(),
        };
        return set((state) => ({
          thoughts: [...state.thoughts, thought],
        }));
      },
      edit: (id, value) =>
        set((state) => {
          const updatedThoughts = state.thoughts.map((thought) => {
            if (thought.id === id) {
              return {
                id: thought.id,
                value,
                timestamp: new Date().toISOString(),
              };
            }
            return thought;
          });

          return {
            thoughts: updatedThoughts,
          };
        }),
      delete: (id: string) =>
        set((state) => {
          const newThoughts = state.thoughts.filter(
            (thought) => thought.id !== id
          );
          return {
            thoughts: newThoughts,
          };
        }),
    }),
    {
      name: "REFLECT_THOUGHTS",
    }
  )
);
