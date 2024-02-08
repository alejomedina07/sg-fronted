import { t } from 'i18next';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';
import React, { ReactNode } from 'react';
import { QuestionType } from '../mySurvey/answer/formAnswerSurvey';

interface QuestionHeaderProps {
  question: any;
  numberQuestion: number;
  children?: ReactNode;
  answers?: any[];
  general?: boolean;
}

export const QuestionHeader = (props: QuestionHeaderProps) => {
  const { question, numberQuestion, children, answers, general } = props;
  return (
    <Paper elevation={3} className="w-full flex-1 p-4 m-2">
      <div className="flex flex-col items-start">
        <span>
          {t('question')} # {numberQuestion} : <b>{question.name}</b>
        </span>
        <Typography className="!pl-4 !mb-2">
          {t('description')}:<b> {question.description} </b>
        </Typography>
        {!!answers?.length &&
          question.type === QuestionType.TextChoice &&
          !general && (
            <div className="flex flex-col w-full p-4 border-4 border-blue-500 mb-1 rounded">
              <b>{t('answer')}:</b>
              <span>
                {
                  answers.find((item) => item.questionId === question.id)
                    ?.textAnswer
                }
              </span>
            </div>
          )}
        {question.type !== QuestionType.TextChoice && (
          <Typography className="!pl-4">
            <b> {t('options')}: </b>
          </Typography>
        )}
        {children}
      </div>
    </Paper>
  );
};
