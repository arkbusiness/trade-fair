import { AxiosRequestConfig } from 'axios';

export const exhibitorSettingsService = {
  updateBusinessInfo: (data: {
    boothName?: string;
    standNumber?: string;
    publicDescription?: string;
    websiteUrl?: string;
  }): AxiosRequestConfig => {
    return {
      url: `/exhibitor/business-info`,
      method: 'PATCH',
      data
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
