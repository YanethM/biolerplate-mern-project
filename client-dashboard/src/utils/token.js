import jwtDecode from "jwt-decode";
export const hasExpiredToken = (token) => {
  const { exp } = jwtDecode(token);
  const currentData = new Date().getTime();
  //Si el token es anterior a la fecha actual, ha caducado
  if (currentData > exp) {
    return true;
  }
  return false;
};
