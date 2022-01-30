import { atom, selector } from "recoil"

export const reduceMotionState = atom({
   key: 'reduceMotionState',
   default: false
})

export const currentThemeState = atom({
   key: 'currentThemeState',
   default: 'white'
})

export const currentTextColorState = selector({
   key: 'currentTextColorState',
   get: ({get}) => {
      const theme = get( currentThemeState )

      switch (theme) {
         case 'gradient':
            return 'dark'
         break;
         case 'plum':
            return 'dark'
         break;
         case 'rose':
            return 'dark'
         break;
         case 'coral':
            return 'dark'
         break;
         case 'white':
            return 'light'
         break;
         default:
            return 'light'
      }
   }
})
