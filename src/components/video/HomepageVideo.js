/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player'

// Store
import { useRecoilValue } from 'recoil'
import { isPortraitState } from '../utility/Breakpoints'
import { gatewayPassedState } from '../../store/homepage'

// Assets
import introDesktopMp4 from '../../assets/video/EG_Desktop_intro.mp4'
import loopDesktopMp4 from '../../assets/video/EG_Desktop_loop.mp4'
import introMobileMp4 from '../../assets/video/EG_Mobile_intro.mp4'
import loopMobileMp4 from '../../assets/video/EG_Mobile_loop.mp4'
import desktopPoster from '../../assets/images/EG_Desktop_Still.png'
import mobilePoster from '../../assets/images/EG_Mobile_Still.png'


export const HomepageVideo = () => {

   const storageName = 'emberGardens:introPlayed'
   const isPortrait = useMediaQuery( useRecoilValue( isPortraitState ) )

   const [ introIsLoaded, setIntroIsLoaded ] = useState( false )
   const [ loopIsLoaded, setLoopIsLoaded ] = useState( false )

   const [ playLoop, setPlayLoop ] = useState( false )
   const playIntro = useRecoilValue( gatewayPassedState )
   const introHasPlayed = sessionStorage.getItem( storageName )
   let noIntro = false

   const handleIntroReady = () => setIntroIsLoaded( true )
   const handleLoopReady = () => setLoopIsLoaded( true )
   const handleIntroStarted = () => sessionStorage.setItem( storageName, true )
   const handleIntroEnded = () => setPlayLoop( true )

   useEffect(() => {
      if ( introHasPlayed ) {
         setPlayLoop( true )
         noIntro = true
      }
   }, [])


   // VIDEO FILES ==============================================
   const videos = {
      intro: {
         mobile: [
            // { src: webmVideo, type: 'video/webm' },
            { src: introMobileMp4, type: 'video/mp4' }
         ],
         desktop: [ { src:introDesktopMp4, type: 'video/mp4' } ]
      },
      loop: {
         mobile: [ { src: loopMobileMp4, type: 'video/mp4' } ],
         desktop: [ { src: loopDesktopMp4, type: 'video/mp4' } ]
      }
   }
   const introFiles = isPortrait ? videos.intro.mobile : videos.intro.desktop
   const loopFiles = isPortrait ? videos.loop.mobile : videos.loop.desktop
   const videoPoster = isPortrait ? mobilePoster : desktopPoster

   const introVideos = useMemo( () => [...introFiles], [])
   const loopVideos = useMemo( () => [...loopFiles], [])

   return (
      <div className='homeVideo'>
         { ! introHasPlayed &&
            <ReactPlayer
            className="homeVideo__video -intro"
            url={ introVideos }
            height="100%"
            width="100%"
            playing={ playIntro }
            muted
            playsinline
            volume={0}
            progressInterval={ 1000 }
            config={{
               file: {
                  attributes: {
                     poster: videoPoster
                  }
               }
            }}
            onReady={ handleIntroReady }
            onStart={ handleIntroStarted }
            // onPlay={ handleIntroPlaying }
            onEnded={ handleIntroEnded }
            />
         }
         <motion.div
            initial={{ opacity: 0 }}
            animate={
               playLoop && !noIntro
               ? { opacity: 1, transition: { duration: 1 } }
               : { opacity: 0 }
            }
         >
            <ReactPlayer
               className="homeVideo__video -loop"
               url={ loopVideos }
               height="100%"
               width="100%"
               playing={ playLoop }
               muted
               loop
               playsinline
               volume={0}
               onReady={ handleLoopReady }
               config={{
                  file: {
                     attributes: {
                        poster: videoPoster
                     }
                  }
               }}
            />
         </motion.div>
      </div>
   )
}