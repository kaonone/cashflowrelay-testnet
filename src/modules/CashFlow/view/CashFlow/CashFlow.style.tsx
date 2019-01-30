import { withStyles, WithStyles } from 'shared/styles';

import { rule } from 'shared/helpers/style';

const styles = () => ({
  root: rule({
  }),

  links: rule({
    backgroundColor: 'transparent',
  }),

  link: rule({
    fontSize: '1rem',
  }),

  tokens: rule({

  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
