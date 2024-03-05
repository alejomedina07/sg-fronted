import { CircularProgress } from '@mui/material';

interface SgSpinnerProps {
  className?: string;
  text: string;
}

export const SgSpinner = (props: SgSpinnerProps) => {
  const { text, className = '' } = props;
  return (
    <div className={`flex flex-row items-center ${className}`}>
      <CircularProgress className="mr-2" size={'25pt'} />
      {text}
    </div>
  );
};
