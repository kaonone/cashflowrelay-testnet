import { withStyles, Theme, WithStyles } from 'shared/styles';
import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({

  }),

  title: rule({

  }),

  content: rule({

  }),

  permission: rule({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),

  permissionTitle: rule({

  }),
});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
