import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { InputAdornment, TextField } from "@mui/material";
import BackButton from "../BackButton";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../../hooks/useResetPassword";
export default function NewPasswordForm() {
  const navigate = useNavigate();
  const { mutate } = useResetPassword();
  const initialValues = {
    password: "",
    password_confirmation: "",
  };
  const NewPasswordSchema = Yup.object({
    password: Yup.string()
      .min(8, "Must Be At Least 8 Characters")
      .matches(/[@$!%*?&]/, "Must Contain One Special Character")
      .required("Password is required!"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match!")
      .required("Password is required!"),
  });
  return (
    <div
      className="flex flex-col items-center justify-center 
    md:w-[510px] md:h-[470px] w-sm h-sm md:ml-[49px] mr-4 mt-30"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <LockOutlinedIcon fontSize="small" />
        <h1
          className="font-poppins font-medium text-[28px] leading-[100%] 
        tracking-normal text-center text-[#111928]"
        >
          set new password
        </h1>
        <p
          className="font-poppins font-normal text-[21px] leading-[150%] 
        tracking-normal text-center text-[#6B7280]"
        >
          Your New Password Must be Different to Previously Used Password
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={NewPasswordSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        <Form className="flex flex-col w-full gap-[8px]">
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
          <label
            className="font-poppins font-medium text-[18px] leading-[20px] 
        tracking-normal text-[#373737]"
          >
            Confirm Password
          </label>
          <Field
            as={TextField}
            type="password_confirmation"
            name="password_confirmation"
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
              Reset Password
            </button>
          </div>
        </Form>
      </Formik>
      <BackButton onClick={() => navigate("/login")}>Back To Log In</BackButton>
    </div>
  );
}
