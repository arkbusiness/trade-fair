export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type ChangePasswordResponse = {
  message: string;
};

export type UpdateEventPayload = {
  eventName: string;
  venueName: string;
  eventStartDate: string;
  eventEndDate: string;
  file?: File | null;
};

export type UpdateEventResponse = {
  message: string;
};

export type UpdateProfilePayload = {
  contactName: string;
  contactPhone: string;
  companyName: string;
  country: string;
  officialEmail: string;
  file?: File | null;
};

export type UpdateProfileResponse = {
  message: string;
};
