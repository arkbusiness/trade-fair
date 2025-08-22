import { ARK_META } from '../constants';

export const createMetaTitle = (title: string) => {
  return `${title} | ${ARK_META.title}`;
};
