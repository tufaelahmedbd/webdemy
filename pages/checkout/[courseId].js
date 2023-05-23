import SectionHeader from "@/components/SectionHeader";
import { getCourse } from "@/prisma/courses";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
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
