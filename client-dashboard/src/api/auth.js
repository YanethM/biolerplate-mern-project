import { ENV } from "../utils";

const { BASE_PATH, API_ROUTES } = ENV;

export class Auth {
  baseApi = BASE_PATH;

  register = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.REGISTER}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(params);

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  login = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.LOGIN}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(params);
    try {
      const response = await fetch(url, params);
      const result = await response.json();
      if (!response.ok) {
        // Verificar el tipo de error devuelto por el backend
        if (result && result.msg) {
          // El backend envía un mensaje de error específico
          throw new Error(result.msg);
        } else {
          // El backend no proporciona un mensaje de error específico
          throw new Error("Error en la solicitud: " + response.status);
        }
      }

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  resetPassword = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.RESET_PASSWORD}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(params);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  passwordRecovery = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.PASSWORD_RECOVERY}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(params);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  refreshAccessToken = async (refreshToken) => {
    const url = `${this.baseApi}/${API_ROUTES.REFRESH_TOKEN}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(params);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  setAccessToken = (token) => {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  };

  setRefreshToken = (token) => {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  };

  getAccessToken = () => {
    return localStorage.getItem(ENV.JWT.ACCESS);
  };

  getRefreshToken = () => {
    return localStorage.getItem(ENV.JWT.REFRESH);
  };
  removeTokens = () => {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  };
}
