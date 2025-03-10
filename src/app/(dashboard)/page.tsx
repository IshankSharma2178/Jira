import { protect } from "@/features/auth/actions";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await protect();
  if (!user) redirect("/sign-in");

  return <div>This is our home page</div>;
}
