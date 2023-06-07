import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Services, News } from "../pages/web";
import { ClientLayout } from "../layouts";

export const WebRouter = () => {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
      <Route path="/services" element={loadLayout(ClientLayout, Services)} />
      <Route path="/news" element={loadLayout(ClientLayout, News)} />
    </Routes>
  );
};
