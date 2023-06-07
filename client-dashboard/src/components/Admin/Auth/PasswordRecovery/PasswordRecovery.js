import React, { useState } from "react";
import { Form, Button, Message, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from "./PasswordRecovery.form";
import "./PasswordRecovery.scss";

const authController = new Auth();

export const PasswordRecovery = ({ setIsOpenRecovery }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    onSubmit: async (formValues) => {
      try {
        setErrorMessage("");
        const response = await authController.passwordRecovery(formValues);
        setSuccessMessage(
          "Se ha enviado un enlace de recuperación de contraseña a tu dirección de correo electrónico."
        );
        console.log(response);
        setTimeout(() => {
          setIsOpenRecovery(false);
        }, 2000); // Cerrar el modal después de 2 segundos
      } catch (error) {
        setErrorMessage(
          "El correo electrónico no se encuentra registrado en nuestras bases de datos"
        );
        console.error(error);
      }
    },
  });
  return (
    <>
      <div className="darkBG" onClick={() => setIsOpenRecovery(false)} />
      <div className="centered">
        <div className="modalRecovery">
          <div className="modalHeader">
            <h5 className="heading">Actualizar contraseña</h5>
          </div>
          {successMessage && (
            <Message
              positive
              content={successMessage}
              className="recovery-form__success"
            />
          )}
          {errorMessage && (
            <Message
              negative
              content={errorMessage}
              className="recovery-form__error"
            />
          )}
          <div className="modalBodyRecovery">
            <Form className="recovery-form" onSubmit={formik.handleSubmit}>
              <Form.Field>
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <Message negative content={formik.errors.email} />
                )}
              </Form.Field>
              <div>
                <Button
                  basic
                  color="teal"
                  type="submit"
                  content="Enviar correo"
                  loading={formik.isSubmitting}
                />
                <Button
                  basic
                  color="red"
                  onClick={() => setIsOpenRecovery(false)}
                >
                  Cancelar
                </Button>
              </div>
            </Form>
          </div>
        </div>
        <button className="closeBtnRecoveryPass" onClick={() => setIsOpenRecovery(false)}>
          <Icon name="close" />
        </button>
      </div>
    </>
  );
};
