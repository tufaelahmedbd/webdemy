import { currencyConverter } from "@/utils/currencyConverter";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";
import Button from "./Button";
import { motion } from "framer-motion";
import { getTransition, shatterUp } from "@/utils/motion";

export default function CourseItem({ course }) {
  return (
    <motion.div
      variants={shatterUp()}
      initial="from"
      whileInView="to"
      transition={getTransition(0, 1)}
      className="w-full lg:w-[30rem] shadow-md rounded-md overflow-hidden"
    >
      <div className=" w-full h-[25rem] lg:h-[20rem] overflow-hidden">
        <Image
          src={course.cover}
          alt={course.title}
          height={640}
          width={360}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 space-y-2">
        <h3 className=" text-3xl font-medium">{course.title}</h3>
        <p className="flex justify-between text-gray-500">
          <span>
            by{" "}
            <span className=" text-black font-semibold">
              {course.instructor}
            </span>
          </span>
          <span>
            Duration:{" "}
            <span className="text-black font-semibold">{course.duration}</span>
          </span>
        </p>

        <p className="flex justify-between text-gray-500">
          <span>
            Enrolled students :{" "}
            <span className=" text-black font-semibold">{course.students}</span>
          </span>
          <span className="flex gap-1 items-center">
            <AiOutlineStar className="text-black" />{" "}
            <span className="text-black font-semibold">{course.rating}</span>
          </span>
        </p>

        <p className=" text-gray-500">
          {course.description.substring(0, 100)}....
        </p>

        <div className="flex justify-between items-center">
          <p className="text-black font-semibold">
            {currencyConverter(course.price)}
          </p>
          <Button
            href={`/courses/${course.id}`}
            placeholder="View Details"
            color="primary"
            size="default"
          />
        </div>
      </div>
    </motion.div>
  );
}
