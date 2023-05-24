import SectionHeader from "@/components/SectionHeader";
import { getCourse } from "@/prisma/courses";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

//Stripe promise
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutPage({ course }) {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    courseTitle: course.title,
    price: course.price,
  });
  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name,
        email: session.user.email,
      }));
    }
  }, [session]);

  // Checkout handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const stripe = await stripePromise;

    //send a post req to the server
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: [course],
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      address: formData.address,
      courseTitle: formData.courseTitle,
      courseId: course.id,
    });

    //redirect to the stripe payment
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      console.log(result.error.message);
    }
  };
  return (
    <div className="wrapper my-10 min-h-screen">
      <SectionHeader
        span={"Checkout"}
        h2={"Kindly furnish your information."}
        p={"Please fill in the form to continue."}
      />

      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-10 w-full lg:w-[35rem] "
        >
          <div className="form-control flex flex-col mt-2">
            <label htmlFor="name" className=" cursor-pointer">
              Name
            </label>
            <input
              className=" outline-none border px-3 py-4 rounded-lg focus:border-gray-700"
              type="text"
              placeholder="Tuba"
              id="name"
              value={formData.name}
              readOnly
            />
          </div>

          <div className="form-control flex flex-col mt-2">
            <label htmlFor="email" className=" cursor-pointer">
              Email
            </label>
            <input
              className=" outline-none border px-3 py-4 rounded-lg focus:border-gray-700"
              type="email"
              placeholder="hello@gmail.com"
              id="email"
              value={formData.email}
              readOnly
            />
          </div>

          <div className="form-control flex flex-col mt-2">
            <label htmlFor="mobile" className=" cursor-pointer">
              Phone
            </label>
            <input
              className=" outline-none border px-3 py-4 rounded-lg focus:border-gray-700"
              type="tel"
              placeholder="+88017xxxxxxxx"
              id="mobile"
              required
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
          </div>

          <div className="form-control flex flex-col mt-2">
            <label htmlFor="address" className=" cursor-pointer">
              Address
            </label>
            <input
              className=" outline-none border px-3 py-4 rounded-lg focus:border-gray-700"
              type="text"
              placeholder="75,Syl, BD"
              id="address"
              required
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="form-control flex flex-col mt-2">
            <label htmlFor="courseTitle" className=" cursor-pointer">
              Course Title
            </label>
            <input
              className=" outline-none border px-3 py-4 rounded-lg focus:border-gray-700"
              type="text"
              placeholder="Advance DSA"
              id="courseTitle"
              value={formData.courseTitle}
              readOnly
            />
          </div>

          <div className="form-control flex flex-col mt-2">
            <label htmlFor="price" className=" cursor-pointer">
              Price (USD)
            </label>
            <input
              className=" outline-none border px-3 py-4 rounded-lg focus:border-gray-700"
              type="number"
              placeholder="$99"
              id="price"
              value={formData.price}
              readOnly
            />
          </div>

          <button
            role="link"
            type="submit"
            className=" bg-black text-white py-4 rounded-lg mt-5 hover:bg-gray-700 duration-300 uppercase"
          >
            Checkout to continue
          </button>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const course = await getCourse(query.courseId);

  const updatedCourse = {
    ...course,
    updatedAt: course.updatedAt.toString(),
    createdAt: course.createdAt.toString(),
  };

  return {
    props: {
      course: updatedCourse,
    },
  };
};
