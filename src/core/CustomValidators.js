import * as Yup from "yup";
/* eslint-disable */
Yup.addMethod(Yup.string, "requiredCustom", function (message) {
  return this.test({
    name: "is-empty",
    exclusive: true,
    params: {},
    message: message || "${path} cannot be empty",
    test: (value) => value,
  });
});
Yup.addMethod(Yup.boolean, "checkboxChecked", function (message) {
  return this.test({
    name: "is-checked",
    exclusive: true,
    params: {},
    message: message || "${path} should be checked",
    test: (value) => value,
  });
});
Yup.addMethod(Yup.string, "minCustom", function (minLength, message) {
  return this.test({
    name: "minLength",
    exclusive: true,
    params: {},
    message:
      message || "${path} should be atleast " + minLength + " characters long",
    test: (value) => value && value.length >= minLength && value.length >= 1,
  });
});
Yup.addMethod(Yup.string, "password", function (minLength, message) {
  return this.test({
    name: "password",
    exclusive: true,
    params: {},
    message:
      message ||
      "${path} should be atleast " +
        (minLength || 8) +
        " characters long and contain atleast one number",
    test: (value) =>
      value && value.length >= (minLength || 8) && value.match(/[0-9]/g),
  });
});
Yup.addMethod(Yup.string, "pincode", function (length, message) {
  return this.test({
    name: "pincode",
    exclusive: true,
    params: {},
    message:
      message ||
      "${path} should be exactly" + (length || 6) + " characters long",
    test: (value) =>
      value && value.length === (length || 6) && value.match(/^[0-9]{6}$/g),
  });
});
Yup.addMethod(Yup.string, "mobile", function (length, message) {
  return this.test({
    name: "mobile",
    exclusive: true,
    params: {},
    message:
      message ||
      "${path} should be atleast " + (length || 6) + " characters long",
    test: (value) => value && value.length >= 6 && value.match(/^[0-9]{6,}$/g),
  });
});
Yup.addMethod(Yup.string, "numbersOnly", function (length, message) {
  return this.test({
    name: "numbersOnly",
    exclusive: true,
    params: {},
    message: message || "Only numbers are allowed",
    test: (value) => value && value.match(/^[0-9]+$/g),
  });
});
Yup.addMethod(Yup.string, "emailCustom", function (length, message) {
  return this.test({
    name: "email",
    exclusive: true,
    params: {},
    message: message || "${path} is invalid",
    test: (value) =>
      value &&
      value.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      ),
  });
});
Yup.addMethod(Yup.string, "equalTo", function (ref, message) {
  return this.test({
    name: "equalto",
    exclusive: true,
    params: {
      reference: ref.path,
    },
    message: "message" || "${reference} and ${path} do not match",
    test: (value) => value && value === this.resolve(ref), //this.parent[ref.path] //this.resolve(ref)
  });
});
export default Yup;
