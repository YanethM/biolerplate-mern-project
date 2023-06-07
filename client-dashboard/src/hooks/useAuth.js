import { useContext } from "react";
import { AuthContext } from "../contexts";

/* el hook useAuth se utiliza para acceder al valor del contexto de autenticación. */
export const useAuth = () => useContext(AuthContext);
