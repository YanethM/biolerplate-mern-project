import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { useAuth } from "../../../../hooks";

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    console.log("Cerrando sesión...");
    localStorage.removeItem("token");
    logout();
    navigate("/admin");
  };
  return (
    <Button icon basic color="red" onClick={onLogout}>
      <Icon name="power off" />  Cerrar sesión
    </Button>
  );
};
