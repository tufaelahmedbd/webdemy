import Button from "@/components/Button";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
export default function SuccessPage({ session }) {
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/users/login");
    }
  }, [router, session]);
  if (!session) {
    return null;
  }

  return (
    <div className=" min-h-screen wrapper py-10">
      <div className="flex flex-col items-center gap-5">
        <h2 className="flex items-center gap-2 text-3xl">
          <span className=" text-emerald-500 ">
            <AiOutlineCheckSquare />
          </span>
          {"You've enrolled successfully!"}
        </h2>
        <Button href={"/orders"} placeholder={"Go to your Orders"} />
      </div>
    </div>
  );
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
