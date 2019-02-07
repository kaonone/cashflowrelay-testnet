import { withStyles, WithStyles } from 'shared/styles';

import { rule } from 'shared/helpers/style';

const styles = () => ({
  root: rule({
  }),

  head: rule({
    display: 'flex',
    alignItems: 'center',
  }),

  links: rule({
    backgroundColor: 'transparent',
    marginRight: 'auto',
  }),

  link: rule({
    fontSize: '1rem',
  }),

  tokens: rule({

  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
