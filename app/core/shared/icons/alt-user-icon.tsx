import { CustomIconProps } from '../types';

export const AltUserIcon = ({ size = 16, ...rest }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="inherit"
    strokeWidth={1}
    {...rest}
  >
    <circle cx="8.00001" cy="5.33317" r="2.66667" fill="inherit" />
    <path d="M3.5586 11.5469C3.99932 9.68441 5.84783 8.6665 7.76173 8.6665H8.23829C10.1522 8.6665 12.0007 9.68441 12.4414 11.5469C12.5267 11.9073 12.5945 12.2844 12.6326 12.6676C12.6691 13.034 12.3682 13.3332 12 13.3332H4.00001C3.63182 13.3332 3.33096 13.034 3.36741 12.6676C3.40555 12.2844 3.47332 11.9073 3.5586 11.5469Z" fill="inherit" />
  </svg>
);
