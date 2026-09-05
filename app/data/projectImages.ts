import type { StaticImageData } from 'next/image';
import fc26ImageOne from '../assets/ea-sports-fc-26.jpg';
import fc26ImageTwo from '../assets/ea-sports-fc-26-2.jpg';
import fc26ImageThree from '../assets/ea-sports-fc-26-3.jpg';
import uglImageOne from '../assets/UGL-1.png';
import uglImageTwo from '../assets/UGL-2.jpg';
import uglImageThree from '../assets/UGL-3.jpg';
import uglImageFour from '../assets/UGL-4.jpg';
import uglImageFive from '../assets/UGL-5.jpg';

export const projectImageMap: Record<string, StaticImageData> = {
  'fc26-1': fc26ImageOne,
  'fc26-2': fc26ImageTwo,
  'fc26-3': fc26ImageThree,
  'ugl-1': uglImageOne,
  'ugl-2': uglImageTwo,
  'ugl-3': uglImageThree,
  'ugl-4': uglImageFour,
  'ugl-5': uglImageFive,
};
