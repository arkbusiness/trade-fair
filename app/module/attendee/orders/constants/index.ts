export const attendeeOrderQueryKeys = {
  all: (filter: Record<string, string>) => ['attendee-orders', filter],
  byId: (id: string) => ['attendee-order', id]
};
