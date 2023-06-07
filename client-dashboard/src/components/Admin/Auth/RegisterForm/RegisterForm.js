import React, { useState, useEffect } from "react";
import { Auth } from "../../../../api";
import { Button, Form, Icon, Message } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";
import "./RegisterForm.scss";
import { DepartmentsForm } from "../../../GeneralLayout/DepartmentsForm/DepartmentsForm";
import { TermsModal } from "../../../GeneralLayout/TermsModal/TermsModal";

const authController = new Auth();

export const RegisterForm = (props) => {
  const { openLogin } = props;
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acceptance, setAcceptance] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCheckboxChange = (acceptanceState) => {
    setAcceptance(acceptanceState);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValue) => {
      console.log(acceptance);
      if (acceptance) {
        try {
          setErrorMessage("");
          setIsSubmitting(true);
          await authController.register(formValue);
          setSuccessMessage("Usuario creado correctamente.");
          openLogin(true); // Establecer la variable de redirección a true
        } catch (error) {
          setErrorMessage(
            <>
              <strong>No fue posible crear el usuario.</strong>
              <br />
              Ya existe un usuario registrado con este correo electrónico.
            </>
          );
          setIsSubmitting(false);
        }
      } else {
        setErrorMessage(
          <>
            <strong>No fue posible crear el usuario.</strong>
            <br />
            Debes aceptar los términos y condiciones para registrarte.
          </>
        );
        return;
      }
    },
  });

  useEffect(() => {
    setAcceptance(formik.values.acceptance);
  }, [formik.values.acceptance]);

  return (
    <>
      {successMessage && (
        <Message
          positive
          content={successMessage}
          className="register-form__success"
        />
      )}
      {errorMessage && (
        <Message
          negative
          content={errorMessage}
          className="register-form__error"
        />
      )}
      <Form className="register-form" onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="firstname"
            label="Nombre(s)"
            placeholder="First name"
            autoComplete="firstname"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.errors.firstname}
          />
          <Form.Input
            fluid
            name="lastname"
            label="Apellido(s)"
            placeholder="Last name"
            autoComplete="lastname"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Form.Input
          name="email"
          label="Correo"
          placeholder="Correo electrónico"
          autoComplete="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Group>
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
                <Icon name={showCurrentPassword ? "eye slash" : "eye"} link />
              </Button>
            }
            iconPosition="left"
          />
          <Form.Input
            name="confirm_password"
            label="Repetir contraseña"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="confirm_password"
            placeholder="Repetir contraseña"
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
                <Icon name={showConfirmPassword ? "eye slash" : "eye"} link />
              </Button>
            }
            iconPosition="left"
          />
        </Form.Group>

        <DepartmentsForm></DepartmentsForm>

        {/* Botón para abrir la ventana modal */}
        <div className="terms-checkbox">
          <Button
            onClick={handleOpenModal}
            className="terms-button"
            basic
            color="blue"
            style={{
              border: "none",
              padding: 10,
              cursor: "pointer",
            }}
          >
            Ver Términos y Condiciones
          </Button>

          {/* Ventana modal de términos y condiciones */}
          {isModalOpen && (
            <TermsModal
              closeModal={handleCloseModal}
              onAcceptChange={handleCheckboxChange}
              initialAcceptance={formik.values.acceptance}
            />
          )}
        </div>

        <Form.Button
          type="submit"
          primary
          fluid
          content={isSubmitting ? "Enviando..." : "Registrarse"}
          loading={isSubmitting}
          disabled={isSubmitting}
        />
      </Form>
    </>
  );
};

export default RegisterForm;
