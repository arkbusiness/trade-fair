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
  getInvoiceTemplateById: (id: string) => {
    return {
      url: `/exhibitor/templates/${id}`,
      queryKey: ['exhibitor-invoice-template', id]
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
  createInvoiceTemplate: (data: {
    additionalInformation?: string;
  }): AxiosRequestConfig => {
    return {
      url: `/exhibitor/invoice-template`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
  },
  updateInvoiceTemplate: (
    id: string,
    data: {
      additionalInformation?: string;
    }
  ): AxiosRequestConfig => {
    return {
      url: `/exhibitor/templates/${id}`,
      method: 'PATCH',
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
