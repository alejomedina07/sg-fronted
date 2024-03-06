import { t } from 'i18next';
import { SgLink } from '../../../../components/form/button/SgLink';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import React, { useEffect, useState } from 'react';
import {
  useGetMySurveysQuery,
  useGetSurveyCompleteQuery,
} from '../redux/api/surveyApi';
import UseAuth from '../../../public/auth/redux/hooks/useAuth';
import { Autocomplete, Chip, Paper, Skeleton, TextField } from '@mui/material';
import { FormAnswerSurvey } from '../components/mySurvey/answer/formAnswerSurvey';
import { SurveyHeader } from '../components/shared/SurveyHeader';

interface AnswerSurveyProps {
  idSurvey?: number;
}

export const AnswerSurvey = (props: AnswerSurveyProps) => {
  const { idSurvey } = props;
  const [idUser, setIdUser] = useState<number | undefined>(undefined);
  const { userConnected } = UseAuth();
  const [surveySelected, setSurveySelected] = useState<any | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<any>({
    startDate: new Date(),
    comment: '',
    answers: [], // Inicializar con un array vacío
  });

  useEffect(() => {
    if (userConnected?.id) setIdUser(userConnected.id);
  }, [userConnected]);

  useEffect(() => {
    if (idSurvey) setSurveySelected({ id: idSurvey });
  }, [idSurvey]);

  const { data } = useGetMySurveysQuery(
    { idUser: idUser || 0, list: false },
    { skip: !idUser }
  );

  const { data: surveyComplete, isLoading: loadingSurvey } =
    useGetSurveyCompleteQuery(surveySelected?.id || 0, {
      skip: !surveySelected?.id,
    });

  useEffect(() => {
    if (surveyComplete?.data?.surveyCategories) {
      const allQuestions = surveyComplete.data.surveyCategories.flatMap(
        (category: any) =>
          category.category.questions.map((question: any) => ({
            questionId: question.id,
            value: question.type === 'multiple_choice' ? [] : undefined, // Cambia null a []
          }))
      );

      setDefaultValues((prevDefaultValues: any) => ({
        ...prevDefaultValues,
        surveyId: surveyComplete.data.id,
        assignedToId: userConnected?.id || null,
        answers: allQuestions,
      }));
      setShowForm(true);
    }
  }, [surveyComplete]);

  console.log(789, surveySelected);

  return (
    <>
      <ViewTitle title={t('answer_survey')}>
        {!!idUser && <SgLink label={t('list_survey')} to="/admin/survey" />}
      </ViewTitle>

      {!surveySelected && (
        <div className="flex flex-row items-center">
          <Autocomplete
            className="!my-8 flex-1"
            id="fixed-tags-demo"
            value={surveySelected}
            onChange={(event, newValue) => {
              setSurveySelected(newValue);
            }}
            options={data?.data || []}
            getOptionLabel={(option: any) => option.name}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option: any, index) => (
                <Chip label={option.name} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('select_survey')}
                placeholder={t('select_survey') || ''}
              />
            )}
          />
        </div>
      )}

      {!!loadingSurvey && <Skeleton variant="rectangular" height={418} />}

      {!!surveyComplete?.data && (
        <Paper elevation={3} className="w-full flex-1 p-4">
          {/* <div className="flex flex-col items-start"> */}
          {/*   <span> {surveyComplete?.data.name} </span> */}
          {/*   <span> {surveyComplete?.data.description} </span> */}
          {/* </div> */}
          <SurveyHeader
            name={surveyComplete?.data.name}
            description={surveyComplete?.data.description}
          />
          {!!showForm && (
            <FormAnswerSurvey
              surveyComplete={surveyComplete.data}
              defaultValues={defaultValues}
            />
          )}
        </Paper>
      )}
    </>
  );
};
