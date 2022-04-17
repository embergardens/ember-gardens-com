import { atom, selector } from "recoil"

export const reduceMotionState = atom({
   key: 'reduceMotionState',
   default: false
})

export const currentThemeState = atom({
   key: 'currentThemeState',
   default: 'white'
})

export const currentTextColorOverrideState = atom({
   key: 'currentTextColorOverrideState',
   default: null
})

export const currentTextColorState = selector({
   key: 'currentTextColorState',
   get: ({get}) => {
      const theme = get( currentThemeState )
      const override = get( currentTextColorOverrideState )

      if ( override !== null ) {
         if ( override === 'dark' ) {
            return 'light'
         }

         return 'dark'
      }

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
