import Aurora from "@/components/aurora";
import Hero from "@/components/hero";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        speed={2}
        className="absolute top-0 left-0 h-full w-full"
      />
      <Hero user={user} />
    </>
  );
}
