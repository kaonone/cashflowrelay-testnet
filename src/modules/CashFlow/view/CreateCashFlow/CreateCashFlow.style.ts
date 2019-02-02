import { withStyles, WithStyles } from 'shared/styles';

import { rule } from 'shared/helpers/style';

const styles = () => ({
  root: rule({
    borderRadius: '0.25rem',
    boxShadow: '0 2px 4px 0 rgba(184, 184, 184, 0.5)',
    backgroundColor: 'white',
    padding: '20px',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
