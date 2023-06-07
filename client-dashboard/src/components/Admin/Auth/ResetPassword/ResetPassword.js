import React, { useState } from "react";
import "./ResetPassword.scss";
import { Button, Form, Icon } from "semantic-ui-react";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from "./ResetPassword.form";
import { useFormik } from "formik";
import "./ResetPassword.scss";
const authController = new Auth();

export const ResetPassword = ({ setIsOpenReset }) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (formValue) => {
      console.log("entre al onsubmit");

      try {
        const response = await authController.resetPassword(formValue);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <div className="darkBG" onClick={() => setIsOpenReset(false)} />
      <div className="centeredResetPass">
        <div className="modalResetPass">
          <div className="modalResetPassHeader">
            <h5 className="heading">Restablecer contraseña</h5>
          </div>
          <div className=".modalResetPassBodyReset">
            <Form onSubmit={formik.handleSubmit}>
              <Form.Input
                name="current_password"
                type={showCurrentPassword ? "text" : "password"}
                autoComplete="current_password"
                label="Contraseña actual"
                placeholder="Contraseña actual"
                onChange={formik.handleChange}
                value={formik.values.current_password}
                error={
                  formik.errors.current_password && {
                    content: formik.errors.current_password,
                    pointing: "below",
                  }
                }
                icon={
                  <Button
                    icon
                    type="button"
                    onClick={toggleCurrentPasswordVisibility}
                  >
                    <Icon
                      name={showCurrentPassword ? "eye slash" : "eye"}
                      link
                    />
                  </Button>
                }
                iconPosition="left"
              />
              <Form.Input
                name="new_password"
                type={showNewPassword ? "text" : "password"}
                autoComplete="new_password"
                label="Nueva contraseña"
                placeholder="Nueva contraseña"
                onChange={formik.handleChange}
                value={formik.values.new_password}
                error={
                  formik.errors.new_password && {
                    content: formik.errors.new_password,
                    pointing: "below",
                  }
                }
                icon={
                  <Button
                    icon
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                  >
                    <Icon name={showNewPassword ? "eye slash" : "eye"} link />
                  </Button>
                }
                iconPosition="left"
              />
              <Form.Input
                name="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="confirm_password"
                label="Confirmar contraseña"
                placeholder="Confirmar contraseña"
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                error={
                  formik.errors.confirm_password && {
                    content: formik.errors.confirm_password,
                    pointing: "below",
                  }
                }
                icon={
                  <Button
                    icon
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <Icon
                      name={showConfirmPassword ? "eye slash" : "eye"}
                      link
                    />
                  </Button>
                }
                iconPosition="left"
              />

              <div>
                <Button
                  basic
                  color="teal"
                  type="submit"
                  content="Aceptar"
                  loading={formik.isSubmitting}
                />
                <Button basic color="red" onClick={() => setIsOpenReset(false)}>
                  Cancelar
                </Button>
              </div>
            </Form>
          </div>
          <button
            className="closeBtnResetPass"
            onClick={() => setIsOpenReset(false)}
          >
            <Icon name="close" />
          </button>
        </div>
      </div>
    </>
  );
};
