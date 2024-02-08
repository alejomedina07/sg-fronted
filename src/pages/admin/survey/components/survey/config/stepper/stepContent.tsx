import { Typography } from '@mui/material';
import { QuestionStep } from './questionStep';
import { CategoryStep } from './categoryStep';
import { InitConfigStep } from './initConfigStep';
import { useSurveyContext } from '../formSurveyConfig';

export const StepContentComponent: React.FC = () => {
  const { activeStep, control, errors, categoriesSelected } =
    useSurveyContext();

  switch (activeStep) {
    case 0:
      return <InitConfigStep control={control} errors={errors} />;
    case 1:
      return <CategoryStep />;
    case 2:
      return <QuestionStep categoriesSelected={categoriesSelected} />;
    default:
      return <Typography>Unknown Step</Typography>;
  }
};
