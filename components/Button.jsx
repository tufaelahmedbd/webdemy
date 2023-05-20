import Link from "next/link";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva("rounded-lg transtion-colors duration-300", {
  variants: {
    color: {
      primary: "bg-black text-white hover:bg-gray-700",
      secondary: "bg-white text-black hover:bg-gray-200",
      danger: "bg-rose-500 text-white hover:bg-rose-600",
    },
    size: {
      default: "py-3 px-6",
      full: "",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "default",
  },
});

export default function Button({ href, placeholder, color, size }) {
  return (
    <Link className={clsx(buttonVariants({ color, size }))} href={href}>
      {placeholder}
    </Link>
  );
}
