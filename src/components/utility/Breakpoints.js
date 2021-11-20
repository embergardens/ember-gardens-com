import { useMediaQuery } from 'react-responsive'
import { atom, useRecoilValue } from 'recoil'

export const isDesktop = atom({
   key: 'isDesktop',
   default: { minWidth: 992 }
})

export const isTablet = atom({
   key: 'isTablet',
   default: { minWidth: 768, maxWidth: 991 }
})
export const isMobile = atom({
   key: 'isMobile',
   default: { maxWidth: 767 }
})

export const isNotMobile = atom({
   key: 'isNotMobile',
   default: { minWidth: 768 }
})

export const BreakpointDesktop = ({ children }) => {
   const desktop = useMediaQuery( useRecoilValue( isDesktop ) )
   return desktop ? children : null
}
export const BreakpointTablet = ({ children }) => {
   const tablet = useMediaQuery( useRecoilValue( isTablet ) )
   return tablet ? children : null
}
export const BreakpointMobile = ({ children }) => {
   const mobile = useMediaQuery( useRecoilValue ( isMobile ) )
   return mobile ? children : null
}
export const BreakpointNotMobile = ({ children }) => {
   const notMobile = useMediaQuery( useRecoilValue( isNotMobile ) )
   return notMobile ? children : null
}
