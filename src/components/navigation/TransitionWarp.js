/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
import React from 'react'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'

import { useRecoilState} from 'recoil'
import { navOpenState, transitionImageState } from '../../store/navigation'

import farmer from '../../assets/images/illustrations/farmer.svg'
import joint from '../../assets/images/illustrations/joint.svg'
import mantis from '../../assets/images/illustrations/mantis.svg'
import woman from '../../assets/images/illustrations/woman.svg'

import { cubicInOut } from '../../functions/easing'
import { randomize } from '../../functions/utility'

const TransitionWarp = ( options ) => {
	const {
		exit: removedExit,
		entry: removedEntry,
		cover: removedProp,
		...props
	} = options

   // Props =======================
	const pathArray = [ 1, 2, 3 ]
   const length = props.duration || 1
   const illustrations = [
      {
         name: 'farmer',
         image: farmer,
      },
      {
         name: 'joint',
         image: joint,
      },
      {
         name: 'mantis',
         image: mantis,
      },
      {
         name: 'woman',
         image: woman,
      },
   ]
   const [currentImage, setCurrentImage ] = useRecoilState( transitionImageState )

   const motion = {
      cover: null,
      delayPerPath: 90,
      delayPointsArray: [],
      delayPointsMax: 420,
      duration: 600,
      exitNode: null,
      image: null,
      intermissionTime: 250,
      isAnimating: false,
      isOpened: false,
      numPoints: 4,
      paths: [],
      timeStart: 0,
      timers: {},
   }

   // Lifecycle Methods ====================
   const [ navOpen, setNavOpen ] = useRecoilState( navOpenState )

   const toggleNav = () => {
      setTimeout(() => {
         if ( navOpen ) {
            setNavOpen( false )
         }
      }, 0 );
   }

   const resetScroll = () => {
      setTimeout(() => {
         document.querySelector('.viewportMain').scrollTo( 0, 0 )
      }, 500 )
   }

   const resetFocus = () => {
      setTimeout(() => {
         const trap = document.querySelector('[data-react-modal-body-trap]')
         if ( trap ) { trap.focus() }
      }, 500);
   }

   // Lifecycle Hooks ======================
	const onExitComplete = () => {
		toggleNav()
		resetScroll()
      resetFocus()
	}

   // Functional Methods ====================

   const randomizePoints = () => {
		for (let i = 0; i < motion.numPoints; i += 1) {
			motion.delayPointsArray[i] = Math.random() * motion.delayPointsMax;
		}
	}

   const updatePathOut = ( time ) => {
		const e = []
		for (let s = 0; s < motion.numPoints; s += 1) {
			e[s] = 100 * (1 - cubicInOut(Math.min(Math.max(time - motion.delayPointsArray[s], 0) / motion.duration, 1)))
		}
		let pathMath = motion.isOpened ? `M 0 0 V ${e[0]}` : `M 0 ${e[0]}`
		for (let s = 0; s < motion.numPoints - 1; s += 1) {
			const t = (s + 1) / (motion.numPoints - 1) * 100
			const a = t - 1 / (motion.numPoints - 1) * 100 / 2
			pathMath += `C ${a} ${e[s]} ${a} ${e[s + 1]} ${t} ${e[s + 1]} `
		}
		pathMath += motion.isOpened ? "V 100 H 0" : "V 0 H 0"
		return pathMath
	}

   const updatePathIn = ( time ) => {
		const e = []
		for (let s = 0; s < motion.numPoints + 1; s += 1) {
			e[s] = 100 * cubicInOut(Math.min(Math.max(time - motion.delayPointsArray[s], 0) / motion.duration, 1))
		}
		let pathMath = motion.isOpened ? `M 0 0 V ${e[0]} ` : `M 0 ${e[0]} `
		for (let s = 0; s < motion.numPoints - 1; s += 1) {
			const t = (s + 1) / (motion.numPoints - 1) * 100
			const a = t - 1 / (motion.numPoints - 1) * 100 / 2;
			pathMath += `C ${a} ${e[s]} ${a} ${e[s + 1]} ${t} ${e[s + 1]} `
		}
		pathMath += motion.isOpened ? "V 0 H 0" : "V 100 H 0"
      return pathMath
	}

   const motionRender = () => {
		if (motion.isOpened) {
			for (let i = 0; i < motion.paths.length; i += 1) {
				const currentTime = Date.now() - (motion.timeStart + motion.delayPerPath * i)
				const newPath = updatePathIn( currentTime )
				motion.paths[i].setAttribute("d", newPath)
			}
      } else {
			for (let i = 0; i < motion.paths.length; i += 1) {
            const currentTime = Date.now() - (motion.timeStart + motion.delayPerPath * (motion.paths.length - i - 1) )
            const newPath = updatePathOut( currentTime )
            motion.paths[i].setAttribute("d", newPath)
         }
      }
   }

   // need to cancelAnimationFrame and clean up loop
   const motionRenderLoop = () => {
      let raf
      motionRender()
      if ( Date.now() - motion.timeStart < motion.duration + motion.delayPerPath * (motion.paths.length - 1) + motion.delayPointsMax ) {
         raf = requestAnimationFrame( () => motionRenderLoop() )
      } else {
         raf = cancelAnimationFrame(raf)
         motion.isAnimating = false
         if ( motion.isOpened ) {
            intermission()
         } else {
            cleanup()
         }
      }
   }

   const toggle = ( openState = false ) => {
      motion.isAnimating = true
      motion.isOpened = openState
      motion.timeStart = Date.now()
      randomizePoints()
      motionRenderLoop()
   }

   const intermission = () => {
      onExitComplete()
      motion.exitNode.style.opacity = 0
      motion.cover.style.transform = 'rotate(0deg)'
      motion.timers.intermission = setTimeout(() => {
         toggle( false )
         document.body.classList.remove('-transitionOpen')
         motion.bg.style.opacity = 0
         motion.bg.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
      }, motion.intermissionTime )
   }

   const cleanup = () => {
      clearTimeout( motion.timers.intermission )
      motion.cover.style.transform = 'rotate(180deg)'
      motion.bg.style.opacity = 0
      motion.bg.style.clipPath = 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
   }

   // Timeline ==============================
   const runWarp = ({ node }) => {
      motion.cover = document.querySelector('.tl-cover-el')
      motion.paths = motion.cover.querySelectorAll('.mjScreen__path')
      motion.bg = document.querySelector('.mjScreen__illustration')
      motion.exitNode = node
      toggle( true )
      document.body.classList.add('-transitionOpen')
      motion.bg.style.opacity = 1
      motion.bg.style.clipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
   }

	return (
		<>
			<TransitionLink
				exit={{
					length,
					trigger: ({ exit, node }) => {
                  setCurrentImage( randomize( illustrations ) )
                  runWarp({
							props: exit,
							node
						})

					},

				}}
				entry={{
					delay: 0.8,
               length,
				}}
				{...props}
			>
				{props.children}
			</TransitionLink>

			<TransitionPortal>
            <div className='tl-cover-parent'>
               <svg className="tl-cover-el mjScreen" viewBox="0 0 100 100" preserveAspectRatio="none">
                  { pathArray.map( (item) => <path className={`mjScreen__path path-${item}`} key={`path-${item}`}/> ) }
               </svg>
               <div className={`mjScreen__illustration -${ currentImage.name }`} style={{opacity: 0, clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }}>
                  <img src={ currentImage.image } alt={ currentImage.name } />
                  <div className='mjScreen__illustrationText'>Loading...</div>
               </div>
            </div>
			</TransitionPortal>
		</>
	)

}

export default React.memo( TransitionWarp )