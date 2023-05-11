import Image from "next/image";

export default function CourseItem({ course }) {
  return (
    <div>
      <div>
        <Image
          src={course.cover}
          alt={course.title}
          height={640}
          width={360}
          priority
          className="w-auto h-auto"
        />
      </div>
    </div>
  );
}
