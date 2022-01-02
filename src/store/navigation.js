import { atom } from "recoil";

export const navOpenState = atom({
   key: 'navOpenState',
   default: false
})

export const activeTransitionState = atom({
   key: 'activeTransitionState',
   default: false
})