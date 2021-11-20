// React / Gatsby --------------------------------------------------
import React from "react"

// Plugins ---------------------------------------------------------

// Components ------------------------------------------------------
import { Helmet } from "react-helmet"
import { Navbar } from "../navigation/Navbar"

// Store -----------------------------------------------------------

// =================================================================

const Layout = ({ isHomePage, children }) => {

  return (
    <div className="globalWrapper" data-is-root-path={isHomePage}>
      <Helmet title="Ember Gardens" />
      <Navbar />
      <div className="contentWrapper">{children}</div>
    </div>
  )
}

export default Layout
