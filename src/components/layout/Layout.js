// React / Gatsby --------------------------------------------------
import React, { useEffect, useRef } from "react"
// Plugins ---------------------------------------------------------

// Components ------------------------------------------------------
import { Helmet } from "react-helmet"
import { useRecoilValue } from "recoil"
import { currentTextColorState } from "../../store/global"
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
  })

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
