import { create } from "zustand/react";
import { User } from "@supabase/auth-js";

interface UserState {
  user: User | null;
}

// eslint-disable-next-line
export const useUser = create<UserState>()((set) => ({
  user: null,
}))