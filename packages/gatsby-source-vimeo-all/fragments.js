"use strict";

exports.__esModule = true;
exports.gatsbyImageSharpFixed = void 0;

var _gatsby = require("gatsby");

const gatsbyImageSharpFixed = _gatsby.graphql`
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
`;
exports.gatsbyImageSharpFixed = gatsbyImageSharpFixed;