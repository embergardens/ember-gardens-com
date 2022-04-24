/* eslint-disable react/jsx-boolean-value */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react'
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// Store
import { useSetRecoilState } from 'recoil'
import { gatewayPassedState } from '../../store/homepage'

// Motion
import { motion, AnimatePresence } from 'framer-motion'

// Components
import ReactModal from 'react-modal'
import { IconLogoWhite } from '../icons/IconLogoWhite'


ReactModal.setAppElement('#___gatsby');

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
   const { enableLocalStorage, failmessage, failtext, passtext, subtitle, title, backgroundImage: image } = gatewayOptions
   const imageData = getImage(image?.localFile)

   // VARIABLES ====================================================
   const storageName = 'emberGardens:gateway'
   const isPreview = process.env.IS_PREVIEW
   let isHomepage = false

   // STATE ====================================================
   const [ inStorage, setInStorage ] = useState()
   const [ isRemembered, setIsRemembered ] = useState(false)
   const [ isActive, setIsActive ] = useState( true )
   const setUserPassed = useSetRecoilState( gatewayPassedState )

   // LIFECYCLE ====================================================
   useEffect(() => {
      checkPage()
      checkStorage()
   }, [])

   // METHODS ====================================================
   const handleInputChange = () => {
      setIsRemembered( rememberState => !rememberState )
   }

   const toggleIsActive = ( state ) => {
      setIsActive( state )
   }

   const checkPage = () => {
      if ( location.pathname === '/' ) {
         isHomepage = true
      }
   }

   const checkStorage = () => {
      const local = localStorage.getItem( storageName )
      const session = sessionStorage.getItem( storageName )

      if ( isPreview === true ) {
         sessionStorage.setItem( storageName, true)
         setInStorage( true )
         setUserPassed( true )
         toggleIsActive( false )
         return
      }

      if ( local === 'false' || session === 'false' ) {
         setInStorage( false )
         setUserPassed( false )
         toggleIsActive( true )
      } else if ( (local || session ) === null ) {
         setInStorage( null )
         toggleIsActive( true )
      } else {
         setInStorage( true )
         setUserPassed( true )
         toggleIsActive( false )
      }
   }

   const youShallPass = () => {
      if ( isRemembered ) {
         localStorage.setItem( storageName, true)
      } else {
         sessionStorage.setItem( storageName, true)
      }
      setUserPassed( true )
      toggleIsActive( false )
   }

   const youShallNotPass = () => {
      //localStorage.setItem( storageName, false)
      sessionStorage.setItem( storageName, false)
      checkStorage()
   }

   const resetFocus = () => {
      setTimeout(() => {
         const trap = document.querySelector('.navBar__trigger')
         if ( trap ) { trap.focus() }
      }, 0);
   }

   // TEMPLATE ====================================================
   if ( inStorage === true ) {
      return null
   }

   return (
      <AnimatePresence>
         { isActive &&
            <ReactModal
               isOpen={true}
               contentLabel={ title }
               portalClassName='gateway'
               overlayClassName='gateway__overlay'
               className='gateway__content'
               bodyOpenClassName='-gatewayOpen'
               shouldCloseOnEsc={false}
               shouldCloseOnOverlayClick={false}
               shouldReturnFocusAfterClose={true}
               preventScroll={true}
               // appElement={'#___gatsby'}
               overlayElement={
                  (props, contentElement) => {
                     return (
                        <motion.div
                           className='gateway__overlay'
                           exit={{
                              opacity: 0,
                              transition: {
                                 duration: 1.5
                              }
                           }}
                           onAnimationComplete={ resetFocus }
                           {...props}
                        >
                           { imageData &&
                              <GatsbyImage
                                 alt={image.altText}
                                 image={imageData}
                                 className='gateway__backgroundImage'
                                 placeholder="blurred"
                              />
                           }
                           {contentElement}
                        </motion.div>
                     )
                  }
               }
               contentElement={
                  (props,children) => {
                     return(
                        <motion.div
                           {...props}
                           exit={{
                              opacity: 0,
                              translateY: '10vh',
                              transition: {
                                 duration: 1
                              }
                           }}
                        >
                           {children}
                        </motion.div>
                     )
                  }
               }
            >
               <div className='gateway__contentWrapper'>
                  <div className='gateway__body'>
                     { inStorage === null &&
                        <>
                           <h4 className='gateway__title'>{ title }</h4>
                           <div className='gateway__subtitle'>{ subtitle }</div>
                           { enableLocalStorage &&
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
                           }
                           <div className='gateway__buttons'>
                              <button
                                 type='button'
                                 className='gateway__button'
                                 onClick={youShallNotPass}
                                 aria-label={`Click to answer ${failtext}`}
                              >
                                 {failtext}
                              </button>
                              <button
                                 type='button'
                                 className='gateway__button'
                                 onClick={youShallPass}
                                 aria-label={`Click to answer ${passtext}`}
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
