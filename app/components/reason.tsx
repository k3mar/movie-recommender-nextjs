interface ReasonProps {
  reason: string;
}

const Reason = ({ reason }: ReasonProps) => {
  return (
    <div className="mr-auto ml-auto max-w-200 mt-5">
      <p>{reason}</p>
    </div>
  );
};

export default Reason;
