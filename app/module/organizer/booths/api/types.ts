export interface IBooth {
  id: string;
  number: string;
  status: string;
  assigned: boolean;
  assignedAt?: string;
  categoryName: string;
  categoryId: string;
  category: {
    name: string;
    id: string;
  };
  organizerId: string;
  logoUrl?: string | null;
  exhibitorName?: string | null;
  exhibitorEmail?: string | null;
  exhibitorId?: string | null;
  productsCount: number;
  createdAt?: string;
}
