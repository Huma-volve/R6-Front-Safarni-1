/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { TextField, InputAdornment } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import apple from "../../assets/apple.png";
import { useAuth } from "../../hooks/useAuth";
import { AxiosError } from "axios";

interface FormikTextFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  size?: "small" | "medium";
  helperText?: string;
  [key: string]: unknown;
}

const FormikTextField = ({ name, ...props }: FormikTextFieldProps) => {
  const [field, meta] = useField(name);
  return (
    <TextField
      id={name}
      {...field}
      {...props}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched && meta.error ? meta.error : props.helperText}
    />
  );
};

export default function LoginForm() {
  const { mutate } = useLogin();
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const initialValues = { email: "", password: "" };
  const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Email is required!"),
    password: Yup.string()
      .min(8, "Must be at least 8 characters")
      // .matches(/[@$!%*?&]/, "Must contain one special character")
      .required("Password is required!"),
  });

  return (
    <div className="flex flex-col items-center justify-center md:w-[510px] md:h-[470px] w-sm h-sm md:ml-[49px] mr-4 mt-30">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-poppins font-medium text-[28px] leading-[100%] tracking-normal text-center text-[#111928]">
          Welcome Again
        </h1>
        <p className="font-poppins font-normal text-[21px] leading-[150%] tracking-normal text-center text-[#6B7280]">
          welcome back! please Fill Your data
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          mutate(values, {
            onSuccess: (res) => {
              const token = res?.data?.token;
              if (token) {
                setAuthToken(token);
                localStorage.setItem("authToken", token);
              }
              navigate("/home");
            },

            onError: (error) => {
              const axiosError = error as AxiosError<any>;
              const resp: any =
                axiosError?.response?.data ||
                axiosError?.message ||
                axiosError?.name ||
                axiosError;

              let formattedErrors: Record<string, string> = {};

              if (resp && typeof resp === "object") {
                Object.keys(resp).forEach((key) => {
                  const value = resp[key];
                  formattedErrors[key] = Array.isArray(value)
                    ? value[0]
                    : String(value);
                });
              } else {
                formattedErrors = { email: "Invalid credentials" };
              }

              setErrors(formattedErrors);
            },

            onSettled: () => setSubmitting(false),
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col w-full gap-[8px]">
            <label
              htmlFor="email"
              className="font-poppins font-medium text-[18px] leading-[20px] text-[#373737]"
            >
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

            <label
              htmlFor="password"
              className="font-poppins font-medium text-[18px] leading-[20px] text-[#373737]"
            >
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

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="md:w-[510px] md:h-[56px] w-sm h-[56px] rounded-[8px] bg-[#1E429F] text-white font-poppins font-semibold text-[20px] capitalize disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="w-full mt-[5px] flex justify-end">
        <Link
          to="/forget-password"
          className="text-[#373737] font-semibold text-[18px]"
        >
          Forget Password?
        </Link>
      </div>

      <div className="flex items-center gap-[16px] w-[400px] my-4">
        <hr className="flex-grow border-[#373737]" />
        <p className="text-[#373737] font-semibold text-[16px] leading-[140%] capitalize">
          or
        </p>
        <hr className="flex-grow border-[#373737]" />
      </div>

      <div className="flex md:flex-row md:justify-between flex-col gap-2 mb-2">
        <img src={google} alt="google" />
        <img src={facebook} alt="facebook" />
        <img src={apple} alt="apple" />
      </div>

      <div className="text-[#111928] font-semibold text-[18px]">
        Don't have an account?{" "}
        <Link className="text-[#1E429F] font-semibold text-[18px]" to="/signup">
          sign up
        </Link>
      </div>
    </div>
  );
}
