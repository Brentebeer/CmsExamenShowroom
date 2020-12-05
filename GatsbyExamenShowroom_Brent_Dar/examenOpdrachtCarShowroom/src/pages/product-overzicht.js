import React from 'react'
import {useStaticQuery, graphql} from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import {
    Wrapper,
    Image,
    Cars
} from "../pageStyles/pageStyles"
import {COLORS} from "../constants"

const CarPage = () => {
    const {wpcontent: {
        page:{ AutoPageMeta: {  carDescription, carProductImage},
    },
        autos: {edges: cars}
    }} = useStaticQuery(graphql`
    query {
        wpcontent{
          page(id: "product-overzicht", idType: URI) {
            AutoPageMeta {
                carDescription
                carProductImage {
                    sourceUrl  
                        imageFile {
                            childImageSharp {
                                fluid(quality: 45){
                                ...GatsbyImageSharpFluid_withWebp
                            }
                        }
                    }
                altText
                }
            }
        }
        autos {
            edges {
              node {
                cars {
                  carHosepower
                  carManufacturer
                  carPrice
                  carsName
                  description
                  carImage {
                    altText
                    sourceUrl  
                      imageFile {
                        childImageSharp{
                          fluid(quality: 45, grayscale: true){
                            ...GatsbyImageSharpFluid_withWebp
                          }
                        }
                      }
                    }
                    }
                        slug
                }
            }
          }
        }
    }
    `)
    //console.log(data, "data");
    return (
        <Layout>
            <SEO title="Cars" />
            <Wrapper CarssColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY}>
                <div className="banner">
                    <Image fluid={carProductImage.imageFile.childImageSharp.fluid} alt={carProductImage.altText}/>

                </div>
                <div className="description">
                    <h2>Welcome to are selection at Brent ' s showroom</h2>
                    <p>{carDescription}</p>
                </div>
                <div className="Carss">
                    <h2>Our Cars</h2>
                    <div className="Cars-items">
                        {cars.map(({node: {cars, slug}}) => (
                            <Cars to={`/${slug}`} key={slug}>
                                <Image fluid={cars.carImage.imageFile.childImageSharp.fluid} alt={cars.carImage.imageFile.altText} />
                                <div className="Cars-info">
                                    <p>{cars.carsName}</p>
                                    {cars.carManufacturer && <p>{cars.carManufacturer}</p>}
                                    
                                </div>
                            </Cars>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </Layout>
        
    )
}

export default CarPage