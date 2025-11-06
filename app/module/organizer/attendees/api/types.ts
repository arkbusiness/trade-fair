export interface IAttendee {
  id: string;
  email: string;
  inviteCode: string;
  used: boolean;
  status: string;
  expiresAt: string;
  address: string | null;
  createdAt: string;
  updatedAt: string;
  logoUrl: string;
  phone: string;
  contactName: string;
  interests: string[];
  registeredAt: string;
  username: string;
  inviteLink: string;
  chatUnlocked: boolean;
  registrationTimeLine: {
    registered: string;
    invited: string;
  };
}
