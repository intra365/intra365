/**
 * Copyright (c) 2018-present, jumpto365, Inc.
 *
 * @emails jumpto365
 * @flow
 */

export type Author = {
  name: string,
  url: string,
};

export type Node = {
  excerpt: string,
  fields: {
    date?: string,
    path: string,
    redirect: string,
    slug: string,
  },
  frontmatter: {
    author?: Array<Author>,
    next?: string,
    prev?: string,
    title: string,
  },
  html: string,
  id: string,
};

export type Edge = {
  node: Node,
};

export type allMarkdownRemarkData = {
  allMarkdownRemark: {
    edges: Array<Edge>,
  },
};

export type markdownRemarkData = Node;
