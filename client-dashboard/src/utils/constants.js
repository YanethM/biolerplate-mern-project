const SERVER_IP = "localhost:3200";
const API_VERSION = "v1";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}/api/${API_VERSION}`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    RESET_PASSWORD: "auth/change-password",
    PASSWORD_RECOVERY: "auth/password-recovery",
    REFRESH_TOKEN: "auth/refresh-access-token",
    USER_ME: "admin/users/me",
  },
  JWT: {
    ACCESS: "access",
    REFRESH: "refresh",
  },
};
