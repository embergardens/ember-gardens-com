import React from 'react'

import { useMediaQuery } from 'react-responsive'
import { useRecoilValue } from 'recoil'
import { isPortraitState } from '../utility/Breakpoints'

import desktopPoster from '../../assets/images/EG_Desktop_Still.png'
import mobilePoster from '../../assets/images/EG_Mobile_Still.png'

const VideoLoadingScreen = () => {
   const isPortrait = useMediaQuery( useRecoilValue( isPortraitState ) )

   return (
      <div className='videoLoadingScreen'>
         <div className='videoLoadingScreen__media'>
            {/* <img
               src={ isPortrait ? mobilePoster : desktopPoster }
               alt='loading screen'
            /> */}
         </div>
         <div className='videoLoadingScreen__content'>
            Loading...
         </div>
      </div>
   )
}

export default VideoLoadingScreen