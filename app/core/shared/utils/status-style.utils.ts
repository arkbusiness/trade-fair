import { StatusStyleEnum } from '../types';

export const getStatusStyle = (status: string) => {
  switch (status) {
    case StatusStyleEnum.SUCCESS:
      return {
        bg: 'bg-green-100/50',
        text: 'text-green-600',
        iconBG: 'bg-green-600',
        border: 'border-green-600 border-1'
      };
    case StatusStyleEnum.WARNING:
      return {
        bg: 'bg-light-yellow/70',
        text: 'text-golden-yellow',
        iconBG: 'bg-golden-yellow',
        border: 'border-golden-yellow border-1'
      };
    case StatusStyleEnum.WARNING_2:
      return {
        bg: 'bg-golden-yellow/30',
        text: 'text-foreground',
        iconBG: 'bg-foreground',
        border: 'border-foreground border-1'
      };
    case StatusStyleEnum.INFO:
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
        iconBG: 'bg-blue-600',
        border: 'border-blue-600 border-1'
      };
    case StatusStyleEnum.DANGER:
      return {
        bg: 'bg-red-100',
        text: 'text-red-600',
        iconBG: 'bg-red-600',
        border: 'border-red-600 border-1'
      };
    case StatusStyleEnum.DEFAULT:
      return {
        bg: 'bg-gray-200',
        text: 'text-gray-800',
        iconBG: 'bg-gray-800',
        border: 'border-gray-800 border-1'
      };
    default:
      return {
        bg: 'bg-gray-200',
        text: 'text-gray-800',
        iconBG: 'bg-gray-800',
        border: 'border-gray-800 border-1'
      };
  }
};
