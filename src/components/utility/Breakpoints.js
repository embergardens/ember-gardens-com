import { useMediaQuery } from 'react-responsive'
import { atom, useRecoilValue } from 'recoil'

export const isDesktop = atom({
   key: 'isDesktop',
   default: { minWidth: 992 }
})

export const isNotDesktop = atom({
   key: 'isNotDesktop',
   default: { maxWidth: 991 }
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

export const isNotSmallDesktop = atom({
   key: 'isNotSmallDesktop',
   default: { minHeight: 960 }
})

export const isPortraitState = atom({
   key: 'isPortraitState',
   default: { orientation: 'portrait' }
})

export const isLandscapeState = atom({
   key: 'isLandscapeState',
   default: { orientation: 'landscape' }
})

export const BreakpointDesktop = ({ children }) => {
   const desktop = useMediaQuery( useRecoilValue( isDesktop ) )
   return desktop ? children : null
}
export const BreakpointNotDesktop = ({ children }) => {
   const notDesktop = useMediaQuery( useRecoilValue( isNotDesktop ) )
   return notDesktop ? children : null
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

export const BreakpointNotSmallDesktop = ({ children }) => {
   const notSmallDesktop = useMediaQuery( useRecoilValue( isNotSmallDesktop ) )
   return notSmallDesktop ? children : null
}
