import AuthPoster from "@/components/custom/auth/auth-poster";
import SignInForm from "@/components/custom/auth/sign-in-form";
import SignUpForm from "@/components/custom/auth/sign-up-form";
import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

const AuthPage = () => {
  const { isSignUpPage } = useContext(AuthContext);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="my-10">
        {isSignUpPage ? <SignUpForm /> : <SignInForm />}
      </div>
      <AuthPoster />
    </section>
  );
};

export default AuthPage;
