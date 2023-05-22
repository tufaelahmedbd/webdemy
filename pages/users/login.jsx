import SectionHeader from "@/components/SectionHeader";
import { FcGoogle } from "react-icons/fc";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage({ session }) {
  const router = useRouter();
  const loginWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (session) {
      const destination = router.query.destination || "/users/profile";

      router.replace(destination);
    }
  }, [router, session]);

  if (session) {
    return null;
  }

  if (!session) {
    return (
      <div className="wrapper py-10 min-h-screen">
        <SectionHeader
          span={"Login"}
          h2={"Get started with Google"}
          p={"Please login to continue our features!"}
        />

        <div className="flex justify-center">
          <button
            className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg mt-10 hover:bg-gray-700 duration-300"
            onClick={loginWithGoogle}
          >
            <span>
              <FcGoogle />
            </span>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const destination = context.query.destination || "/users/profile";
    return {
      redirect: {
        destination: destination,
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
