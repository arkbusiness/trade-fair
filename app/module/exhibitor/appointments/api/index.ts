// Query hooks
export {
  useAppointmentSlots,
  appointmentSlotsQueryKeys,
  SlotStatus,
  APPOINTMENT_LIMIT,
  type IAppointmentSlot
} from './get-appointment-slots';

export {
  useAppointmentsStats,
  appointmentStatsQueryKeys,
  type AppointmentStats
} from './get-appointment-stats';

export {
  useAppointmentEvent,
  appointmentEventQueryKeys,
  type IAppointmentEvent
} from './get-appointment-event';

// Mutation hooks
export {
  useCancelAppointmentSlot,
  type CancelAppointmentSlotPayload,
  type CancelAppointmentSlotResponse
} from './cancel-appointment-slot';

export {
  useCompleteAppointmentSlot,
  type CompleteAppointmentSlotPayload,
  type CompleteAppointmentSlotResponse
} from './complete-appointment-slot';

export {
  useDeleteAppointmentSlot,
  type DeleteAppointmentSlotPayload,
  type DeleteAppointmentSlotResponse
} from './delete-appointment-slot';

export {
  useCreateAppointmentSlots,
  type CreateAppointmentSlotsPayload,
  type CreateAppointmentSlotsResponse,
  type AppointmentSlotInput
} from './create-appointment-slots';

export {
  useUpdateAppointmentSlot,
  type UpdateAppointmentSlotPayload,
  type UpdateAppointmentSlotResponse
} from './update-appointment-slot';
