import { IoStarSharp } from "react-icons/io5";

type RatingProps = {
  value: number;
  size?: number;
};

export function Rating({ value }: RatingProps) {
  return (
    <div className="flex gap-1 justify-end">
      <IoStarSharp size={20} className="text-yellow-300" />
      <span>{value}</span>
    </div>
  );
}
