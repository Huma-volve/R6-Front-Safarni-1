import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

import { useSignup } from "../../hooks/useSignup";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import apple from "../../assets/apple.png";

export default function SignupForm() {
  const { mutate } = useSignup();
  // const x = useQuery({ queryKey: ["signUpData"], queryFn: () => signup() });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const SignupSchema = Yup.object({
    name: Yup.string().required("Name is required!"),
    email: Yup.string().email("InValid Email").required("Email is required!"),
    password: Yup.string()
      .min(8, "Must Be At Least 8 Characters")
      .matches(/[@$!%*?&]/, "Must Contain One Special Character")
      .required("Password is required!"),
  });
  return (
    <div
      className="flex flex-col items-center justify-center 
    md:w-[510px] md:h-[470px] w-sm h-sm md:ml-[49px] mr-4 mt-30"
    >
      <div className="flex flex-col items-center justify-center">
        <h1
          className="font-poppins font-medium text-[28px] leading-[100%] 
        tracking-normal text-center text-[#111928]"
        >
          Welcome Again
        </h1>
        <p
          className="font-poppins font-normal text-[21px] leading-[150%] 
        tracking-normal text-center text-[#6B7280]"
        >
          welcome back! please Fill Your data
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        <Form className="flex flex-col w-full gap-[8px]">
          <label
            className="font-poppins font-medium text-[18px] leading-[20px] 
        tracking-normal text-[#373737]"
          >
            Name
          </label>
          <Field
            as={TextField}
            type="text"
            name="name"
            placeholder="kneeDue"
            size="small"
            fullwidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
              style: {
                height: "56px",
                borderRadius: "8px",
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                padding: "8px 16px",
              },
            }}
          />
          <label
            className="font-poppins font-medium text-[18px] leading-[20px] 
        tracking-normal text-[#373737]"
          >
            Email
          </label>
          <Field
            as={TextField}
            type="email"
            name="email"
            placeholder="kneeDue@gmail.com"
            size="small"
            fullwidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
              style: {
                height: "56px",
                borderRadius: "8px",
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                padding: "8px 16px",
              },
            }}
          />
          <label
            className="font-poppins font-medium text-[18px] leading-[20px] 
        tracking-normal text-[#373737]"
          >
            Password
          </label>
          <Field
            as={TextField}
            type="password"
            name="password"
            placeholder="******************"
            size="small"
            fullwidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
              style: {
                height: "56px",
                borderRadius: "8px",
              },
            }}
            sx={{
              "& .MuiInputBase-input": {
                padding: "8px 16px",
              },
            }}
          />

          <div>
            <button
              type="submit"
              className="md:w-[510px] md:h-[56px] w-sm h-[56px] rounded-[8px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] bg-[#1E429F] text-[#FFFFFF]
              font-poppins font-semibold text-[20px] leading-[25px] tracking-[0.02em] capitalize"
            >
              Signup
            </button>
          </div>
        </Form>
      </Formik>
      <div className="flex items-center gap-[16px] w-[400px] my-4">
        <hr className="flex-grow border-[#373737]" />
        <p className="text[#373737] font-semibold text-[16px] leading-[140%] tracking-normal capitalize">
          or
        </p>
        <hr className="flex-grow border-[#373737]" />
      </div>
      <div className="flex md:flex-row md:justify-between flex-col gap-2 mb-2">
        <img src={google} alt="google-image" />
        <img src={facebook} alt="facebook-image" />
        <img src={apple} alt="apple-image" />
      </div>
      <div className="text-[#111928] font-semibold text-[18px] leading-[100%] tracking-normal">
        Already have an account?{" "}
        <Link
          className="text-[#1E429F] font-semibold text-[18px] leading-[20px] tracking-normal "
          to="/login"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
