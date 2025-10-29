import { create } from 'zustand';

interface IAttendeeOnboardingState {
  email: string;
  inviteCode: string;
  handleSaveOTPInput({
    email,
    inviteCode
  }: {
    email: string;
    inviteCode: string;
  }): void;
  handleClearOTPInput(): void;
}

const INITIAL_STATE = {
  email: '',
  inviteCode: ''
};

export const useAttendeeOnboardingStore = create<IAttendeeOnboardingState>()(
  (set) => ({
    ...INITIAL_STATE,
    handleSaveOTPInput({
      email,
      inviteCode
    }: {
      email: string;
      inviteCode: string;
    }) {
      set({
        email,
        inviteCode
      });
    },
    handleClearOTPInput() {
      set({
        email: '',
        inviteCode: ''
      });
    }
  })
);
