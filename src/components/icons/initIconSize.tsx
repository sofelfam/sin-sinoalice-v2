import tw, { TwStyle } from "twin.macro";

/**
 * @param {string} size small / large / undefined
 * @returns {twStyle} twStyle
 */
export const initIconSize = (size?: string) : TwStyle => {
  switch(size) {
    case 'small':
      return tw`h-6 w-6`;
    case 'large':
      return tw`h-10 w-10`;
    default:
      return tw`h-8 w-8`;
  }
}