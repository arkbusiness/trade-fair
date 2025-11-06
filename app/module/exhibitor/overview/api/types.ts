import { InventoryStatus } from '../../inventory/api/types';

export interface IExhibitorLatestOrder {
  id: string;
  attendeeId: string;
  exhibitorId: string;
  trackingId: string;
  payment_slip: string | null;
  attendee: {
    contactName: string;
  };
  items: {
    product: {
      name: string;
    };
  }[];
  payment_slip_uploaded_at: string | null;
  payment_method: string | null;
  invoice_url: string | null;
  status: InventoryStatus;
  updatedAt: string | null;
  currency: string;
  createdAt: string;
}

export interface IExhibitorAppointment {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  waitlistPosition: string | null;
  attendee: { id: string; email: string };
}

export interface IExhibitorMetrics {
  counts: {
    products: number;
    appointments: number;
    invoices: number;
  };
  latestOrders: IExhibitorLatestOrder[];
  appointments: IExhibitorAppointment[];
  chartData: {
    Sun: number;
    Mon: number;
    Tue: number;
    Wed: number;
    Thu: number;
    Fri: number;
    Sat: number;
  };
  orderComparison: {
    today: number;
    yesterday: number;
    difference: number;
    message: string;
  };
}
