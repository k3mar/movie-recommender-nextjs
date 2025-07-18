"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";

const SignIn = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center ">
      <div className="w-100 rounded-lg border-2 border-indigo-500/75 p-4 shadow-lg shadow-cyan-500/50">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default SignIn;
