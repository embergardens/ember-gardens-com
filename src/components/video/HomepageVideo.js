/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useMediaQuery } from 'react-responsive'
import ReactPlayer from 'react-player/lazy'

// Store
import { useRecoilValue } from 'recoil'
import { isPortraitState } from '../utility/Breakpoints'
import { gatewayPassedState } from '../../store/homepage'
import { reduceMotionState } from '../../store/global'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

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
   const [ abortVideo, setAbortVideo ] = useState( false )

   const [ playLoop, setPlayLoop ] = useState( false )
   const playIntro = useRecoilValue( gatewayPassedState )
   let introHasPlayed, videoHasAborted
   let noIntro = false
   let count = 0

   // Developer Mode =============================================
   const developerMode = false
   const [ percentLoaded, setPercentLoaded ] = useState(0)
   const [ intervalCount, setIntervalCount ] = useState(0)

   const handlePercentLoaded = (value) => setPercentLoaded(value)
   const handleIntervalCount = (value) => setIntervalCount(value)

   // Refs ========================================================
   const introVideoRef = useRef(null)
   const loopVideoRef = useRef(null)

   // Methods =====================================================
   const handleIntroReady = () => setIntroIsLoaded( true )
   const handleLoopReady = () => setLoopIsLoaded( true )
   const handleAbortVideo = () => {
      setAbortVideo( true )
      sessionStorage.setItem('emberGardens:videoAborted', true)
   }
   const handleIntroStarted = () => sessionStorage.setItem( storageName, true )
   const handleIntroEnded = () => {
      setPlayLoop( true )
   }

   const videoGoNoGo = () => {
      const intervalTime = 4000
      const videoLoading = introHasPlayed ? loopVideoRef : introVideoRef
      const videoTimeout = setInterval(() => {

         const secondsLoaded = videoLoading?.current?.getSecondsLoaded()
         const videoDuration = videoLoading?.current?.getDuration()
         const loaded = Math.floor(secondsLoaded * 100 / videoDuration)
         count++
         handlePercentLoaded(loaded)
         handleIntervalCount(count)

         // Logs for testing connection speed.
         // console.log({secondsLoaded, videoDuration, count})
         // console.log(`${percentLoaded}% Loaded`)

         // If video is 80% loaded or more cancel test.
         if (loaded >= 80 ) {
            //console.log(loaded, count)
            clearInterval(videoTimeout)
         }

         if (count === 2) {
            if ( loaded <= 16 ) {
               handleAbortVideo()
               console.warn('[EMBER GARDENS]: Connection is too slow. Video loading aborted.', `${loaded}% loaded in ${count * intervalTime}ms`)
               clearInterval(videoTimeout)
            }
         }

         if (count === 4) {
            if ( loaded <= 32 ) {
               handleAbortVideo()
               console.warn('[EMBER GARDENS]: Connection is too slow. Video loading aborted.', `${loaded}% loaded in ${count * intervalTime}ms`)
               clearInterval(videoTimeout)
            }
         }

         if (count === 6) {
            if ( loaded <= 50 ) {
               handleAbortVideo()
               console.warn('[EMBER GARDENS]: Connection is too slow. Video loading aborted.', `${loaded}% loaded in ${count * intervalTime}ms`)
            }
            clearInterval(videoTimeout)
         }

      }, intervalTime) // check ever 8 seconds
   }

   const DevHelper = () => {
      return (
         <div className='developerStats'>
            <strong>Loaded:</strong> { percentLoaded }% | <strong>Time elapsed:</strong> { intervalCount * 4000 }ms
         </div>
      )
   }


   // Lifecycle ===================================================
   useEffect(() => {
      introHasPlayed = JSON.parse(sessionStorage.getItem( storageName ))
      if ( introHasPlayed ) {
         setPlayLoop( true )
         noIntro = true
      }

      videoHasAborted = JSON.parse(sessionStorage.getItem( 'emberGardens:videoAborted' ))
      if ( videoHasAborted ) {
         handleAbortVideo()
      } else {
         // Test connection speed. Abort video if too slow.
         videoGoNoGo()
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
      console.warn( `[EMBER GARDENS]: Homepage video file is missing. Please check that all media files have been added in Wordpress.`, { uploads })
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
   const videoPosterData = isPortrait ? getImage(mobileStill?.localFile) : getImage(desktopStill?.localFile)

   const introVideos = useMemo( () => [...introFiles], [])
   const loopVideos = useMemo( () => [...loopFiles], [])

   // Fallback ==============================================
   const FallbackImage = () => {
      return ( <GatsbyImage
         alt=''
         image={ videoPosterData }
         className='homeVideo__poster'
         placeholder="blurred"
         loading="eager"
      /> )
   }

   // Render ===========================================
   return (
      <>
         { developerMode &&
            <DevHelper />
         }
         { ! reducedMotion &&
            <div className='homeVideo'>
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                     opacity: 1,
                     transition: {
                        duration: 0.25,
                        delay: 2
                     }
                  }}
               >
                  <FallbackImage />
               </motion.div>

               { ! introHasPlayed && ! abortVideo &&
                  <AnimatePresence>
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={
                           introIsLoaded
                           ? { opacity: 1, transition: { duration: 0.25 } }
                           : { opacity: 0 }
                        }
                        exit={ playLoop ? { opacity: 1 } : { opacity: 0 } }
                        >
                        <ReactPlayer
                           ref={introVideoRef}
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
                           onReady={ handleIntroReady }
                           onStart={ handleIntroStarted }
                           // onPlay={ handleIntroPlaying }
                           onEnded={ handleIntroEnded }
                           fallback={<FallbackImage />}
                           />
                     </motion.div>
                  </AnimatePresence>
               }
               {
                  ! abortVideo &&
                  <AnimatePresence>
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={
                           playLoop && !noIntro
                           ? { opacity: 1, transition: { duration: 1 } }
                           : { opacity: 0 }
                        }
                        exit={{ opacity: 0 }}
                     >
                        <ReactPlayer
                           ref={loopVideoRef}
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
                           fallback={<FallbackImage />}
                        />
                     </motion.div>
                  </AnimatePresence>
               }
            </div>
         }
         { reducedMotion &&
            <div className='homeVideo'>
               <FallbackImage />
            </div>
         }
      </>
   )
}

export default HomepageVideo