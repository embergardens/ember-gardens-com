/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
import React, { memo, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import ReactPlayer from 'react-player'

// Assets
import webmVideo from '../../assets/video/EG_Intro_Animation_1.webm'
import mp4Video from '../../assets/video/EG_Intro_Animation_1.mp4'
import videoPoster from '../../assets/images/EG_poster.jpg'
import { HomeLogo } from '../icons/HomeLogo'


export const HomepageVideo = () => {
   const logoAnime = {
      logoEnter: {
         opacity: 1,
      },

      logoExit: {
         opacity: 0,

      }
   }
   const playVideo = true
   const [ duration, setDuration ] = useState( 0 )
   const [ progress, setProgress ] = useState( {} )
   const [ isLoaded, setIsLoaded ] = useState( false )
   const [ isStarted, setIsStarted ] = useState( false )
   const [ isPlaying, setIsPlaying ] = useState( false )

   const handleDuration = ( time ) => setDuration( time )
   const handleProgress = ( time ) => {
      setProgress( time )
      if ( time.playedSeconds > 7 ) {
         setIsLoaded( true )
      }
   }
   const handlePlaying = ( e ) => setIsPlaying( true )
   const handleStarted = ( e ) => setIsStarted( true )

   const sourceFiles = [
      { src: webmVideo, type: 'video/webm' },
      { src: mp4Video, type: 'video/mp4' }
   ]
   const files = useMemo( () => [...sourceFiles], [])

   return (
      <div className='homeVideo'>
         <motion.div
            className='homeVideo__logo'
            variants={ logoAnime }
            initial='logoExit'
            animate={ isLoaded ? 'logoEnter' : 'logoExit'}
         >
            <HomeLogo />
         </motion.div>
         <ReactPlayer
            className="homeVideo__video"
            url={ files }
            height="100%"
            width="100%"
            playing
            muted
            loop
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
            onStart={ handleStarted }
            onPlay={ handlePlaying }
            onDuration={ handleDuration }
            onProgress={ handleProgress }

         />
      </div>
   )
}