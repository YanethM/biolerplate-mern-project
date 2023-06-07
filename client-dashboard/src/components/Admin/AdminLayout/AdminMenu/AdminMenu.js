import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../hooks";
import "./AdminMenu.scss";

const menuAdmin = [
  { path: "/admin/users", icon: "user", text: "Usuario" },
  { path: "/admin/menu", icon: "cogs", text: "Menu" },
  { path: "/admin/services", icon: "briefcase", text: "Servicios" },
  { path: "/admin/news", icon: "calendar alternate", text: "Actualidad" },
  { path: "/admin/clients", icon: "handshake", text: "Clientes" },
  { path: "/admin/categories", icon: "cubes", text: "Categorías" },
  { path: "/admin/providers", icon: "shipping fast", text: "Proveedores" },
  { path: "/admin/contact-us", icon: "street view", text: "Contactanos" },
];

const menuGuest = [
  { path: "/services", icon: "briefcase", text: "Servicios" },
  { path: "/news", icon: "calendar alternate", text: "Actualidad" },
];

export const AdminMenu = () => {
  const location = useLocation();
  const {
    user: { role },
  } = useAuth();

  const isAdmin = role === "admin";
  
  const isCurrentPath = (path) => {
    const { pathname } = location;
    return path === pathname ? true : false;
  };

  return (
    <Menu fluid vertical icon text className="admin-menu">
      {isAdmin ? (
        <>
          {menuAdmin.map((item) => (
            <Menu.Item
              as={Link}
              to={item.path}
              active={isCurrentPath(item.path)}
              key={item.path}
            >
              <Icon name={item.icon} />
              {item.text}
            </Menu.Item>
          ))}
        </>
      ) : (
        <>
          {menuGuest.map((item) => (
            <Menu.Item
              as={Link}
              to={item.path}
              active={isCurrentPath(item.path)}
              key={item.path}
            >
              <Icon name={item.icon} />
              {item.text}
            </Menu.Item>
          ))}
        </>
      )}
    </Menu>
  );
};
