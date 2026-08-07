"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "@/components/shadcnui/button";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/shadcnui/field";
import { Input } from "@/components/shadcnui/input";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type LoginValues } from "@/lib/zodSchema";

const LoginForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  });

  const onSubmit = async (values: LoginValues) => {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message ?? "Invalid email or password");
      return;
    }

    toast.success("Welcome back!");
    router.push("/");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate>
      <div className="flex flex-col gap-4">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="email"
                placeholder="you@example.com"
                type="email"
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Password</FieldLabel>

              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                autoComplete="current-password"
                placeholder="••••••••"
                type="password"
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button
          type="submit"
          size={"lg"}
          disabled={isSubmitting}>
          {isSubmitting && (
            <Loader2
              className="animate-spin"
              aria-hidden="true"
            />
          )}
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
