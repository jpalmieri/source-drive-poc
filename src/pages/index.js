import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import StackGrid from 'react-stack-grid'
import sizeMe from 'react-sizeme'

import Layout from '../components/layout'
import SEO from '../components/seo'

function responsiveColumnWidth(width) {
  if (width >= 768) {
    return '33.33%'
  } else if (width >= 414) {
    return '50%'
  } else {
    return '100%'
  }
}

function IndexPage({ data, size }) {
  return (
    <Layout>
      <SEO title="Photos" />
      <StackGrid columnWidth={responsiveColumnWidth(size.width)}>
      {data.allDriveNode.edges.map(({ node }) => {
          return (
            <div key={node.fields.slug}>
              <Link to={`posts/${node.fields.slug.split('.')[0]}/`}>
                <Image fluid={node.localFile.childImageSharp.fluid} alt={node.fields.slug} />
              </Link>
            </div>
          )
        }).reverse()}
      </StackGrid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allDriveNode {
      edges {
        node {
          fields { slug }
          localFile {
            childImageSharp {
              fluid(maxWidth: 320) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default sizeMe()(IndexPage)
