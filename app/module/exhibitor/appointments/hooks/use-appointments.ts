export interface IAppointment {
  id: string;
  startTime: string;
  endTime: string;
}

export const useAppointments = () => {
  return {
    appointments: []
  };
};
