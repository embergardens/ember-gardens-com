// React / Gatsby --------------------------------------------------
import React, { useRef } from "react"

// Plugins ---------------------------------------------------------

// Components ------------------------------------------------------
import { Helmet } from "react-helmet"
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
      {/* MegaMenu */}
      <div className="viewportInner">
        <div className='viewportMain' ref={scrollRef}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout