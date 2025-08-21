import { CustomIconProps } from '../types';

export const TimeIcon = ({ size = 16, ...rest }: CustomIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <rect width={24} height={24} rx={4} fill="#08AE53" />
    <path
      d="M12 5.25C15.7279 5.25 18.75 8.27208 18.75 12C18.75 15.7279 15.7279 18.75 12 18.75C8.27208 18.75 5.25 15.7279 5.25 12C5.25 8.27208 8.27208 5.25 12 5.25ZM12 7.125C11.5858 7.125 11.25 7.46079 11.25 7.875V11.8125C11.25 12.3303 11.6697 12.75 12.1875 12.75H14.625C15.0392 12.75 15.375 12.4142 15.375 12C15.375 11.5858 15.0392 11.25 14.625 11.25H12.75V7.875C12.75 7.46079 12.4142 7.125 12 7.125Z"
      fill="white"
    />
  </svg>
);
