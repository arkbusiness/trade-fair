import { CustomIconProps } from '../types';

export const BoothIcon = ({ size = 16, ...rest }: CustomIconProps) => (
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
    <path d="M1.16359 1.32225C0.600327 1.63631 0.0363159 2.23661 0.0363159 2.23661H11.9636C11.9636 2.23661 11.3358 1.63016 10.6909 1.32225C8.06352 0.0678222 3.58265 -0.0265896 1.16359 1.32225Z" fill="inherit" />
    <rect x="1.01816" y="2.23682" width="0.363636" height="5.81818" fill="inherit" />
    <rect x="10.5454" y="2.23682" width="0.363636" height="5.81818" fill="inherit" />
    <circle cx="5.96361" cy="4.30935" r="1.27273" fill="inherit" />
    <ellipse cx="5.96361" cy="7.87299" rx="2.36364" ry="2.14545" fill="inherit" />
    <rect x="0.654541" y="8.05469" width="10.6182" height="5.52727" rx="0.145455" fill="inherit" />
  </svg>
);
