import { useGetCategoriesByIdQuery } from '../../../../redux/api/surveyApi';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import { Divider } from '@mui/material';
import { PreviewCategories } from '../../../shared/previewCategories';

interface QuestionStepProps {
  categoriesSelected: any;
}

export const QuestionStep = (props: QuestionStepProps) => {
  const { categoriesSelected } = props;
  const { data } = useGetCategoriesByIdQuery(
    categoriesSelected.map((item: any) => item.id).join()
  );

  return (
    <>
      <Divider />
      <div className="flex flex-row items-center justify-center">
        <Typography variant="h5" gutterBottom className="!mt-4">
          {t('preview')}
        </Typography>
      </div>
      <Divider />
      {!!data?.data?.length && <PreviewCategories categories={data.data} />}
    </>
  );
};
