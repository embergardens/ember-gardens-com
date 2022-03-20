import { atom } from "recoil";

export const navOpenState = atom({
   key: 'navOpenState',
   default: false
})

export const activeTransitionState = atom({
   key: 'activeTransitionState',
   default: false
})

export const currentSectionState = atom({
   key: 'currentSectionState',
   default: null,
})

export const transitionImageState = atom({
   key: 'transitionImageState',
   default: { name: 'none', image: null },
})