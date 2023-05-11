import CourseItem from "@/components/CourseItem";
import SectionHeader from "@/components/SectionHeader";
import { getAllCourses } from "@/prisma/courses";

export default function CoursesPage({ courses }) {
  return (
    <div className="wrapper py-10">
      <SectionHeader
        span="Courses"
        h2="Dive into our course offerings."
        p="Discover an unparalleled e-learning experience with our advanced
          platform, featuring comprehensive resources and innovative features."
      />

      <div className=" mt-10 flex flex-wrap gap-10">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const courses = await getAllCourses();
  const updatedCourses = courses.map((course) => ({
    ...course,
    updatedAt: course.updatedAt.toString(),
    createdAt: course.createdAt.toString(),
  }));

  return {
    props: {
      courses: updatedCourses,
    },
  };
};
