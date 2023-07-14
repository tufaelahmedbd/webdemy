import { getSession, signOut } from "next-auth/react";
import { sendError } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { HiOutlineLogout } from "react-icons/hi";

export default function ProfilePage({ session }) {
  const router = useRouter();
  const logOut = async () => {
    try {
      await signOut("google");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!session) {
      router.replace("/users/login");
    }
  });

  if (!session) {
    return null;
  }
  return (
    <div
      data-aos="fade-down"
      data-aos-delay="500"
      data-aos-duration="1000"
      className="min-h-screen wrapper py-10 flex flex-col items-center"
    >
      <Image
        src={session.user.image}
        alt={session.user.name}
        height={50}
        width={50}
        className="h-24 w-24 rounded-full border border-black"
      />

      <h2 className=" text-2xl mt-2">
        <span>Welcome, </span>
        {session.user.name}
      </h2>

      <button
        className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg mt-5 hover:bg-gray-700 duration-300"
        onClick={logOut}
      >
        <span>
          <HiOutlineLogout />
        </span>{" "}
        Logout
      </button>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/users/login",
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
