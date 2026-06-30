import { redirect } from "next/navigation";

// TODO: different redirect if auth or not

export default function LandingPage() {
  redirect("/sign-in");
}
