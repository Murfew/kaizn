import Link from "next/link";
import SignInForm from "@/components/SignInForm";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

export default function SignInPage() {
  return (
    <>
      <div className="mb-8 flex flex-col gap-2 text-center">
        <Typography variant="h1" as="h2">
          Welcome back
        </Typography>
        <Typography variant="lead">Enter your details to manage your schedule.</Typography>
      </div>
      <Card className="p-8 pt-10 shadow-md">
        <CardContent className="flex flex-col gap-6">
          <SignInForm />
        </CardContent>
      </Card>
      <Typography className="mt-2 text-center">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-primary">
          Sign up
        </Link>
      </Typography>
    </>
  );
}
