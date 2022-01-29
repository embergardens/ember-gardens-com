import { atom } from "recoil"

export const reduceMotionState = atom({
   key: 'reduceMotionState',
   default: false
})

export const currentBackgroundGradientState = atom({
   key: 'currentBackgroundGradientState',
   default: 'white'
})

export const currentTextÇolorState = atom({
   key: 'currentTextÇolorState',
   default: 'light'
})
