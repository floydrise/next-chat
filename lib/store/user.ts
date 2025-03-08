import { create } from "zustand/react";
import { User } from "@supabase/auth-js";

interface UserState {
  user: User | null;
}

export const useUser = create<UserState>()((set) => ({
  user: null,
}))