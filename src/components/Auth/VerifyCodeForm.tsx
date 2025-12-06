/* eslint-disable @typescript-eslint/no-unused-vars */
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { Formik, Form, useField } from "formik";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useOTP } from "../../hooks/useOTP";
import { InputAdornment, TextField } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function VerifyCodeForm() {
  const { mutate } = useOTP();
  // const [timeLeft, setTimeLeft] = useState(60); // 60 seconds
  const FormikTextField = ({ name, ...props }) => {
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
  // countdown effect
  // useEffect(() => {
  //   if (timeLeft <= 0) return; // stop when it reaches 0
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => prev - 1);
  //   }, 1000);
  //   return () => clearInterval(timer); // cleanup
  // }, [timeLeft]);

  // // resend OTP handler
  // const handleResend = () => {
  //   setTimeLeft(60); // reset timer to 1 min
  //   alert("OTP resent! 📩"); // here you call your API to resend OTP
  // };
  const initialValues = { email: "", otp: "1234" };
  const OPTSchema = Yup.object({
    otp: Yup.string().length(5, "OTP must be 5 digits").required("Required"),
  });
  return (
    <div
      className="flex flex-col items-center justify-center 
    md:w-[510px] md:h-[470px] w-sm h-sm md:ml-[49px] mr-4 mt-10"
    >
      <div className="flex flex-col items-center justify-center gap-7">
        <EnvelopeIcon className="w-[29px] h-[22px] text-[#AFAFAF]" />
        <h1
          className="font-poppins font-medium text-[28px] leading-[100%] 
        tracking-normal text-center text-[#111928]"
        >
          Verify Code
        </h1>
        <p
          className="font-poppins font-normal text-[21px] leading-[150%] 
        tracking-normal text-center text-[#6B7280]"
        >
          Please enter the code we just sent to email kneedue@untitledui.com
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={OPTSchema}
        onSubmit={(values) => {
          console.log(values);
          mutate(values);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-8 items-center mt-10 ">
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
            {/* <OtpInput
              value={values.otp}
              onChange={(val) => /^\d*$/.test(val) && setFieldValue("otp", val)}
              numInputs={4}
              shouldAutoFocus
              renderSeparator={<span className="w-3 inline-block" />}
              renderInput={(inputProps, index) => (
                <input
                  {...inputProps}
                  key={index}
                  className=" h-10 border border-blue-500 rounded text-center text-xl 
                           focus:border-2 focus:border-green-500 outline-none"
                />
              )}
            /> */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:w-[510px] md:h-[56px] w-sm h-[56px] ml-4 rounded-[8px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] bg-[#1E429F] text-[#FFFFFF]
                    font-poppins font-semibold text-[20px] leading-[25px] tracking-[0.02em] capitalize"
            >
              {isSubmitting ? "Verifing..." : "Verify"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
