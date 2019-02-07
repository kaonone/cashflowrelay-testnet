import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({

  }),

  title: rule({
    padding: '0 0.25rem 0.75rem',
    borderBottom: `solid 1px ${theme.colors.tundora}`,
  }),

  content: rule({
    paddingLeft: '0.25rem',
  }),

  permission: rule({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),

  permissionTitle: rule({
    marginRight: 'auto',
  }),

  isHidden: rule({
    visibility: 'hidden',
  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
