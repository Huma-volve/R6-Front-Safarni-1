type SignupData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
type SignupResponse = {
  status: number;
  message: string;
  data: {
    token?: string;
    name?: string;
    email: string;
  };
};
export async function signup(userData: SignupData): Promise<SignupResponse> {
  console.log("API", userData);
  try {
    const res = await fetch(
      "https://round7-safarni-team-one.huma-volve.com/api/v1/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      throw { status: res.status, ...data };
    }
    console.log(res);
    // const data = await res.json();
    localStorage.setItem("name", data.data.name);
    localStorage.setItem("email", data.data.email);
    localStorage.setItem("authToken", data.data.token);
    console.log(data);

    return data;
  } catch (error) {
    console.log("Signup error in API:", error);
    if (typeof error === "object" && error !== null) {
      throw error;
    }
    throw new Error("Unexpected signup error");
  }
}

type LoginData = {
  email: string;
  password: string;
};
type LoginResponse = {
  status: number;
  message: string;
  data: {
    token?: string;
    user: {
      id: number;
      name?: string;
      email: string;
    };
  };
};
export async function login(userData: LoginData): Promise<LoginResponse> {
  try {
    const res = await fetch(
      "https://round7-safarni-team-one.huma-volve.com/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }
    const data = await res.json();
    localStorage.setItem("name", data.data.name);
    localStorage.setItem("email", data.data.email);
    localStorage.setItem("authToken", data.data.token);
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected login error");
  }
}

type ForgetPasswordData = {
  email: string;
};
type ForgetPasswordResponse = {
  status: number;
  message: string;
  data: string;
};
export async function forgetPassword(
  userData: ForgetPasswordData
): Promise<ForgetPasswordResponse> {
  console.log(userData.email);
  const formData = new FormData();
  formData.append("email", userData.email);
  // for (const [key, value] of formData.entries()) {
  //   console.log(key, value);
  // }
  try {
    const res = await fetch(
      "https://round7-safarni-team-one.huma-volve.com/api/forgot-password",
      {
        method: "POST",
        body: formData,
        // headers: { "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Forget Password failed");
    }
    const data = await res.json();
    localStorage.setItem("email", userData.email);
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected error");
  }
}

type OTPData = {
  email: string;
  otp: string;
};
type OTPResponse = {
  status: number;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
    };
    token: string;
  };
};
export async function verifyOTP(userData: OTPData): Promise<OTPResponse> {
  try {
    const res = await fetch(
      "https://round7-safarni-team-one.huma-volve.com/api/v1/auth/verify-otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "otp failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected otp error");
  }
}

type ResetPasswordData = {
  password: string;
  password_confirmation: string;
};
type ResetPasswordResponse = {
  status: number;
  message: string;
  data: string;
};
export async function resetPassword(
  userData: ResetPasswordData
): Promise<ResetPasswordResponse> {
  const token = localStorage.getItem("authToken");

  const formData = new FormData();
  formData.append("password", userData.password);
  formData.append("password_confirmation", userData.password_confirmation);
  console.log(token);
  try {
    const res = await fetch(
      "https://round7-safarni-team-one.huma-volve.com/api/reset-password",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    // const contentType = res.headers.get("content-type");
    // console.log(contentType);
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Reset Password failed");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error instanceof Error ? error : new Error("Unexpected reset error");
  }
}
