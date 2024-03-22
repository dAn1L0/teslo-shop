import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";



export default async function ProfilePage() {

  const session = await auth();

  if (!session) {
    redirect("/");
    // redirect("/auth/login?returnTo=/profile");
  }

  return (
    <div>
      <Title title="Profile" />
      <pre>
        <code>{JSON.stringify(session.user, null, 2)}</code>
      </pre>
      <h4 className="text-xl my-10">{session.user.role}</h4>
    </div>
  );
}