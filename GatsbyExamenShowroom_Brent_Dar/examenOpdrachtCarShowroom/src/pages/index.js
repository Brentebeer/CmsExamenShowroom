import React from "react"
import {useStaticQuery, graphql } from "gatsby"
/*Onze styled components installeren die van pagestyles komen*/
import {Wrapper, Image, Cars} from "../pageStyles/pageStyles"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  //De usestaticQuery is een hoek moet gedefineert worden in de fuctional component
  //query dit zal ervoor zorgen dat onze wpcontent met daarin onze menuItem, edges node label en als laatste path worden opgehaald
  /*We gaan de source moeten erbij invoegen om ervoor te zorgen dat we de image file kunnen toevoegen*/
  const {
    wpcontent:{
      page: {
        homeMeta: {
          homePageHeaderTitle,
          homePageSmallDescription,
          homePageFeaturedAuto,
          homePageBannerPicture,
        }
      }
    }
  } = useStaticQuery(graphql`
  query  {
    wpcontent {
    page(id: "home", idType: URI) {
      homeMeta {
        homePageBannerPicture {
          altText
          sourceUrl  
          imageFile {
            childImageSharp {
              fluid(quality: 40){
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
        homePageHeaderTitle
        homePageSmallDescription
        homePageFeaturedAuto {
          ... on WPGraphql_Auto {
            slug
            cars {
              carHosepower
              carImage {
                altText
                sourceUrl  
                  imageFile {
                    childImageSharp{
                      fluid(quality: 30, grayscale: true){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              carManufacturer
              carPrice
              carsName
              description
            }
          }
        }
      }
    }
  }
}
  `)
  console.log(homePageFeaturedAuto, "index"); /*Om de homeMeta te laten zien*/
  return (
    <Layout>
    <SEO title="Home" />
      <Wrapper>
        <div className="banner">
          <Image fluid={homePageBannerPicture.imageFile.childImageSharp.fluid} alt={homePageBannerPicture.altText} />
          <div className="inner-div">
            <p className="header-title">{homePageHeaderTitle}</p>
            <p className="header-description">{homePageSmallDescription}</p>
          </div>
        </div>
        <div className="Carss">
          <h2>Some of are most special cars</h2>
          <div className="Cars-items">
          {homePageFeaturedAuto.map(({cars, slug}) => (
            <Cars to={`/${slug}`} key={slug}>
              <Image fluid={cars.carImage.imageFile.childImageSharp.fluid} alt={cars.carImage.imageFile.altText} />
              <div className="Cars-info">
                <p>{cars.carsName}</p>
                <p>{cars.carManufacturer}</p>
              </div>
            </Cars>
          ))}
          </div>
        </div>
      </Wrapper>
  </Layout>
  )
}

export default IndexPage
