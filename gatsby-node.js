const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  return graphql(`
    {
      allDriveNode {
        edges {
          node {
            fields { slug }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    const { createPage } = actions
    const postTemplate = path.resolve(`src/templates/Post.jsx`)
    result.data.allDriveNode.edges.forEach(edge => {
      const {
        localFile,
        fields
      } = edge.node
      createPage({
        // Path for this page — required
        path: `posts/${fields.slug}/`,
        component: postTemplate,
        context: {
          slug: fields.slug
        },
      })
    })
  })
}
