export interface User {
  id: string;
  username: string;
  email?: string;
  first_name: string;
  last_name: string;
  pesel?: string;
  phone_number?: string;
  address?: string;
  role: string;
  disabled: boolean;
}
