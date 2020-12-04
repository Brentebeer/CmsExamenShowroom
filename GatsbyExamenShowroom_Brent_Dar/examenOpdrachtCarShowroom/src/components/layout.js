/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, {useState} from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header/Header"
import Hamburger from './header/Hamburger'
import OverlayMenu from './header/OverlayMenu'
import "./layout.css"
/*We gaan onze state defineeren*/
/*handleOverlayMenu doet het omgekeerde van menuOpen dus als menuopen true is word handleOverlayMenu false*/
const Layout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOverlayMenu = () => setMenuOpen(!menuOpen)

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
    /*<Hamburger handleOverlayMenu={handleOverlayMenu} = word gebruikt om te bepalen of het hamburger menu open of toe moet*/
  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Hamburger handleOverlayMenu={handleOverlayMenu}/>
      <OverlayMenu handleOverlayMenu={handleOverlayMenu} menuOpen={menuOpen} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 'auto',
          padding: 0,
        }}
      >
        <main>{children}</main>
        {/*<footer style={{
          marginTop: `2rem`
        }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>*/}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
