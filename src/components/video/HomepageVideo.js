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
import { reduceMotionState } from '../../store/global'

// Assets
import introDesktopMp4 from '../../assets/video/EG_DESKTOP_Intro_Option1_032722.mp4'
import loopDesktopMp4 from '../../assets/video/EG_DESKTOP_Loop_Option1_032722.mp4'

import introMobileMp4 from '../../assets/video/EG_MOBILE_Intro_Option1_032722.mp4'
import loopMobileMp4 from '../../assets/video/EG_MOBILE_Loop_Option1_032722.mp4'

import desktopPoster from '../../assets/images/EG_DESKTOP_Still_Option1_032722.jpg'
import mobilePoster from '../../assets/images/EG_MOBILE_Still_Option1_032722.jpg'


const HomepageVideo = () => {

   const storageName = 'emberGardens:introPlayed'
   const isPortrait = useMediaQuery( useRecoilValue( isPortraitState ) )
   const reducedMotion = useRecoilValue( reduceMotionState )

   const [ introIsLoaded, setIntroIsLoaded ] = useState( false )
   const [ loopIsLoaded, setLoopIsLoaded ] = useState( false )

   const [ playLoop, setPlayLoop ] = useState( false )
   const playIntro = useRecoilValue( gatewayPassedState )
   let introHasPlayed
   let noIntro = false

   const handleIntroReady = () => setIntroIsLoaded( true )
   const handleLoopReady = () => setLoopIsLoaded( true )
   const handleIntroStarted = () => sessionStorage.setItem( storageName, true )
   const handleIntroEnded = () => setPlayLoop( true )

   useEffect(() => {
      introHasPlayed = sessionStorage.getItem( storageName )
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
      <>
         { ! reducedMotion &&
            <div className='homeVideo'>

               { ! introHasPlayed &&
                  <ReactPlayer
                  className="homeVideo__video -intro"
                  tabIndex='-1'
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
                     tabIndex='-1'
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
         }
         { reducedMotion &&
            <div className='homeVideo'>
               <img src={ videoPoster} alt='' />
            </div>
         }
      </>
   )
}

export default HomepageVideo