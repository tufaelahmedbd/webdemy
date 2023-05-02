import prisma from "./prisma";

//Get all courses
export const getAllCourses = async () => {
  const courses = await prisma.course.findMany({});
  return courses;
};

//Get a single course
export const getCourse = async (id) => {
  const course = await prisma.course.findUnique({
    where: { id: id },
  });
};
