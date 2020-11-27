import React from 'react'
import {Link} from "gatsby" /*word gebruikt om navigatie toetevoegen*/
import {MenuList} from './headerStyles/headerStyles'/*Is een styled component van HeaderStyles*/
 
const Menu = ({menuItems}) => {
    //console.log(menuItems, "menu items"); /*Zodat we kunnen zien of we onze menu items terug krijgen */
    /*Voor elk object hebben we een node waar onze data in zit. We veranderen node naar item*/
    /*I is mijn index dit omdat ik anders een error krijgt omdat ik over mijn menu items loop*/

    /*activeClassname voegt bepaalde styling toe dit zal zorgen dan li element een andere style krijgt zodat de gebruiker weet op welke pagina hij zich bevind
    De to zal bepalen naar waar die link zal leiden daarom steken we item.path erin wegens dat het de link is naar waar het moet door verwijzen
    De label is natuurlijk de naam zoals Home*/

    return (
        <MenuList>
            {menuItems.map(({node: item}, i) => (
                <li key={i}>
                    <Link activeClassName="nav-active" to={item.path}>
                        {item.label}
                    </Link>    
                </li>
            ))}
        </MenuList>
    )
}

export default Menu