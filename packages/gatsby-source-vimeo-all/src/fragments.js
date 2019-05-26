import { graphql } from 'gatsby'

export const gatsbyImageSharpFixed = graphql`
  fragment GatsbyVimeoSrcSet on Vimeo {
    quality
    type
    width
    height
    link
    created_time
    fps
    size
    md5
  }
`
