export interface IExhibitorBoothMembers {
  id: string;
  username?: string;
  email: string;
  isPrimary: boolean;
  status: string;
  lastLogin: string;
  createdAt: string;
}

export interface InvoiceTemplate {
  id: string;
  exhibitorId: string;
  htmlTemplate: string | null;
  createdAt: string;
  additionalInformation: string;
}
