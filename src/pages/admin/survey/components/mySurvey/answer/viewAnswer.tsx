import {
  useGetSurveyAnswerGeneralQuery,
  useGetSurveyAnswerQuery,
} from '../../../redux/api/surveyApi';
import { SgTransition } from '../../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../../components/utils/dialogs/SgDialogTitle';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PreviewCategories } from '../../shared/previewCategories';
import { useEffect, useState } from 'react';
import { SurveyHeader } from '../../shared/SurveyHeader';

interface ViewAnswerProps {
  survey: any;
  open: boolean;
  handleClose: () => void;
  general?: boolean;
}

export const ViewAnswer = (props: ViewAnswerProps) => {
  const { survey, open, handleClose, general } = props;
  const [surveyComplete, setSurveyComplete] = useState<any>();
  const { t } = useTranslation();
  const { data } = useGetSurveyAnswerQuery(survey?.idSurveyAnswer, {
    skip: !survey?.idSurveyAnswer,
  });

  const { data: surveyGeneral } = useGetSurveyAnswerGeneralQuery(survey?.id, {
    skip: !survey?.id || !general,
  });

  useEffect(() => {
    if (data?.data?.survey) setSurveyComplete(data.data.survey);
    if (surveyGeneral?.data) setSurveyComplete(surveyGeneral.data);
  }, [data, surveyGeneral]);

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'survey-dialog'} onClose={handleClose}>
        {t('view_survey')}
      </SgDialogTitle>
      <DialogContent dividers>
        {!!surveyComplete?.surveyCategories?.length && (
          <>
            {/* <div className="flex flex-col items-center"> */}
            {/*   <span className="text-center text-3xl mb-4 font-bold"> */}
            {/*     {surveyComplete.name} */}
            {/*   </span> */}
            {/*   <span> {surveyComplete.description} </span> */}
            {/* </div> */}
            <SurveyHeader
              name={surveyComplete.name}
              description={surveyComplete.description}
            />
            <PreviewCategories
              general={general}
              categories={surveyComplete.surveyCategories.map(
                (item: any) => item.category
              )}
              answers={surveyComplete?.answers || null}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="warning"
          onClick={handleClose}
          className="mx-4"
        >
          {t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
