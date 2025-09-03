// state/user.atom.ts
"use client";

import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import UserModel from "../models/user-model";

const initialUser: UserModel = {
  id: null,
  full_name: null,
  email: null,
  user_uid: null,
};

const storage =
  typeof window !== "undefined"
    ? createJSONStorage<UserModel>(() => localStorage)
    : (undefined as any);

export const userAtom = atomWithStorage<UserModel>(
  "app_user",
  initialUser,
  storage
);

export const setUserAtom = atom(null, (_get, set, payload: UserModel) => {
  set(userAtom, payload);
});

export const updateUserAtom = atom(
  null,
  (get, set, patch: Partial<UserModel>) => {
    const current = get(userAtom);
    set(userAtom, { ...current, ...patch });
  }
);

export const clearUserAtom = atom(null, (_get, set) => {
  set(userAtom, initialUser);
});
