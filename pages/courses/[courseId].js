import Button from "@/components/Button";
import { getCourse } from "@/prisma/courses";
import { currencyConverter } from "@/utils/currencyConverter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CourseDetails({ course }) {
  const { data: session } = useSession();
  const router = useRouter();
  const handleEnroll = () => {
    if (session) {
      router.push(`/checkout/${course.id}`);
    } else {
      router.push(`/users/login?destination=/checkout/${course.id}`);
    }
  };
  return (
    <div className="wrapper py-10 min-h-screen">
      <div
        style={{ backgroundImage: `url(${course.cover})` }}
        className="w-full h-[23rem] lg:h-[33rem] bg-no-repeat bg-cover bg-center"
        data-aos="fade-down"
        data-aos-delay="500"
        data-aos-duration="1000"
      />
      <div className="mt-10 grid lg:grid-cols-2 lg:gap-10 lg:space-y-0">
        <div className=" space-y-2">
          <h2
            data-aos="fade-right"
            data-aos-delay="500"
            data-aos-duration="1000"
            className=" text-3xl font-semibold"
          >
            {course.title}
          </h2>
          <p
            data-aos="fade-right"
            data-aos-delay="500"
            data-aos-duration="1000"
          >
            <span className=" font-semibold">Instructor:</span>{" "}
            {course.instructor}
          </p>
          <p
            data-aos="fade-right"
            data-aos-delay="500"
            data-aos-duration="1000"
          >
            <span className=" font-semibold">Course Description:</span>{" "}
            {course.description}
          </p>
          <p
            data-aos="fade-right"
            data-aos-delay="500"
            data-aos-duration="1000"
          >
            <span className="font-semibold">Enrolled Students:</span>
            {course.students}
          </p>
        </div>

        <div className=" space-y-2">
          <p data-aos="fade-left" data-aos-delay="500" data-aos-duration="1000">
            <span className="font-semibold">Course Duration:</span>{" "}
            {course.duration}
          </p>
          <p data-aos="fade-left" data-aos-delay="500" data-aos-duration="1000">
            <span className="font-semibold">Rating:</span> {course.rating}
          </p>
          <p
            data-aos="fade-left"
            data-aos-delay="500"
            data-aos-duration="1000"
            className=" text-3xl font-semibold"
          >
            Price: {currencyConverter(course.price)}
          </p>
          <button
            data-aos="fade-left"
            data-aos-delay="500"
            data-aos-duration="1000"
            onClick={handleEnroll}
            className="bg-black text-white py-3 px-6 rounded-lg w-full hover:bg-gray-700 duration-300"
          >
            Enroll Now
          </button>
        </div>
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
