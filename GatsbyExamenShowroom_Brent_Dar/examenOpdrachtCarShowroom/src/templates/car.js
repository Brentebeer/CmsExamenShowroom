import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import {Wrapper, Image} from './templateStyles/carStyles'

/*Data via props binnen krijgen*/

const CarTemplate = ({data: {wpcontent: {auto: {cars, types: {edges: types}}}}}) => {
    //console.log(data, 'data')
    return(
        <Layout>
          <SEO title="Car" />
          <Wrapper>
            <div className="artist-container">
              <div className="artist-image">
              <Image fluid={cars.carImage.imageFile.childImageSharp.fluid} alt={cars.carImage.imageFile.altText} />
              <div className="types">
                  {types.map(({node: type}) => (
                    <div key={type.name} className="type"> 
                        {type.name}
                    </div>
                  ))}
              </div>
              
              </div>
              <div className="artist-info">
                  <h2>{cars.carsName}</h2>
                  {cars.carManufacturer ? (<h3><span>{cars.carManufacturer} - </span><span>€ {cars.carPrice}</span></h3>
                  ) : (<h3>€ {cars.carPrice}</h3>)}
                  <p className="description">
                      {cars.description}
                    </p>
                    <p className="info">
                      <strong>Price: </strong> {cars.carPrice}
                    </p>
                    <p className="info">
                      <strong>HorsePower: </strong> {cars.carHosepower}
                    </p>
              </div>
                    
            </div>
          </Wrapper>
        </Layout>
    )
}

export default CarTemplate

export const pageQuery = graphql`
query ($id: ID!) {
    wpcontent {
      auto(id: $id, idType: ID) {
        types {
          edges {
            node {
              name
            }
          }
        }
        cars {
          carHosepower
          carManufacturer
          carPrice
          carsName
          description
          carImage {
            sourceUrl  
            imageFile {
                childImageSharp {
                    fluid(quality: 50){
                    ...GatsbyImageSharpFluid_withWebp
                }
            }
        }
            altText
          }
        }
      }
    }
  }
`