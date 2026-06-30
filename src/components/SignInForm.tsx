"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Typography } from "@/components/ui/typography";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function signInWithEmail(data: z.infer<typeof formSchema>) {
    await authClient.signIn.email(
      { ...data, callbackURL: "/availability" },
      {
        onError: () => {
          toast.error("Email sign-in failed. Please try again.", { position: "top-right" });
        },
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
      },
    );
  }

  async function signInWithGoogle() {
    await authClient.signIn.social(
      { provider: "google" },
      {
        onError: () => {
          toast.error("Google sign-in failed. Please try again.", { position: "top-right" });
        },
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
      },
    );
  }

  return (
    <>
      <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(signInWithEmail)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-start">
                    <Mail className="text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-start">
                    <Lock className="text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupButton size="icon-xs" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff /> : <Eye />}
                  </InputGroupButton>
                </InputGroup>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <div className="flex justify-between">
            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id="remember-me"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel htmlFor="remember-me">Remember me</FieldLabel>
                </Field>
              )}
            />
            <Link href="/" className="text-nowrap text-primary text-xs">
              Forgot password?
            </Link>
          </div>
        </FieldGroup>
        <Button type="submit" size="lg" className="font-semibold" disabled={isLoading}>
          {isLoading ? (
            <>
              Signing in...
              <Spinner data-icon="inline-end" />
            </>
          ) : (
            <>
              Sign in <ArrowRight />
            </>
          )}
        </Button>
      </form>
      <div className="flex items-center gap-4">
        <Separator className="flex-1" />
        <Typography variant="muted" className="whitespace-nowrap">
          or continue with
        </Typography>
        <Separator className="flex-1" />
      </div>
      <Button variant="outline" size="lg" disabled={isLoading} onClick={signInWithGoogle}>
        <FcGoogle /> Google
      </Button>
    </>
  );
}
