export interface IOrganizerMetrics {
  engagement: {
    loggedInAttendees: number;
    invitedAttendees: number;
    loggedInExhibitors: number;
    invitedExhibitors: number;
    exhibitorCompletionRate: number;
  };
  counts: {
    registeredExhibitors: number;
    invitedExhibitors: number;
    registeredAttendees: number;
    invitedAttendees: number;
    totalOrders: number;
    ordersCompleted: number;
    cancelledAppointments: number;
    successfulAppointments: number;
    allAppointments: number;
    diffs: {
      orders: number;
      ordersCompleted: number;
      invitedExhibitors: number;
      invitedAttendees: number;
      allAppointments: number;
      successfulAppointments: number;
      cancelledAppointments: number;
    };
  };
  charts: {
    dailyOrderAmounts: {
      Sun: number;
      Mon: number;
      Tue: number;
      Wed: number;
      Thu: number;
      Fri: number;
      Sat: number;
    };
  };
}
