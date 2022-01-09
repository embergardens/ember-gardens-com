import React, { useEffect } from 'react'
import TransitionLink, { TransitionPortal } from 'gatsby-plugin-transition-link'
import gsap from 'gsap'

import { useRecoilState} from 'recoil'
import { navOpenState } from '../../store/navigation'

const TransitionAnime = ( options ) => {
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

	const horizontal = ({ node, props: { length: seconds }, direction }) => {
		const directionTo = direction === 'left' ? '-100%' : '100%'
		const directionFrom = direction === 'left' ? '100%' : '-100%'

		const wait = seconds / 6
		const half = (seconds - wait) / 2

		const cover = getCoverEl()

		return gsap
			.timeline()
			.set(cover, { y: 0, x: directionFrom, display: "block", opacity: 0 })
			.to(cover, {
				x: "0%",
				ease: "power1.easeInOut",
				duration: half,
				opacity: 1,
				onComplete: navOpen ? setNavOpen( false ) : ''
			})
			.set(node, { opacity: 0 })
			.to(
				cover,
				{
					x: directionTo,
					ease: "power1.easeInOut",
					duration: half,
					opacity: 0
				},
				`+=${wait}`,
			)
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
				onComplete: navOpen ? setNavOpen( false ) : ''
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
					trigger: ({ exit, node }) =>
						moveInDirection({
							props: exit,
							node,
							direction,
						}),
				}}
				entry={{
					delay: length / 2,
				}}
				{...props}
			>
				{props.children}
			</TransitionLink>

			<TransitionPortal>
				<div
					className="tl-cover-el"
					style={{
						position: "fixed",
						background: props.bg || "#4b2571",
						top: 0,
						left: 0,
						right: 0,
						zIndex: 1000,
						width: "100vw",
						height: "100vh",
						transform: "translateY(100%)",
					}}
				/>
			</TransitionPortal>
		</>
	)

}

export default TransitionAnime