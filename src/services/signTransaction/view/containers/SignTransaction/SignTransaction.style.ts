import { withStyles, Theme, WithStyles } from 'shared/styles';

import { rule } from 'shared/helpers/style';

const styles = ({ extra: theme }: Theme) => ({
  root: rule({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 1rem 2.5rem',

    [theme.breakpoints.up('sm')]: rule({
      padding: '3.625rem 1rem 4.625rem',
    }),
  }),

  title: rule({
    marginBottom: '0.9375rem',
    fontSize: '1.25rem',
    fontFamily: theme.typography.primaryFont,
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    textAlign: 'center',

    [theme.breakpoints.up('sm')]: rule({
      fontSize: '1.5rem',
    }),
  }),

  description: rule({
    fontSize: '0.875rem',
    fontFamily: theme.typography.primaryFont,
    color: theme.palette.text.primary,
    textAlign: 'center',
    padding: '0 1rem',

    [theme.breakpoints.up('sm')]: rule({
      padding: '0 11rem',
      fontSize: '0.9375rem',
    }),
  }),

  scanQrCode: rule({
    width: '80%',
    position: 'relative',
    marginBottom: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),

  phone: rule({
    width: '160%',
    maxWidth: 500,
    minWidth: 300,
  }),

  qrCode: rule({
    top: '66%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  }),

  qrCodeImage: rule({
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
    width: '44%',
  }),

  buttons: rule({
    width: '100%',
    maxWidth: '20.5rem',
    marginBottom: '0.625rem',
  }),

  button: rule({
    marginBottom: '1rem',
  }),

  linksToMarket: rule({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 3.125rem',
  }),

  link: rule({
    flexGrow: 1,
    maxWidth: '10rem',

    '&:first-child': {
      marginRight: '0.3125rem',
    },
    '&:last-child': {
      marginLeft: '0.3125rem',
    },
  }),

  image: rule({
    width: '100%',
  }),

});

export const provideStyles = withStyles(styles);

export type StylesProps = WithStyles<typeof styles>;
