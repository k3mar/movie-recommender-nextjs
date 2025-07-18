import { create } from "zustand";
import type { RefObject } from "react";
import { type Session } from "@supabase/supabase-js";

interface Store {
  session: Session | null;
  loading: boolean;
  resultRef: RefObject<HTMLDivElement | null> | null;

  displayResults: boolean;

  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setRef: (ref: RefObject<HTMLDivElement | null> | null) => void;

  setDisplayResults: (displayResults: boolean) => void;
}

const useDataStore = create<Store>((set) => ({
  resultRef: null,
  session: null,
  loading: true,

  displayResults: false,

  setLoading: (loading) => set((store) => ({ ...store, loading })),
  setSession: (session) => set((store) => ({ ...store, session })),
  setRef: (ref) => set((store) => ({ ...store, resultRef: ref })),

  setDisplayResults: (displayResults) =>
    set((store) => ({ ...store, displayResults })),
}));

export default useDataStore;
