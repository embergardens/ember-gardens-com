import { atom } from "recoil"

export const reduceMotionState = atom({
   key: 'reduceMotionState',
   default: false
})

export const currentThemeState = atom({
   key: 'currentThemeState',
   default: 'white'
})

export const currentTextColorState = atom({
   key: 'currentTextColorState',
   default: 'light'
})

export const currentTextColorOverrideState = atom({
   key: 'currentTextColorOverrideState',
   default: null
})

// export const currentTextColorUpdate = selector({
//    key: 'currentTextColorUpdate',
//    get: ({get}) => get(currentTextColorState),
//    set: ({get, set}) => {
//       const theme = get( currentThemeState )
//       const override = get( currentTextColorOverrideState )
//       set
//    }
// })
