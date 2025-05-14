import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { SocialLoginButtons } from "../components/SocialLoginButtons";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import { AuthContext } from "../AuthContext.js";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Login() {
  const { login, setIsHeader } = useContext(AuthContext);

  setIsHeader(false);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return true;
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    return true;
  };

  const onSubmit = (data) => {
    // Clear previous errors
    setLoginError("");

    // Manual validation
    const emailValidation = validateEmail(data.email);
    const passwordValidation = validatePassword(data.password);

    if (emailValidation !== true) {
      form.setError("email", { type: "manual", message: emailValidation });
      return;
    }

    if (passwordValidation !== true) {
      form.setError("password", {
        type: "manual",
        message: passwordValidation,
      });
      return;
    }

    // If validation passes, attempt login
    const result = login(data);
    if (result.success) {
      navigate("/admin");
    } else {
      setLoginError(result.message || "Invalid email or password");
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8"
      style={{
        backgroundImage:
          "url(https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/70 to-black/40"></div>

      <Card className="w-full max-w-md relative z-10 bg-black/80 border-gray-800 shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-1 bg-red-600 rounded-full"></div>
          </div>
          <CardTitle className="text-3xl font-bold text-center text-white">
            Login
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loginError && (
            <Alert
              variant="destructive"
              className="mb-4 bg-red-900/40 border-red-800 text-red-200"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        type="email"
                        className="bg-gray-900/60 border-gray-700 text-white"
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          const validation = validateEmail(e.target.value);
                          if (validation !== true) {
                            form.setError("email", {
                              type: "manual",
                              message: validation,
                            });
                          } else {
                            form.clearErrors("email");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        type="password"
                        className="bg-gray-900/60 border-gray-700 text-white"
                        {...field}
                        onBlur={(e) => {
                          field.onBlur();
                          const validation = validatePassword(e.target.value);
                          if (validation !== true) {
                            form.setError("password", {
                              type: "manual",
                              message: validation,
                            });
                          } else {
                            form.clearErrors("password");
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-medium text-gray-300">
                        Remember me
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <SocialLoginButtons className="mt-6" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-red-500 hover:text-red-400 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
