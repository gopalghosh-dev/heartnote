import Link from "next/link";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AuthCard from "@/components/Auth/AuthCard";
import LoginForm from "@/components/Auth/LoginForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your Heartnote account",
};

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <section className="grid h-dvh place-items-center px-4">
      <AuthCard
        title="Welcome back"
        description="Sign in to continue to Heartnote"
        footer={
          <span>
            Don&apos;t have an account?{" "}
            <Link
              href={"/register"}
              className="font-medium text-foreground underline-offset-4 hover:underline">
              Sign up
            </Link>
          </span>
        }>
        <LoginForm />
      </AuthCard>
    </section>
  );
};

export default LoginPage;
