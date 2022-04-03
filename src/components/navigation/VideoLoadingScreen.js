import React from 'react'
import { useMediaQuery } from 'react-responsive'
import { useRecoilValue } from 'recoil'
import { isPortraitState } from '../utility/Breakpoints'

import mobileImage from '../../assets/images/EG_MOBILE_Still_Blur.jpg'
import desktopImage from '../../assets/images/EG_Desktop_Still_Blur.jpg'

const VideoLoadingScreen = () => {
   const isPortrait = useMediaQuery( useRecoilValue( isPortraitState ) )
   const bgImage = isPortrait ? mobileImage : desktopImage

   return (
      <div className='videoLoadingScreen'>
         <div className='videoLoadingScreen__media'>
            <img src={bgImage} alt='' />
         </div>
         <div className='videoLoadingScreen__content'>
            Loading...
         </div>
      </div>
   )
}

export default VideoLoadingScreen