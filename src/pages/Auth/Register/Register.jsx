import React, { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
import "./Register.css";
import FormInput from "../../../components/FormInput/FormInput";
import { Formik } from "formik";
import Yup from "../../../core/CustomValidators";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../AppProvider";
import ButtonWithLoader from "../../../components/ButtonWithLoader/ButtonWithLoader";
import http from "../../../services/http";

export default function Register(props) {
  //main variables
  const { addAxiosErrorMessage, getuserDetails } = useContext(AppContext);
  //   const history = useHistory();
  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().label("name").requiredCustom(""),
    email: Yup.string()
      .label("email")
      .email("Enter valid email")
      .requiredCustom(""),
    username: Yup.string().label("username").requiredCustom(""),
    password: Yup.string().label("password").requiredCustom(""),
    confirmPassword: Yup.string().label("confirmPassword").requiredCustom(""),
  });

  const history = useHistory();
  const [registering, setRegistering] = useState(false);
  const register = async (values) => {
    setRegistering(true);
    try {
      const res = await http.post("/user/register", values);
      if (res.data) {
        localStorage.setItem("authToken", res.data.token);
        getuserDetails();
        history.push("/main");
        return;
      }
    } catch (error) {
      addAxiosErrorMessage(error);
      setRegistering(false);
    } finally {
    }
  };
  return (
    <div className="container">
      <div className="logo">LOGO</div>
      <div className="header">
        <h1>Register</h1>
      </div>
      <Formik
        initialValues={{
          name: "Rajendra Dhami",
          email: "rajdhami273@gmail.com",
          username: "raj",
          password: "123456789",
          confirmPassword: "123456789",
        }}
        enableReinitialize={true}
        validateOnBlur={true}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => {
          register(values);
        }}
      >
        {(formik) => {
          const {
            handleChange,
            handleBlur,
            touched,
            values,
            initialValues,
            errors,
            handleSubmit,
          } = formik;
          return (
            <form noValidate>
              <div className="register-box">
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  type="text"
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name || initialValues.name}
                  error={touched.name && errors.name}
                  required={true}
                />
                <FormInput
                  label="Username"
                  placeholder="Enter a username"
                  type="text"
                  onChange={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username || initialValues.username}
                  error={touched.username && errors.username}
                  required={true}
                />
                <FormInput
                  label="Email"
                  placeholder="Enter email"
                  type="text"
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email || initialValues.email}
                  error={touched.email && errors.email}
                  required={true}
                />
                <FormInput
                  label="Password"
                  placeholder="Enter Password"
                  type="text"
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password || initialValues.password}
                  error={touched.password && errors.password}
                  required={true}
                />
                <FormInput
                  label="Confirm password"
                  placeholder="Enter Password"
                  type="text"
                  onChange={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={
                    values.confirmPassword || initialValues.confirmPassword
                  }
                  error={touched.confirmPassword && errors.confirmPassword}
                  required={true}
                />
                <ButtonWithLoader
                  disabled={registering}
                  onClick={handleSubmit}
                  title="Register"
                  type="submit"
                />
              </div>
            </form>
          );
        }}
      </Formik>
      <a href="/auth" className="login-link">
        {" "}
        Already have an account yet? Login here
      </a>
    </div>
  );
}
