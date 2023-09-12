export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string;
  token: string;
  refreshToken: string;
  userName: string;
  phoneNumber?: string;
}
