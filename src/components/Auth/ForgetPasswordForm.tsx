import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { InputAdornment, TextField } from "@mui/material";
import { KeyIcon } from "@heroicons/react/24/outline";
import { useForgetPassword } from "../../hooks/useForgetPassword";

export default function ForgetPasswordForm() {
  const { mutate } = useForgetPassword();
  console.log(mutate);
  const initialValues = {
    email: "",
  };
  const ForgetPasswordSchema = Yup.object({
    email: Yup.string().email("InValid Email").required("Email is required!"),
  });
  return (
    <div
      className="flex flex-col items-center justify-center 
    md:w-[510px] md:h-[470px] w-sm h-sm md:ml-[49px] mr-4 mt-30"
    >
      <div className="flex flex-col items-center justify-center gap-[20px]">
        <KeyIcon className="w-[30px] h-[30px] text-[#AFAFAF]" />
        <h1
          className="font-poppins font-medium text-[28px] leading-[100%] 
        tracking-normal text-center text-[#111928]"
        >
          Forgot Password?
        </h1>
        <p
          className="font-poppins font-normal text-[21px] leading-[150%] 
        tracking-normal text-center text-[#6B7280] mb-[20px]"
        >
          please enter your email to reset that password
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={ForgetPasswordSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        <Form className="flex flex-col w-full gap-[13px]">
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
    </div>
  );
}
