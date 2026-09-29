export interface ReqUser {
  id?: string;
  email?: string;
  username?: string;

  info?: {
    id: string;
    email: string;
    username?: string;
  };

  orgInfo?: {
    id?: string;
    code?: string;
    name?: string;
    orgId?: string;
  };

  role?: string;
  permissions?: string[];
}
