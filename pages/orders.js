import Button from "@/components/Button";
import prisma from "@/prisma/prisma";
import { currencyConverter } from "@/utils/currencyConverter";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OrderPage({ session, customer }) {
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace("/users/login");
    }
  }, [session, router]);

  if (!session && !customer) {
    return null;
  }

  return (
    <div className="wrapper py-10 min-h-screen">
      <h2 className=" text-3xl mb-5">
        You enrolled: {customer.orders.length} course
        {customer.orders.length > 1 ? "s" : ""}
      </h2>

      <div className="flex flex-wrap gap-10 ">
        {customer.orders.map((order) => (
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="1000"
            key={order.id}
            className=" shadow-md rounded-lg p-5 space-y-3"
          >
            <h2 className=" text-2xl font-bold">{order.courseTitle}</h2>
            <p className=" text-lg font-bold">
              {currencyConverter(order.amountTotal)}
            </p>
            <Button
              href={`/users/dashboard/courses/${order.courseId}`}
              placeholder={"Go to course"}
              size={"default"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  const customer = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
    include: {
      orders: true,
    },
  });

  const updatedCustomer = {
    ...customer,
    updatedAt: customer.updatedAt.toString(),
    createdAt: customer.createdAt.toString(),

    orders: customer.orders.map((order) => ({
      ...order,
      updatedAt: order.updatedAt.toString(),
      createdAt: order.createdAt.toString(),
    })),
  };

  if (!session || !customer) {
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
      customer: updatedCustomer,
    },
  };
};
