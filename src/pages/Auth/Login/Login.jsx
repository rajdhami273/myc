import React, { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";
import FormInput from "../../../components/FormInput/FormInput";
import "./Login.css";
import { Formik } from "formik";
import Yup from "../../../core/CustomValidators";
import { useHistory } from "react-router-dom";
import http from "../../../services/http";
import ButtonWithLoader from "../../../components/ButtonWithLoader/ButtonWithLoader";
import { AppContext } from "../../../AppProvider";

export default function Login(props) {
  //main variables
  const { addAxiosErrorMessage, getuserDetails } = useContext(AppContext);
  //   const history = useHistory();
  const loginValidationSchema = Yup.object().shape({
    user: Yup.string().label("Username or email").requiredCustom(""), //Yup.string().required("Username or email required"),
    password: Yup.string().label("Password").requiredCustom("").password(""),
    // .checkboxChecked("")
  });

  const history = useHistory();
  const [loggingIn, setLoggingIn] = useState(false);
  const login = async (values) => {
    setLoggingIn(true);
    try {
      const res = await http.post("/user/login", values);
      if (res.data) {
        localStorage.setItem("authToken", res.data.token);
        getuserDetails();
        history.push("/main");
        return;
      }
    } catch (error) {
      addAxiosErrorMessage(error);
      setLoggingIn(false);
    } finally {
      // setLoggingIn(false);
    }
  };

  return (
    <div className="container">
      <div className="logo">LOGO</div>
      <div className="header">
        <h1>Login</h1>
      </div>
      <Formik
        initialValues={{ user: "", password: "" }}
        enableReinitialize={true}
        validateOnBlur={true}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => {
          login(values);
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
              <div className="login-box">
                <FormInput
                  label="Username / Email"
                  placeholder={"Enter username / email"}
                  value={values.user || initialValues.user}
                  onChange={handleChange("user")}
                  onBlur={handleBlur("user")}
                  disabled={false}
                  error={touched.user && errors.user}
                  required={true}
                  type={"text"}
                />
                <FormInput
                  label={"Password"}
                  type={"password"}
                  placeholder={"Enter password"}
                  value={values.password || initialValues.password}
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  disabled={false}
                  error={touched.password && errors.password}
                  required={true}
                />
                <ButtonWithLoader
                  title="Login"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loggingIn}
                />
              </div>
            </form>
          );
        }}
      </Formik>
      <a href="/auth/register" className="register-link">
        {" "}
        Don't have an account yet? Register here
      </a>
    </div>
  );
}
