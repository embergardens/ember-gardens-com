export const updateTextTheme = ( theme, override ) => {
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