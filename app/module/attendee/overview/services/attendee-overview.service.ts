export const attendeeOverviewService = {
  getMetrics: () => {
    return {
      url: '/attendee/dashboard',
      queryKey: ['attendee-overview', 'metrics']
    };
  }
};
