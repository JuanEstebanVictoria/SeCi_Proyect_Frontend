export interface TokenResponse {
  token: string;
  type: string;
  expireAt: string;
  roles: string[];
  fullName: string;
  role: string;
}
