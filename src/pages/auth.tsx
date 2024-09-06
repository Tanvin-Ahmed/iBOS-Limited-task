import AuthPoster from "@/components/custom/auth/auth-poster";
import SignInForm from "@/components/custom/auth/sign-in-form";
import SignUpForm from "@/components/custom/auth/sign-up-form";
import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const { isSignUpPage, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/store");
    }
  }, [user, navigate]);

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
