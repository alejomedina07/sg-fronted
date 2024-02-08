interface SurveyHeaderProps {
  name: string;
  description: string;
}
export const SurveyHeader = (props: SurveyHeaderProps) => {
  const { name, description } = props;
  return (
    <div className="flex flex-col items-center">
      <span className="text-center text-3xl mb-4 font-bold">{name}</span>
      <span> {description} </span>
    </div>
  );
};
