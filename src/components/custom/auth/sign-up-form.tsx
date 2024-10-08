"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthContext } from "@/context/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import google from "../../../assets/google.svg";
import apple from "../../../assets/apple.svg";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Please enter your email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must agree to continue",
  }),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, togglePage } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  // location that user go after login
  const from = location.state?.from?.pathname;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      agree: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values);
    navigate(from ?? "/store");
  };

  return (
    <div className="md:h-full h-screen flex justify-center items-center">
      <div className="sm:w-[70%] p-4 w-full bg-gray-50 rounded space-y-8">
        <div className="text-center space-y-1">
          <h2 className="text-xl mb-2 font-semibold">Welcome To</h2>
          <h1 className="text-4xl font-bold">
            Furni<span className="text-[#1E99F5]">Flex</span>
          </h1>
          <p className="text-muted-foreground">
            Signup for purchase your desire products
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
            <div className="grid grid-cols-2 gap-4 w-full">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password..."
                          {...field}
                          className="rounded-r-none"
                        />
                        <Button
                          size={"icon"}
                          className="rounded-l-none"
                          type="button"
                          variant={"outline"}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <a
                href="#"
                className="block text-blue-500 text-right font-semibold"
              >
                <small>Forgot password</small>
              </a>
            </div>
            <FormField
              control={form.control}
              name="agree"
              render={({ field }) => (
                <FormItem className="rounded-md border p-4">
                  <div className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the{" "}
                        <a href="#" className="underline">
                          Terms & Policy
                        </a>
                      </FormLabel>
                    </div>
                  </div>
                  <FormMessage className="text-[12px]" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>

        <div className="flex flex-row justify-center items-center gap-2 w-full overflow-hidden">
          <Separator className="w-full h-0.5 block" /> or
          <Separator className="w-full h-0.5 block" />
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
          <Button variant={"outline"} className="w-full">
            <img src={google} alt="google" className="h-full mr-2" />
            Sing up with Google
          </Button>
          <Button variant={"outline"} className="w-full">
            <img src={apple} alt="google" className="h-full mr-2" />
            Sing up with Apple
          </Button>
        </div>
        <p className="text-center font-semibold">
          Have an account?{" "}
          <span className="text-[#1E99F5] cursor-pointer" onClick={togglePage}>
            Sing In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
