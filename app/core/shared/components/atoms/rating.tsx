'use client';

import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

interface StarRatingProps {
  value: number;
}

export const StarRating = ({ value }: StarRatingProps) => {
  return (
    <Rating
      style={{ width: 100 }}
      spaceBetween="none"
      value={Math.floor(value)}
      readOnly
    />
  );
};
