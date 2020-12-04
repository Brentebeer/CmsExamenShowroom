import React from 'react'
import {useStaticQuery, graphql, Link} from 'gatsby'
import {OverlayWrapper, Image, CloseButton, MenuList} from './headerStyles/headerStyles'

const OverlayMenu = ({handleOverlayMenu, menuOpen}) => {
    const {
        logo,
        wpcontent: {
          menuItems
      },} = useStaticQuery(graphql` 
      query {
        logo: file(relativePath: {eq: "logo.png"}) {
          childImageSharp{
            fixed(quality: 50, width: 110) {
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
      }
      `)
      /*MenuOpen alleen wanneer je de menu open klikt wil je de inhoud weergeven*/    
    return (
        <>
            {menuOpen && (
                <OverlayWrapper>
                    <CloseButton onClick={handleOverlayMenu}>X</CloseButton>
                    <Link to="/" style={{marginBottom: "1.5rem"}}>
                        <Image alt="logo car showroom" fixed={logo.childImageSharp.fixed} />
                    </Link>
                    <MenuList style={{flexDirection: "column"}}>
                        {menuItems.edges.map(({node: item}, i) => (
                            <li key={i}>
                                <Link activeClassName="nav-active" to={item.path}> 
                                {item.label}
                                </Link>
                            </li>
                        ))}

                    </MenuList>
                </OverlayWrapper>
            )}
        </>
    )
}

export default OverlayMenu