"use strict";

exports.__esModule = true;
exports.GatsbyVimeoSrcSet = void 0;

var _gatsby = require("gatsby");

const GatsbyVimeoSrcSet = _gatsby.graphql`
  fragment GatsbyVimeoSrcSet on VimeoSrcset {
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
exports.GatsbyVimeoSrcSet = GatsbyVimeoSrcSet;