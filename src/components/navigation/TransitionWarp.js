/* eslint-disable no-use-before-define */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from 'react'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'

import { useRecoilState} from 'recoil'
import { navOpenState } from '../../store/navigation'

import { cubicInOut } from '../../functions/easing'

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

   const motion = {
      cover: null,
      delayPerPath: 90,
      delayPointsArray: [],
      delayPointsMax: 420,
      duration: 600,
      exitNode: null,
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

   // Lifecycle Hooks ======================
	const onExitComplete = () => {
		toggleNav()
		resetScroll()
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
            try {
               motion.paths[i].setAttribute("d", newPath)
            } catch (error) {
               console.error({error})
               console.log({ cover, path, motion})
            }
         }
      }
   }

   const motionRenderLoop = () => {
      motionRender()
      if ( Date.now() - motion.timeStart < motion.duration + motion.delayPerPath * (motion.paths.length - 1) + motion.delayPointsMax ) {
         requestAnimationFrame( () => motionRenderLoop() )
      } else {
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
      }, motion.intermissionTime )
   }

   const cleanup = () => {
      clearTimeout( motion.timers.intermission )
      motion.cover.style.transform = 'rotate(180deg)'
   }

   // Timeline ==============================
   const runWarp = ({ node, props: { exit, length: seconds } }) => {
      motion.cover = document.querySelector('.tl-cover-el')
      motion.paths = motion.cover.querySelectorAll('.mjScreen__path')
      motion.exitNode = node
      toggle( true )
   }

	return (
		<>
			<TransitionLink
				exit={{
					length: length,
					trigger: ({ exit, node }) => {
						runWarp({
							props: exit,
							node
						})
					},

				}}
				entry={{
					delay: 0.8,
               length: length
				}}
				{...props}
			>
				{props.children}
			</TransitionLink>

			<TransitionPortal>
            <svg className="tl-cover-el mjScreen" viewBox="0 0 100 100" preserveAspectRatio="none">
               { pathArray.map( (item) => <path className={`mjScreen__path path-${item}`} key={`path-${item}`}/> ) }
            </svg>
			</TransitionPortal>
		</>
	)

}

export default React.memo( TransitionWarp )