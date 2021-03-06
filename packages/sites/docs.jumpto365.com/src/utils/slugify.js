/**
 * Copyright (c) 2018-present, jumpto365, Inc.
 *
 * @emails jumpto365
 * @flow
 */

import slugify from 'slugify';

export default (string: string, directory?: string): string => {
  const filename = slugify(string) + '.html';

  return directory ? `/${directory}/${filename}` : filename;
};
