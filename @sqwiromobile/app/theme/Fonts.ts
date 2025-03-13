import Colors from './Colors';
import Sizes from './Sizes';

const Fonts = ({
  fontFamily = 'clanpro',
  colors = Colors,
  sizes = Sizes,
}: {
  fontFamily?: string;
  colors?: typeof Colors;
  sizes?: typeof Sizes;
}) => ({
  h1: {
    fontFamily: 'clanpro-book',
    fontSize: sizes.h1,
    lineHeight: sizes.h1 * 1.2,
  },
  h2: {
    fontFamily: 'clanpro-book',
    fontSize: sizes.h2,
    lineHeight: sizes.h2 * 1.2,
  },
  h3: {
    fontFamily: 'clanpro-book',
    fontSize: sizes.h3,
    lineHeight: sizes.h3 * 1.2,
  },
  h4: {
    fontFamily: 'clanpro-book',
    fontSize: sizes.h4,
    lineHeight: sizes.h4 * 1.2,
  },
  h5: {
    fontFamily: 'clanpro-book',
    fontSize: sizes.h5,
    lineHeight: sizes.h5 * 1.2,
  },
  h6: {
    fontFamily: 'clanpro-book',
    fontSize: sizes.h6,
    lineHeight: sizes.h6 * 1.2,
  },

  header: {
    fontFamily: 'clanpro-bold',
    fontSize: sizes.header,
    lineHeight: sizes.header * 1.2,

    letterSpacing: 0.5,
    color: colors.black,
  },
  subHeader: {
    fontFamily: 'clanpro-thin',
    fontSize: sizes.subHeader,
    lineHeight: sizes.subHeader * 1.2,

    letterSpacing: 0.5,
    color: colors.black,
  },

  title: {
    fontFamily: 'clanpro-book',
    fontSize: sizes.title,
    lineHeight: sizes.title * 1.2,

    letterSpacing: 0.5,
    color: colors.black,
  },

  subTitle: {
    fontFamily: 'clanpro-thin',
    fontSize: sizes.subTitle,
    lineHeight: sizes.subTitle * 1.2,

    letterSpacing: 0.5,
    color: colors.black,
  },

  semibold: {
    fontFamily: 'clanpro-bold',
    fontWeight: '100',
  },

  bold: {
    fontFamily: 'clanpro-bold',
  },

  light: {
    fontFamily: 'clanpro-thin',
  },

  normal: {
    fontFamily: 'clanpro-book',
  },

  default: {
    fontFamily: 'clanpro-book',
    fontSize: sizes.body,
    lineHeight: sizes.body * 1.2,

    color: colors.dark,
    fontWeight: '400',
  },

  body: {
    // lineHeig,
  },

  caption: {
    fontSize: sizes.caption,
    lineHeight: sizes.caption * 1.2,
  },
  small: {
    fontSize: sizes.small,
    lineHeight: sizes.small * 1.2,

    color: colors.darkGray,
  },
  button: {
    fontSize: sizes.button,
    lineHeight: sizes.button * 1.2,

    color: colors.white,
  },
});

export default Fonts;
