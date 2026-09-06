import type { StaticImageData } from 'next/image';
import fc26HqAction from '../assets/fc26-hq-2.jpg';
import fc26HqLogo from '../assets/fc26-hq-1.webp';
import uglLogoHq from '../assets/ugl-logo-hq.webp';
import uglImageTwo from '../assets/UGL-2.jpg';
import uglImageThree from '../assets/UGL-3.jpg';
import uglImageFour from '../assets/UGL-4.jpg';
import uglImageFive from '../assets/UGL-5.jpg';
import amanTravelsImageOne from '../assets/aman-travels-1.png';
import amanTravelsImageTwo from '../assets/aman-travels-2.webp';
import symphonyImage from '../assets/symphony.png';

export const projectImageMap: Record<string, StaticImageData> = {
  'fc26-1': fc26HqAction,
  'fc26-2': fc26HqLogo,
  'ugl-1': uglLogoHq,
  'ugl-2': uglImageTwo,
  'ugl-3': uglImageThree,
  'ugl-4': uglImageFour,
  'ugl-5': uglImageFive,
  'aman-1': amanTravelsImageOne,
  'aman-2': amanTravelsImageTwo,
  'symphony-1': symphonyImage,
};
