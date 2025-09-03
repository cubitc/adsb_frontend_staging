// hooks/use-app-user.ts
"use client";

import { useAtom, useAtomValue } from "jotai";
import type UserModel from "../models/user-model";
import { userAtom } from "../stores/user.atom";

export function useAppUser() {
  const state = useAtomValue(userAtom);
  const [user, setUserState] = useAtom(userAtom);

  const setUser = (userData: UserModel) => {
    setUserState(userData);
  };

  const updateUser = (partialUser: Partial<UserModel>) => {
    setUserState((prev) => ({ ...prev, ...partialUser }));
  };

  const reset = () =>
    setUserState({
      id: null,
      full_name: null,
      email: null,
      user_uid: null,
    });

  return {
    user,
    state,
    setUser,
    updateUser,
    reset,
  };
}
