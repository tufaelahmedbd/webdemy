import CoursesPage from "./courses";
import { getAllCourses } from "@/prisma/courses";

export default function HomePage({ courses }) {
  return (
    <div>
      <CoursesPage courses={courses} />
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
