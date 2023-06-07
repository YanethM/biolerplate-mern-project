import * as Yup from "yup";

export const initialValues = () => ({
  email: "",
});

export const validationSchema = () =>
  Yup.object({
    email: Yup.string()
      .email("El correo no es válido")
      .required("Campo requerido"),
  });
