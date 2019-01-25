import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'


class Post extends React.Component {
  render() {
    const {
      fields,
      localFile
    } = this.props.data.driveNode
    return (
      <Layout>
        <SEO title="Post" />
        <Image alt={fields.slug} fluid={localFile.childImageSharp.fluid} />
      </Layout>
    )
  }
}

export const query = graphql`
  query ($slug: String!){
    driveNode(fields: { slug: { eq: $slug } }) {
      fields { slug }
      localFile {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`

export default Post
