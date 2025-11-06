export interface IExhibitor {
  id: string;
  email: string;
  boothNumber: string;
  totalPossibleExhibitorMembers: number;
  boothMembers: number;
  used: boolean;
  status: string;
  token: string;
  logo: string | null;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  publicDescription: string | null;
  registrationTimeLine: {
    invited: string | null;
    registered: string | null;
  };
  boothMembersList: {
    id: string;
    createdAt: string;
    email: string;
    username: string;
    isPrimary: boolean;
  }[];
  exhibitorName: string | null;
  exhibitorEmail: string | null;
  exhibitorCompanyName: string | null;
  registeredAt: string | null;
  website: string | null;
  inviteLink: string;
}
