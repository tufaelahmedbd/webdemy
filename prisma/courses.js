import prisma from "./prisma";
//C
//Get all courses from DB
export const getAllCourses = async () => {
  const courses = await prisma.course.findMany({});

  return courses;
};

//Get a single course from DB
export const getCourse = async (id) => {
  const course = await prisma.course.findUnique({
    where: { id },
  });

  return course;
};
