import React, { useEffect } from 'react'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'
import gsap from 'gsap'

import { useRecoilState} from 'recoil'
import { navOpenState } from '../../store/navigation'

const TransitionWarp = ( options ) => {
	const {
		exit: removedExit,
		entry: removedEntry,
		cover: removedProp,
		...props
	} = options

	const [ navOpen, setNavOpen ] = useRecoilState( navOpenState )
	const direction = props.direction || 'left'
	const length = props.duration || 1

	const getCoverEl = () => document.querySelector(`.tl-cover-el`)

	const toggleNav = () => {
		setTimeout(() => {
			if ( navOpen ) {
				setNavOpen( false )
			}
		}, length - (length / 2) );
	}

	const resetScroll = () => {
		setTimeout(() => {
			document.querySelector('.viewportMain').scrollTo( 0, 0 )
		}, 500 )
	}

	const onExitComplete = () => {
		toggleNav()
		resetScroll()
	}

	const vertical = ({ node, props: { length: seconds }, direction }) => {
		const directionTo = direction === 'up' ? '-100%' : '100%'
		const directionFrom = direction === 'up' ? '100%' : '-100%'

		const wait = seconds / 6
		const half = (seconds - wait) / 2

		const cover = getCoverEl()

		return gsap
			.timeline()
			.set(cover, { y: directionFrom, opacity: 0 })
			.to(cover, {
				y: "0%",
				ease: "power1.easeInOut",
				duration: half,
				opacity: 1,
				onComplete: onExitComplete()
			})
			.set(node, { opacity: 0 })
			.to(
				cover,
				{
					y: directionTo,
					ease: "power1.easeIn",
					duration: half,
					opacity: 0,
				},
				`+=${wait}`,
			)
	}

	const moveInDirection = ({ props, direction, node }) => {
		if (direction === 'left' || direction === 'right') {
			return horizontal({ props, direction, node })
		}

		return vertical({ props, direction, node })
	}

	return (
		<>
			<TransitionLink
				exit={{
					length: length,
					trigger: ({ exit, node }) => {
						moveInDirection({
							props: exit,
							node,
							direction,
						})
					},

				}}
				entry={{
					delay: length / 2,
				}}
				{...props}
			>
				{props.children}
			</TransitionLink>

			<TransitionPortal>
            <svg class="tl-cover-el mjScreen" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path class="mjScreen__path"></path>
               <path class="mjScreen__path"></path>
               <path class="mjScreen__path"></path>
               <path class="mjScreen__path"></path>
            </svg>
			</TransitionPortal>
		</>
	)

}

export default TransitionWarp