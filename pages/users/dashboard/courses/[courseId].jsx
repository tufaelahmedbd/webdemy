import { getCourse } from "@/prisma/courses";

export default function CourseVideos({ course }) {
  return (
    <div className=" min-h-screen">
      <h1>{course.title}</h1>
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
