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
  email: z.string().email({ message: "Please enter your email" }),
  password: z.string().min(1, { message: "Please enter your password" }),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must agree to continue",
  }),
});

const SignInForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  // location that user go after login
  const from = location.state?.from?.pathname || "/";

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
    navigate(from);
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="sm:w-[70%] p-4 w-full bg-gray-50 rounded space-y-8">
        <div>
          <h1 className="sm:text-5xl text-3xl font-semibold">Welcome back!</h1>
          <p className="text-muted-foreground">
            Enter your Credentials to access your account
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
          >
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
              Submit
            </Button>
          </form>
        </Form>

        <div className="flex flex-row justify-center items-center gap-2 w-full overflow-hidden">
          <Separator className="w-full h-0.5 block" /> or
          <Separator className="w-full h-0.5 block" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant={"outline"} className="w-full">
            <img src={google} alt="google" className="h-full mr-2" />
            Sing in with Google
          </Button>
          <Button variant={"outline"} className="w-full">
            <img src={apple} alt="google" className="h-full mr-2" />
            Sing in with Apple
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
