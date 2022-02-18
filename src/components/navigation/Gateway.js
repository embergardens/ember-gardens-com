/* eslint-disable react/jsx-boolean-value */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react'
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { motion, AnimatePresence } from 'framer-motion'

import ReactModal from 'react-modal'
import { IconLogoWhite } from '../icons/IconLogoWhite'

export const Gateway = () => {
   // DATA ====================================================
   const data = useStaticQuery( graphql`
      query GatewayData {
         options: wp {
            ...Gateway
         }
      }
   `)

   const { options: { acfOptionsGlobal: { globalOptions: { gatewayOptions } } } } = data
   const { failmessage, failtext, passtext, subtitle, title, backgroundImage: image } = gatewayOptions
   const imageData = getImage(image?.localFile)

   // VARIABLES ====================================================
   const storageName = 'emberGardens:gateway'

   // STATE ====================================================
   const [ inStorage, setInStorage ] = useState()
   const [ isRemembered, setIsRemembered ] = useState(false)
   const [ isActive, setIsActive ] = useState( true )

   // LIFECYCLE ====================================================
   useEffect(() => {
      checkStorage()
   }, [])

   // METHODS ====================================================
   const handleInputChange = () => {
      setIsRemembered( rememberState => !rememberState )
   }

   const toggleIsActive = ( state ) => {
      setIsActive( state )
   }

   const checkStorage = () => {
      const local = localStorage.getItem( storageName )
      const session = sessionStorage.getItem( storageName )

      if ( local === 'false' || session === 'false' ) {
         setInStorage( false )
         toggleIsActive( true )
      } else if ( (local || session ) === null ) {
         setInStorage( null )
         toggleIsActive( true )
      } else {
         setInStorage( true )
         toggleIsActive( false )
      }
   }

   const youShallPass = () => {
      if ( isRemembered ) {
         localStorage.setItem( storageName, true)
      } else {
         sessionStorage.setItem( storageName, true)
      }

      toggleIsActive( false )
   }

   const youShallNotPass = () => {
      localStorage.setItem( storageName, false)
      sessionStorage.setItem( storageName, false)
      checkStorage()
   }

   // TEMPLATE ====================================================

   return (
      <AnimatePresence>
         { isActive &&
            <ReactModal
               isOpen={true}
               contentLabel='gateway content title'
               portalClassName='gateway'
               overlayClassName='gateway__overlay'
               className='gateway__content'
               bodyOpenClassName='-gatewayOpen'
               shouldCloseOnEsc={false}
               shouldCloseOnOverlayClick={false}
               preventScroll={true}
               appElement={document.querySelector('#___gatsby')}
               overlayElement={
                  (props, contentElement) => {
                     return (
                        <div className='gateway__overlay' {...props}>
                           { imageData &&
                              <GatsbyImage
                                 alt={image.altText}
                                 image={imageData}
                                 className='gateway__backgroundImage'
                                 placeholder="blurred"
                              />
                           }
                           {contentElement}
                        </div>
                     )
                  }
               }
               contentElement={
                  (props,children) => <motion.div {...props}>{children}</motion.div>
               }
            >
               <div className='gateway__contentWrapper'>
                  <div className='gateway__body'>
                     { inStorage === null &&
                        <>
                           <h4 className='gateway__title'>{ title }</h4>
                           <div className='gateway__subtitle'>{ subtitle }</div>
                           <div className='gateway__input'>
                              <input
                                 type='checkbox'
                                 id='rememberMe'
                                 checked={isRemembered}
                                 onChange={handleInputChange}
                                 value={isRemembered}
                              />
                              <label htmlFor='rememberMe'>
                                 Remember Me
                              </label>
                           </div>
                           <div className='gateway__buttons'>
                              <button
                                 type='button'
                                 className='gateway__button'
                                 onClick={youShallNotPass}
                              >
                                 {failtext}
                              </button>
                              <button
                                 type='button'
                                 className='gateway__button'
                                 onClick={youShallPass}
                              >
                                 {passtext}
                              </button>
                           </div>
                        </>
                     }
                     { inStorage === false &&
                        <h4 className='gateway__title'>
                           { failmessage }
                        </h4>
                     }
                  </div>
                  <div className='gateway__footer'>
                     <IconLogoWhite />
                  </div>
               </div>
            </ReactModal>
         }
      </AnimatePresence>
   )
}
