import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <div className=" min-h-screen">
      <div className="wrapper flex-col items-center text-center py-10 ">
        <h6 className="uppercase font-semibold  tracking-widest text-sm">
          About
        </h6>
        <h1 className="text-4xl uppercase font-bold py-3">Learn about us.</h1>
      </div>
      <div className="wrapper flex flex-row items-start mt-10">
        <div className="left px-3 pt-5 w-1/2">
          <h1 className="uppercase font-semibold  tracking-widest text-sm">
            Why select us?
          </h1>
          <h2 className="text-4xl uppercase font-bold py-3 ">
            Learn something worthwhile and apply it to elevate your abilities.
          </h2>
          <p className="text-xl">
            Our online courses are highly regarded in the industry thanks to our
            professional and experienced trainers. Our trainers bring a wealth
            of knowledge and expertise to our courses, using a variety of
            teaching methods to ensure each learner is able to understand and
            apply the concepts covered. They maintain a high level of
            professionalism in their interactions with learners, creating a
            positive and supportive learning environment.
            <br />
            <br /> By choosing our online courses, learners can benefit from the
            convenience of online learning and the expertise of our trainers.
            Our courses are designed to provide learners with the practical
            knowledge, skills, and experience needed to advance their careers
            and achieve their learning goals. With our professional trainers and
            high-quality courses, learners can be confident in their ability to
            succeed.
          </p>
        </div>
        <div className="right  px-3 pt-5">
          <Link href="/courses">See Courses</Link>
        </div>
      </div>
    </div>
  );
}
