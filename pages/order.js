import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OrderPage({ session }) {
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace("/users/login");
    }
  }, [session, router]);

  if (!session) {
    return null;
  }

  return <div>OrderPage</div>;
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/users/login",
        permanent: true,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
