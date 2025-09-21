import successIcon from "../../assets/successLogo.png"
import { Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();


  return (
    <div className="px-6 md:px-10 lg:px-16 py-8 md:h-120">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5">
          <div className="rounded-2xl md:h-120 w-full bg-gray-100 flex items-center justify-center">
            <img
              src={successIcon}
              alt="success"
              className="h-104 w-auto object-contain"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl p-8 bg-white text-center">
            <div className="flex items-center justify-center mb-3">
              <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
            </div>
            <Typography variant="h5" className="my-4 ">
              Payment Successful!
            </Typography>
            <Typography variant="body2" className="text-gray-500 mb-6">
              Thank you for your trust.
            </Typography>

            <Stack direction="row" spacing={1.5} className="justify-center mb-6">
              {/* <Chip label={`Method: ${lastPayment.method}`} color="primary" variant="outlined" /> */}
              {/* <Chip label={lastPayment.fullName} variant="outlined" /> */}
              {/* <Chip label={lastPayment.email} variant="outlined" /> */}
            </Stack>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
            >
              Back To Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}



