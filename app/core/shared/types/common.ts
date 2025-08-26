import { SVGProps } from 'react';

export interface IQueryParams {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  params: Promise<any>;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  searchParams: Promise<any>;
}

export interface IPaginatedMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface IPaginatedResponse<T> extends IPaginatedMeta {
  data: T[];
  items: T[];
}

export interface CustomIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export enum StatusStyleEnum {
  SUCCESS = 'success',
  WARNING = 'warning',
  WARNING_2 = 'warning_2',
  INFO = 'info',
  DANGER = 'danger',
  DEFAULT = 'default'
}

export enum UserGroup {
  ORGANIZER,
  EXHIBITOR
}

export enum OrganizerSettingsPage {
  PROFILE = 'profile',
  CHANGE_PASSWORD = 'change-password',
  EVENT = 'event'
}

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc'
}
