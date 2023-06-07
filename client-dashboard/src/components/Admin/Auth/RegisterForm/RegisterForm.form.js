import * as Yup from "yup";

export const initialValues = () => ({
  firstname: "",
  lastname: "",
  email: "",
  current_password: "",
  confirm_password: "",
});

export const validationSchema = () => {
  return Yup.object({
    firstname: Yup.string().required("El nombre es requerido"),
    lastname: Yup.string().required("El apellido requerido"),
    email: Yup.string()
      .email("El correo no es válido")
      .required("Campo requerido"),
    current_password: Yup.string().required("Campo requerido"),
    confirm_password: Yup.string()
      .required("Campo requerido")
      .oneOf([Yup.ref("current_password")], "Las contraseñas no coinciden."),
  });
};
