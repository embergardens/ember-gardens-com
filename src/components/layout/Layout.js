// React / Gatsby --------------------------------------------------
import React, { useRef } from "react"

// Plugins ---------------------------------------------------------

// Components ------------------------------------------------------
import { Helmet } from "react-helmet"
import { MainMenu } from "../navigation/MainMenu"
import { Navbar } from "../navigation/Navbar"

// Store -----------------------------------------------------------

// =================================================================

const Layout = ({ isHomePage, children }) => {
  const scrollRef = useRef()
	// const { scrollYProgress } = useElementScroll(scrollRef)
  return (
    <div className="viewport" data-is-root-path={isHomePage}>
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
