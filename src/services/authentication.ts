import type { User } from "../models/user";
import api from "./api";

export type ResponseAuth = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

export const login = async ({
  email,
  password,
}: User): Promise<ResponseAuth> => {
  const data = new URLSearchParams({
    grant_type: "password",
    client_id: import.meta.env.VITE_CLIENT_ID,
    client_secret: import.meta.env.VITE_CLIENT_SECRET,
    username: email,
    password: password,
  });

  const response = await api.post<ResponseAuth>("/oauth/token", data, {
    headers: {
      Accept: "application/json",
    },
  });

  const { access_token, refresh_token, token_type, expires_in } = response.data;
  const expiresAt = JSON.stringify(expires_in * 1000 + new Date().getTime());
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("token_type", token_type);
  localStorage.setItem("expires_at", expiresAt);

  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("token_type");
  localStorage.removeItem("expires_at");

  window.location.href = "/login";
};

