// React / Gatsby --------------------------------------------------
import React from "react"
import { useRecoilState } from "recoil"

// Plugins ---------------------------------------------------------
import { useMediaQuery } from 'react-responsive'

// Components ------------------------------------------------------
import { Helmet } from "react-helmet"
import { Navbar } from "../navigation/Navbar"

// Store -----------------------------------------------------------
import { isNotMobileState } from "../../store/global"

// =================================================================

const Layout = ({ isHomePage, children }) => {
  const [isNotMobile, setIsNotMobile] = useRecoilState( isNotMobileState )
  const isNotMobileCallback = (matches) => setIsNotMobile( matches )

  // TODO: Run media query on first load. ========================
  useMediaQuery({ minWidth: 768 }, undefined, isNotMobileCallback )

  return (
    <div className="globalWrapper" data-is-root-path={isHomePage}>
      <Helmet title="Ember Gardens" />
      <Navbar />
      <div className="contentWrapper">{children}</div>
    </div>
  )
}

export default Layout
