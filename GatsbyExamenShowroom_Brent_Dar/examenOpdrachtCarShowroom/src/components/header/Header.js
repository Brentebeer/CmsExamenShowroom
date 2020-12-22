import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import {HeaderWrapper, Image} from './headerStyles/headerStyles' // deze import lijd ons naar headerSTyles met die headerWrapper gebruiken we voor onze header
/*Hier word de menu geimporteerd*/
import Menu from './Menu'

/*We moeten ervoor zorgen dat onze menu items vanuit onze graphql api worden weergegeven = Home productOverzicht*/
const Header = ({ siteTitle }) => { // we gebruiken deze queries omdat we usestaticQuery gebruiken 
  //De usestaticQuery is een hoek moet gedefineert worden in de fuctional component
  //query dit zal ervoor zorgen dat onze wpcontent met daarin onze menuItem, edges node label en als laatste path worden opgehaald

  /*Fixed image: is waar ik een vast with of height meegeeft*/
  /*Webp formaat: Beste optie op vlak van formaten op webdesing*/
  const {
    logo,
    wpcontent: {
      menuItems
  },} = useStaticQuery(graphql` 
  query {
    logo: file(relativePath: {eq: "logo.png"}) {
      childImageSharp{
        fixed(quality: 40, width: 110) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    wpcontent {
      menuItems {
        edges {
          node {
            label
            path
          }
        }
      }
    }
  }`)   

  //console.log(menuItems, 'menu items') // om te kijken of we onze data wel ophalen
  /*menuItems is een prop die we gelijk zetten aan menuItems.edges*/
  /*<Link to="/"></Link> = word gebruikt als je op het logo drukt dat het naar de homepage gaat*/
  /*inplaats van een source attribuut gebruikt gatsby een fixed waar we het logo aan megeven*/
  return <HeaderWrapper>
    <Link to="/">
      <Image alt="logo artist agency" fixed={logo.childImageSharp.fixed} />
    </Link>
    <Menu menuItems={menuItems.edges}  />
  </HeaderWrapper>
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
