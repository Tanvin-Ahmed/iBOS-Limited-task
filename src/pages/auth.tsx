import AuthPoster from "@/components/custom/auth/auth-poster";
import SignInForm from "@/components/custom/auth/sign-in-form";

const AuthPage = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <SignInForm />
      <AuthPoster />
    </section>
  );
};

export default AuthPage;
