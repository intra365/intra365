/**
 * Copyright (c) 2018-present, jumpto365, Inc.
 *
 * @emails jumpto365
 * @flow
 */

import {Link} from 'gatsby';
import React from 'react';
import {colors} from 'theme';

import type {Node} from 'react';

type Props = {
  children: Node,
  target?: string,
  to: string,
};

const FooterLink = ({children, target, to}: Props) => (
  <Link
    css={{
      lineHeight: 2,
      ':hover': {
        color: colors.brand,
      },
    }}
    to={to}
    target={target}>
    {children}
  </Link>
);

export default FooterLink;
