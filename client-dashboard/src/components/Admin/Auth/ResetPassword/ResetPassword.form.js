import * as Yup from "yup";

export const initialValues = () => ({
  current_password: "",
  new_password: "",
  confirm_password: "",
});

export const validationSchema = () =>
  Yup.object({
    current_password: Yup.string().required("Campo requerido"),
    new_password: Yup.string().required("Campo requerido"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Las contraseñas deben coincidir")
      .required("Debe confirmar la contraseña"),
  });
