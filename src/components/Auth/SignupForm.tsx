/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { TextField, InputAdornment, Alert } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import apple from "../../assets/apple.png";

const FormikTextField = ({ name, ...props }: any) => {
  const [field, meta] = useField(name);
  return (
    <TextField
      {...field}
      {...props}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : props.helperText}
    />
  );
};

type ApiErrors = Record<string, string | string[]>;

export default function SignupForm() {
  const { mutate } = useSignup();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const SignupSchema = Yup.object({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().email("Invalid Email").required("Email is required!"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      // .matches(/[@$!%*?&]/, "Must contain one special character")
      .required("Password is required!"),
    password_confirmation: Yup.string()
      .min(8, "Must be at least 8 characters")
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Password is required!"),
  });

  return (
    <div className="flex flex-col items-center justify-center md:w-[510px] md:h-[470px] w-sm h-sm md:ml-[49px] mr-4 mt-30">
      {/* العنوان */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-poppins font-medium text-[28px] text-[#111928]">
          Welcome Again
        </h1>
        <p className="font-poppins font-normal text-[21px] text-[#6B7280]">
          Welcome back! Please fill your data
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, setErrors, setStatus }) => {
          console.log(values);
          mutate(values, {
            onError: (error: any) => {
              console.log("Signup error:", error, error?.status, error?.data);

              if (error?.status === 422 && error?.data) {
                const apiErrors: ApiErrors = error.data;
                const formatted: Record<string, string> = {};

                Object.keys(apiErrors).forEach((k) => {
                  const value = apiErrors[k];
                  formatted[k] = Array.isArray(value) ? value[0] : value;
                });

                if (formatted.email) {
                  setStatus({ globalError: formatted.email });
                }

                setErrors(formatted);
              } else {
                setStatus({ globalError: "Signup failed, please try again." });
              }
            },
            onSettled: () => setSubmitting(false),
          });
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="flex flex-col w-full gap-[8px]">
            {/* 👇 alert فوق name */}
            {status?.globalError && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {status.globalError}
              </Alert>
            )}

            {/* Name */}
            <label className="font-poppins font-medium text-[18px] text-[#373737]">
              Name
            </label>
            <FormikTextField
              name="name"
              placeholder="kneeDue"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                style: { height: "56px", borderRadius: "8px" },
              }}
              sx={{ "& .MuiInputBase-input": { padding: "8px 16px" } }}
            />

            {/* Email */}
            <label className="font-poppins font-medium text-[18px] text-[#373737]">
              Email
            </label>
            <FormikTextField
              name="email"
              type="email"
              placeholder="kneeDue@gmail.com"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                style: { height: "56px", borderRadius: "8px" },
              }}
              sx={{ "& .MuiInputBase-input": { padding: "8px 16px" } }}
            />

            {/* Password */}
            <label className="font-poppins font-medium text-[18px] text-[#373737]">
              Password
            </label>
            <FormikTextField
              name="password"
              type="password"
              placeholder="******************"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                style: { height: "56px", borderRadius: "8px" },
              }}
              sx={{ "& .MuiInputBase-input": { padding: "8px 16px" } }}
            />
            <label className="font-poppins font-medium text-[18px] text-[#373737]">
              Password Confirmation
            </label>
            <FormikTextField
              name="password_confirmation"
              type="password"
              placeholder="******************"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
                style: { height: "56px", borderRadius: "8px" },
              }}
              sx={{ "& .MuiInputBase-input": { padding: "8px 16px" } }}
            />

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="md:w-[510px] md:h-[56px] w-sm h-[56px] rounded-[8px] bg-[#1E429F] text-white font-poppins font-semibold text-[20px] capitalize disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Signing up..." : "Signup"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {/* OR Divider */}
      <div className="flex items-center gap-[16px] w-[400px] my-4">
        <hr className="flex-grow border-[#373737]" />
        <p className="text-[#373737] font-semibold text-[16px] capitalize">
          or
        </p>
        <hr className="flex-grow border-[#373737]" />
      </div>

      {/* Social buttons */}
      <div className="flex md:flex-row md:justify-between flex-col gap-2 mb-2">
        <img src={google} alt="google" />
        <img src={facebook} alt="facebook" />
        <img src={apple} alt="apple" />
      </div>

      {/* Footer */}
      <div className="text-[#111928] font-semibold text-[18px]">
        Already have an account?{" "}
        <Link className="text-[#1E429F] font-semibold text-[18px]" to="/login">
          Sign In
        </Link>
      </div>
    </div>
  );
}
