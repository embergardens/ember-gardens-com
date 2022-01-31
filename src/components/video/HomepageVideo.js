import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import ReactPlayer from 'react-player'

// Assets
import webmVideo from '../../assets/video/EG_Intro_Animation_1.webm'
import mp4Video from '../../assets/video/EG_Intro_Animation_1.mp4'
import videoPoster from '../../assets/images/EG_poster.jpg'
import { HomeLogo } from '../icons/HomeLogo'


export const HomepageVideo = () => {
   const logoAnime = {
      in: {
         opacity: 1,
      },

      out: {
         opacity: 0,

      }
   }

   const [ duration, setDuration ] = useState( 0 )
   const [ progress, setProgress ] = useState( {} )
   let isLoaded = false
   const [ isStarted, setIsStarted ] = useState( false )
   const [ isPlaying, setIsPlaying ] = useState( false )

   const handleDuration = ( time ) => setDuration( time )
   const handleProgress = ( time ) => {
      //setProgress( time )
      // if ( time.playedSeconds > 7 ) {
      //    console.log('animate!')
      //    return isLoaded = true
      // }
   }
   const handlePlaying = ( e ) => setIsPlaying( true )
   const handleStarted = ( e ) => setIsStarted( true )

   return (
      <div className='homeVideo'>
         <motion.div
            className='homeVideo__logo'
            variants={ logoAnime }
            initial='out'
            animate={ isLoaded ? 'in' : 'out'}
         >
            <HomeLogo />
         </motion.div>
         <ReactPlayer
            className="homeVideo__video"
            url={[
               { src: webmVideo, type: 'video/webm' },
               { src: mp4Video, type: 'video/mp4' }
            ]}
            height="100%"
            width="100%"
            playing
            muted
            loop
            playsinline
            volume={0}
            // progressInterval={ 1000 }
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