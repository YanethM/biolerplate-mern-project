import * as Yup from "yup";

export const initialValues = () => {
  return {
    email: "",
    current_password: "",
  };
};

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El correo no es válido")
      .required("Campo requerido"),
    current_password: Yup.string().required("Campo requerido"),
  });
}
