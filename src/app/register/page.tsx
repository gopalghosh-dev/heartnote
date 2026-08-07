import Link from "next/link";
import { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import AuthCard from "@/components/Auth/AuthCard";
import RegisterForm from "@/components/Auth/RegisterForm";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your Heartnote account",
};

const RegisterPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <section className="grid h-dvh place-items-center px-4">
      <AuthCard
        title="Create your account"
        description="Join Heartnote and start writing"
        footer={
          <span>
            Already have an account?{" "}
            <Link
              href={"/login"}
              className="font-medium text-foreground underline-offset-4 hover:underline">
              Sign in
            </Link>
          </span>
        }>
        <RegisterForm />
      </AuthCard>
    </section>
  );
};

export default RegisterPage;
