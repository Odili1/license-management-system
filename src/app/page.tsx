"use client";
import { AuthForm, type FormError } from "@/src/components/auth/auth-form";
import { AuthLayout } from "@/src/components/auth/auth-layout";
import { customToast } from "@/src/components/custom-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { login } from "../services/api/auth";
import { useAuthStore } from "../store/authStore";

export default function Home() {
  const router = useRouter();
  const setAuth = useAuthStore(s => s.setAuth);
  const [errors, setErrors] = useState<FormError>({});
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const { user, accessToken } = useAuthStore.getState();
  //   if (user && accessToken) router.push('/dashboard');
  // }, [router]);

  const validateForm = (email: string, password: string) => {
    const newErrors: FormError = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Only emails from approved domains are allowed.';
    if (!password) newErrors.password = 'Password is required';
    else if (
      !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~])(.{8,})$/.test(password)
    )
      newErrors.password = 'Must be 8+ characters, include a number, symbol, and capital letter';
    return newErrors;
  };

  const handleLogin = async (data: { email: string; password: string; remember?: boolean }) => {
    const validationErrors = validateForm(data.email, data.password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {

      // const response = await login(data.email, data.password);

      // const { user, accessToken, refreshToken, expiresIn, expiresAt } = response.data;

      // setAuth(
      //   {
      //     email: user.email,
      //     name: user.name,
      //     role: user.role,
      //     entityDetails: user.entityDetails,
      //   },
      //   accessToken,
      //   Number(expiresIn),
      //   new Date(expiresAt),
      //   refreshToken,
      // );
      customToast.success('Login successful');

      router.push('/auth/mfa');
      // router.push('/dashboard');
    } catch (error: unknown) {
      // Capture login failure event
      // handleApiError(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000)
    }
  };
  return (
    <AuthLayout
      formProps={
        <AuthForm
          type="signin"
          title="Login to your account"
          subtitle="Enter your details to login."
          buttonText="Login"
          showRememberMe={true}
          errors={errors}
          onSubmit={handleLogin}
          isLoading={isLoading}
        />
      }
    />
  );
}
