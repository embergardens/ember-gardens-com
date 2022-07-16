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

const HomepageVideo = ({ videos: uploads }) => {
   const {
      desktopBackgroundVideo: desktopIntro,
      desktopBackgroundLoopVideo: desktopLoop,
      desktopBackgroundVideoImage: desktopStill,
      mobileBackgroundVideo: mobileIntro,
      mobileBackgroundLoopVideo: mobileLoop,
      mobileBackgroundVideoImage: mobileStill,
   } = uploads

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
   const getMediaData = ( media, video = true ) => {
      if ( media?.localFile?.publicURL ) {
         if ( video ) {
            return {
               src: media.localFile.publicURL,
               type: `video/${media.localFile.extension}`
            }
         }
         return media.localFile.publicURL
      }
      console.warn( `[EMBER GARDENS:] Homepage video file is missing. Please check that all media files have been added in Wordpress.`, { uploads })
      return null
   }

   const videos = {
      intro: {
         mobile: [ getMediaData( mobileIntro ) ],
         desktop: [ getMediaData( desktopIntro ) ]
      },
      loop: {
         mobile: [ getMediaData( mobileLoop ) ],
         desktop: [ getMediaData( desktopLoop ) ]
      }
   }
   const introFiles = isPortrait ? videos.intro.mobile : videos.intro.desktop
   const loopFiles = isPortrait ? videos.loop.mobile : videos.loop.desktop
   const videoPoster = isPortrait ? getMediaData( mobileStill, false ) : getMediaData( desktopStill, false )

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
               <img src={ videoPoster } alt='' />
            </div>
         }
      </>
   )
}

export default HomepageVideo