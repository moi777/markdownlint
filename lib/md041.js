// @ts-check

"use strict";

const shared = require("./shared");

module.exports = {
  "names": [ "MD041", "first-line-heading", "first-line-h1" ],
  "description": "First line in file should be a top level heading",
  "tags": [ "headings", "headers" ],
  "function": function MD041(params, onError) {
    const level = params.config.level || 1;
    const tag = "h" + level;
    const foundFrontMatterTitle =
      shared.frontMatterHasTitle(
        params.frontMatterLines,
        params.config.front_matter_title
      );
    if (!foundFrontMatterTitle) {
      params.tokens.every((token) => {
        if (token.type === "html_block") {
          return true;
        }
        if ((token.type !== "heading_open") || (token.tag !== tag)) {
          shared.addErrorContext(onError, token.lineNumber, token.line);
        }
        return false;
      });
    }
  }
};
