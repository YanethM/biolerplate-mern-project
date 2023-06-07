import { useState } from "react";
import { Form, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from "./LoginForm.form";
import { ResetPassword } from "../ResetPassword";
import { useAuth } from "../../../../hooks";
import { PasswordRecovery } from "../PasswordRecovery";

const authController = new Auth();

export const LoginForm = ({ onRegisterClick }) => {
  const { login } = useAuth();
  const [isOpenRecovery, setIsOpenRecovery] = useState(false);
  const [isOpenReset, setIsOpenReset] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValue) => {
      try {
        setErrorMessage("");
        const response = await authController.login(formValue);
        authController.setAccessToken(response.access);
        authController.setRefreshToken(response.refresh);
        setSuccessMessage("Iniciando sesión");
        login(response.access);
        console.log(response);
      } catch (error) {
        console.error(error);
        setErrorMessage(
          <>
            <strong>
              <p>{`${error}`}</p>
            </strong>
          </>
        );
      }
    },
  });

  return (
    <>
      {successMessage && (
        <Message
          positive
          content={successMessage}
          className="login-form__success"
        />
      )}
      {errorMessage && (
        <Message
          negative
          content={errorMessage}
          className="login-form__error"
        />
      )}
      <Form className="login-form" onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          placeholder="Correo electrónico"
          autoComplete="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Input
          name="current_password"
          type="password"
          autoComplete="current_password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
          value={formik.values.current_password}
          error={formik.errors.current_password}
        />

        <Form.Button
          type="submit"
          primary
          fluid
          content="Iniciar sesión"
          loading={formik.isSubmitting}
        />
      </Form>
      <div
        className="button-group"
        style={{ display: "flex", paddingLeft: "20px", alignItems: "center" }}
      >
        <Form.Button
          basic
          color="blue"
          onClick={() => setIsOpenRecovery(true)}
          content="Restablecer contraseña"
        />
        {isOpenRecovery && (
          <PasswordRecovery setIsOpenRecovery={setIsOpenRecovery} />
        )}
        <Form.Button
          basic
          color="blue"
          onClick={() => setIsOpenReset(true)}
          content="Cambiar contraseña"
        />
        {isOpenReset && <ResetPassword setIsOpenReset={setIsOpenReset} />}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "20px",
          paddingTop: "10px",
        }}
      >
        <p style={{ marginRight: "10px" }}>¿No tienes cuenta?</p>
        <Form.Button
          basic
          color="blue"
          onClick={onRegisterClick}
          content="Regístrate"
        />
      </div>
    </>
  );
};
