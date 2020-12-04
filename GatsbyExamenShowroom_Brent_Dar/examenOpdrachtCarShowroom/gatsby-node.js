/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const {graphql} = require("gatsby")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const path = require("path")
/*Actions is intressange omdat we voor elke artiest wel een pagina willen maken*/
/*Om een javascript promise te resolven moeten we een dot then doen. Hierdoor kunnen we de data eruit halen*/
/*We geven de errors mee aan Promise.reject*/
/*Context hierin ga je data meegeven die je wil tonen*/
exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions
  return graphql(`
  {
    wpcontent {
      autos {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  }
  `).then(result => {
    if(result.errors){
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors);
    }
    const autos = result.data.wpcontent.autos.edges;
    autos.forEach(auto => {
      const {id, slug }= auto.node;
      createPage({
        path: slug,
        component: path.resolve(`src/templates/car.js`),
        context: {
          id,
          slug
        }
      })
    })

  })
  //console.log(query, "query");
}

/*wpgrapql: voorziet geen image optimalisation voor de images die we ophalen uit wpgrapql*/
/* Aan de hand van dit stukje code worden de images vanuit WPgraphql omgezet tot images waarop Gatsby image optimization kan toepassen */
exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WPGraphql_MediaItem: {
      imageFile: { 
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}