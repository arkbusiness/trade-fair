import { AxiosRequestConfig } from 'axios';
import { buildQueryParams } from '@/app/core/shared/utils';

export const exhibitorSettingsService = {
  getBoothMembers: (filter: Record<string, string> = {}) => {
    const queryParams = buildQueryParams({
      params: filter
    });
    return {
      url: `/exhibitor/users${queryParams ? `?${queryParams}` : ''}`,
      queryKey: ['exhibitor-booth-members', queryParams]
    };
  },
  deleteBoothMember: (id: string) => {
    return {
      url: `/exhibitor/users/${id}`,
      method: 'DELETE'
    };
  },
  addBoothMember: (data: {
    email: string;
    password: string;
  }): AxiosRequestConfig => {
    return {
      url: `/exhibitor/users`,
      method: 'POST',
      data
    };
  },

  updateBusinessInfo: (data: {
    boothName?: string;
    standNumber?: string;
    publicDescription?: string;
    websiteUrl?: string;
    country?: string | null;
    currency?: string | null;
  }): AxiosRequestConfig => {
    return {
      url: `/exhibitor/business-info`,
      method: 'PATCH',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
  },
  updateProfile: (data: {
    contactName?: string;
    contactPhone?: string;
  }): AxiosRequestConfig => {
    return {
      url: `/exhibitor/profile`,
      method: 'PATCH',
      data
    };
  },
  updatePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }): AxiosRequestConfig => {
    return {
      url: `/exhibitor/change-password`,
      method: 'PATCH',
      data
    };
  }
};
