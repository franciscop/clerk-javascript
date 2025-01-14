import React from 'react';

import { PrimitiveProps } from '../styledSystem';
import { Box, BoxProps } from './Box';

export type TbodyProps = PrimitiveProps<'tbody'> & Omit<BoxProps, 'as'>;

export const Tbody = React.forwardRef<HTMLTableSectionElement, TbodyProps>((props, ref) => {
  return (
    <Box
      as='tbody'
      {...props}
      ref={ref}
    />
  );
});
