interface SummaryProps {
  overview: string | null | undefined;
  characterLength: number;
}

const Summary = ({ overview, characterLength }: SummaryProps) => {
  const truncate = (overview: string | null | undefined) => {
    if (overview && overview.length > characterLength) {
      return overview.substring(0, characterLength) + "......";
    }

    return overview;
  };

  return <>{truncate(overview)}</>;
};

export default Summary;
