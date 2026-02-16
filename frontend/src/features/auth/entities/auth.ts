export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupPayload {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
}

export interface SignupResult {
  userId: string;
  message: string;
}

export interface AuthToken {
  token: string;
}
