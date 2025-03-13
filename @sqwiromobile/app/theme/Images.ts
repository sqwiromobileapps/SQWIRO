// leave off @2x/@3x
import Images from '@expocraft/core/lib/theme/Images';

import sample from 'lodash/sample';
import logoicon from '../assets/images/logoicon.png';
import darklogoicon from '../assets/images/darklogoicon.png';
import whitelogoicon from '../assets/images/whitelogoicon.png';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Home Screen Images
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import homescreen1 from '../assets/images/home/homescreen1.png';
import homescreen2 from '../assets/images/home/homescreen2.png';
import homescreen3 from '../assets/images/home/homescreen3.png';
import homescreen4 from '../assets/images/home/homescreen4.png';
import homescreen5 from '../assets/images/home/homescreen5.png';

import Splash from '../assets/images/splash.png';
import blankSplash from '../assets/images/splashblank.jpg';

import LicensePlaceholder from '../assets/images/examples/license.png';

const backgroundscreens = [
  homescreen1,
  homescreen2,
  homescreen3,
  homescreen4,
  homescreen5,
];

const images = {
  logo: logoicon,
  logoicon: logoicon,
  darklogoicon: darklogoicon,
  whitelogoicon: whitelogoicon,
  Background: sample(backgroundscreens),

  // App images
  ...Images,

  // Examples & Placeholders

  LicensePlaceholder,

  Splash,
  blankSplash,

  // icons
};

export default images;
