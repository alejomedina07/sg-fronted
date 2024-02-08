import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import AccordionDetails from '@mui/material/AccordionDetails';
import { QuestionHeader } from '../../shared/questionHeader';
import { MultipleChoice } from './multipleChoice';
import { UniqueChoice } from './uniqueChoice';
import { TextAnswer } from './textAnswer';
import { useForm } from 'react-hook-form';
import useSnackbar from '../../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { SgButton } from '../../../../../../components/form/button/SgButton';
import { SgInput } from '../../../../../../components/form/SgInput';
import { AnswerSurveyScheme } from '../../../validation/survey/AnswerSurveyScheme';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAddAnswerMutation } from '../../../redux/api/surveyApi';
import { useNavigate } from 'react-router-dom';

interface FormAnswerSurveyProps {
  surveyComplete: any;
  defaultValues: any;
}

export enum QuestionType {
  MultipleChoice = 'multiple_choice',
  UniqueChoice = 'unique_choice',
  TextChoice = 'text_choice',
}

export const FormAnswerSurvey = (props: FormAnswerSurveyProps) => {
  const { surveyComplete, defaultValues } = props;
  const { openSnackbarAction } = useSnackbar();
  const [addAnswer] = useAddAnswerMutation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ defaultValues, resolver: yupResolver(AnswerSurveyScheme) });

  const submitForm = async (data: any) => {
    try {
      data.endDate = new Date();
      const res = await addAnswer(data).unwrap();
      openSnackbarAction({
        // message: `${t('created')}`,
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      if (defaultValues.assignedToId) navigate('/admin/survey');
      else reset(defaultValues);
    } catch (e: any) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {surveyComplete?.surveyCategories?.map(
        (surveyCategory: any, index: number) => (
          <Accordion
            key={`Accordion-${index}`}
            className="!bg-gray-100"
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <b>{t('category')} :</b> {surveyCategory.category.name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className="px-4 flex flex-col items-start">
                <Typography>{t('description')}:</Typography>
                <b> {surveyCategory.category.description} </b>
                {!!surveyCategory.category.questions?.length &&
                  !!defaultValues?.answers &&
                  surveyCategory.category.questions.map(
                    (question: any, indexQuestion: number) => {
                      const indexValues = defaultValues?.answers.findIndex(
                        (x: any) => x.questionId === question.id
                      );
                      return (
                        <QuestionHeader
                          key={`Accordion-${index}-question-${question.id}`}
                          question={question}
                          numberQuestion={indexQuestion + 1}
                        >
                          <span className="pr-5 flex-1 w-full">
                            {question.type === QuestionType.MultipleChoice && (
                              <MultipleChoice
                                name={`answers[${indexValues}].value`}
                                control={control}
                                errors={errors}
                                options={question.optionQuestions}
                                defaultValues={defaultValues}
                              />
                            )}

                            {question.type === QuestionType.UniqueChoice && (
                              <UniqueChoice
                                name={`answers[${indexValues}].value`}
                                control={control}
                                errors={errors}
                                options={question.optionQuestions}
                              />
                            )}

                            {question.type === QuestionType.TextChoice && (
                              <TextAnswer
                                name={`answers[${indexValues}].value`}
                                control={control}
                                errors={errors}
                              />
                            )}
                          </span>
                        </QuestionHeader>
                      );
                    }
                  )}
              </div>
            </AccordionDetails>
          </Accordion>
        )
      )}

      <div className="flex flex-row items-center">
        <SgInput
          className="flex-1 !m-3"
          name="comment"
          control={control}
          errors={errors}
          label={t('comment')}
          required
          rows={3}
          size="small"
        />
      </div>

      <div className="flex flex-row items-center justify-end">
        <SgButton
          variant="contained"
          color="primary"
          type="submit"
          label={t('save')}
          // sending={isLoading}
        />
      </div>
    </form>
  );
};
