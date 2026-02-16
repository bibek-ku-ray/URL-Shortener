import { httpClient } from "@/lib/api/http-client";
import { AuthApiAdapter } from "@/features/auth/adapters/auth-api.adapter";
import { BrowserTokenStorageAdapter } from "@/features/auth/adapters/token-storage.adapter";
import { LoginUseCase } from "@/features/auth/use-cases/login.use-case";
import { LogoutUseCase } from "@/features/auth/use-cases/logout.use-case";
import { RestoreSessionUseCase } from "@/features/auth/use-cases/restore-session.use-case";
import { SignupUseCase } from "@/features/auth/use-cases/signup.use-case";

const authGateway = new AuthApiAdapter(httpClient);
const tokenStorage = new BrowserTokenStorageAdapter();

export const signupUseCase = new SignupUseCase(authGateway);
export const loginUseCase = new LoginUseCase(authGateway, tokenStorage);
export const logoutUseCase = new LogoutUseCase(tokenStorage);
export const restoreSessionUseCase = new RestoreSessionUseCase(tokenStorage);
