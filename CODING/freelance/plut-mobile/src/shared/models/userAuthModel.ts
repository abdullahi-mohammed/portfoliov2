export interface AuthModel {
  email: string;
  password: string;
}

export interface EmailModel {
  email: string;
}

export interface VerifyEmailModel extends EmailModel {
  otp: string;
}

export interface NewPasswordModel {
  email: string;
  newPassword: string;
  otp: string;
}

export interface AuthResponseModel {
  data?: string | null;
  errors: string[];
  message: string;
  succeeded: boolean;
}

export interface DeleteAccountModel {
  reason: string;
}
