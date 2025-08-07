interface GetFullNameProps {
  firstName: string;
  lastName: string;
}

export const getFullname = ({ firstName, lastName }: GetFullNameProps) => {
  if (!firstName || !lastName) return '';
  return `${lastName} ${firstName}`;
};
