/* eslint-disable react/jsx-boolean-value */
/* eslint-disable arrow-body-style */
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import { IconLogoWhite } from '../icons/IconLogoWhite'
import { IconMantis } from '../icons/IconMantis'

export const Gateway = () => {
   const [ inStorage, setInStorage ] = useState()
   const [ isRemembered, setIsRemembered ] = useState(false)
   const [ isActive, setIsActive ] = useState( true )

   const handleInputChange = () => {
      setIsRemembered( rememberState => !rememberState )
   }

   const toggleIsActive = ( state ) => {
      setIsActive( state )
   }

   const storageName = 'emberGardens:gateway'

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

   useEffect(() => {
      checkStorage()
   }, [])

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
      //window.location.replace('https://pawpatrolandfriends.com/')
   }


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
               contentElement={
                  (props,children) => <motion.div {...props}>{children}</motion.div>
               }
            >
               <div className='gateway__contentWrapper'>
                  <div className='gateway__body'>
                     { inStorage === null &&
                        <>
                           <div className='gateway__title'>Are you 21 years of age or older?</div>
                           <div className='gateway__subtitle'>New York & Florida: 18+ with valid medical ID</div>
                           <div className='gateway__input'>
                              <label htmlFor='rememberMe'>
                                 Remember Me
                                 <input type='checkbox' name='rememberMe' checked={isRemembered} onChange={handleInputChange} />
                              </label>
                           </div>
                           <div className='gateway__buttons'>
                              <button type='button' className='gateway__button' onClick={youShallNotPass}>No</button>
                              <button type='button' className='gateway__button' onClick={youShallPass} >Yes</button>
                           </div>
                        </>
                     }
                     { inStorage === false &&
                        <div className='gateway__title'>
                           Must be 21 years of age to enter this site.
                        </div>
                     }
                  </div>
                  <div className='gateway__media'>
                     <div className='gateway__mediaWrapper'>
                        <IconMantis outline />
                     </div>
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