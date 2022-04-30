// React / Gatsby --------------------------------------------------
import React, { useEffect, useRef } from "react"
// Plugins ---------------------------------------------------------

// Components ------------------------------------------------------
import { Helmet } from "react-helmet"
import { useRecoilState, useRecoilValue } from "recoil"
import { stopVideoAutoplay, updateReducedMotionLocalStorage } from "../../functions/reducedMotion"
import { currentTextColorState, reduceMotionState } from "../../store/global"
import { Gateway } from "../navigation/Gateway"
import { MainMenu } from "../navigation/MainMenu"
import { Navbar } from "../navigation/Navbar"

// Store -----------------------------------------------------------

// =================================================================

const Layout = ({ isHomePage, children }) => {

  // Set Viewport Height.
  const getViewportHeight = () => {
    document.querySelector(':root').style.setProperty('--vh', `${ window.innerHeight }px`)
  }

  useEffect(()=> {
    window.addEventListener('resize', getViewportHeight)
    getViewportHeight()
  })

  // Set Color Theme.
  const currentTextColor = useRecoilValue( currentTextColorState )

  useEffect(() => {
    document.querySelector(':root').dataset.themeColor = currentTextColor
  }, [ currentTextColor ])

  // Remove v-cloak from all elements once loaded.
  useEffect(() => {
    document.querySelectorAll('[v-cloak]').forEach((el) => el.removeAttribute('v-cloak') )
  }, [])

  const [reducedMotionStatus, setReducedMotionStatus] = useRecoilState( reduceMotionState )

  useEffect(() => {
    const motionQuery = matchMedia('(prefers-reduced-motion)')

    const reducedMotionCheck = () => {
      if ( motionQuery.matches ) {
        console.warn('[EMBER GARDENS]: Reduced Motion setting is active. Autoplay and animations have been turned off.')
        updateReducedMotionLocalStorage( true )
        setReducedMotionStatus( true )
        stopVideoAutoplay()
      } else {
        updateReducedMotionLocalStorage( false )
        setReducedMotionStatus( false )
      }
    }

    reducedMotionCheck()
    motionQuery.addEventListener('change', reducedMotionCheck)
  }, [])

  const scrollRef = useRef()
	// const { scrollYProgress } = useElementScroll(scrollRef)
  return (
    <div className="viewport" data-is-root-path={isHomePage}>
      <Gateway />
      <Helmet title="Ember Gardens" />
      <Navbar />
      <div className="viewportInner">
        <MainMenu />
        <div className='viewportMain' ref={scrollRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
