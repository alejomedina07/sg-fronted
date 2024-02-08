import { SgButton } from '../../../../../components/form/button/SgButton';
import { t } from 'i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
} from '@mui/material';
import { SgTransition } from '../../../../../components/utils/dialogs/SgTransition';
import { SgDialogTitle } from '../../../../../components/utils/dialogs/SgDialogTitle';
import { SgInput } from '../../../../../components/form/SgInput';
import useSnackbar from '../../../../../store/hooks/notifications/snackbar/useSnackbar';
import { SgCheckbox } from '../../../../../components/form/SgCheckbox';
import {
  useAddQuestionMutation,
  useUpdateQuestionMutation,
} from '../../redux/api/surveyApi';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bodyQuestionScheme } from '../../validation/question/QuestionScheme';
import { SgSelect } from '../../../../../components/form/SgSelect';
import { QUESTIONS_TYPE } from '../../const/General';
import { FormOptionQuestion } from './formOptionQuestion';

interface FormQuestionComponentProps {
  open: boolean;
  handleClose: () => void;
  question: any;
  categories: any[];
}

export const FormQuestionComponent = (props: FormQuestionComponentProps) => {
  const { open, handleClose, question, categories } = props;
  const [optionsQuestion, setOptionsQuestion] = useState<any>([]);
  const { openSnackbarAction } = useSnackbar();
  const [addQuestion] = useAddQuestionMutation();
  const [updateQuestion] = useUpdateQuestionMutation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(bodyQuestionScheme),
  });

  useEffect(() => {
    if (question?.id) reset({ question: question.row });
  }, [question]);

  const submitForm = async (data: any) => {
    try {
      let res;
      if (data.question.id) await updateQuestion(data).unwrap();
      else res = await addQuestion(data).unwrap();
      openSnackbarAction({
        // message: `${t('created')}`,
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      reset();
      handleClose();
    } catch (e: any) {
      const message = e?.data?.message || `${t('error_save')}`;
      openSnackbarAction({ message, type: 'error' });
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={'md'}
      TransitionComponent={SgTransition}
    >
      <SgDialogTitle id={'survey-dialog'} onClose={handleClose}>
        {t('create_question')}
      </SgDialogTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        <DialogContent dividers>
          <div className="flex flex-row items-center">
            <SgSelect
              key="category-select"
              control={control}
              name="question.categoryId"
              label={t('category')}
              fieldId="id"
              fieldLabel="name"
              className="flex-1 !m-3"
              size="small"
              errors={errors}
              defaultValue={question?.categoryId || ''}
              options={categories.filter((item) => item.status)}
              disabled={typeof question?.id === 'number' || false}
            />
            <SgSelect
              key="question-type-select"
              control={control}
              name="question.type"
              label={t('type')}
              fieldId="id"
              fieldLabel="name"
              className="flex-1 !m-3"
              size="small"
              errors={errors}
              defaultValue={question?.type || ''}
              options={QUESTIONS_TYPE}
              disabled={typeof question?.id === 'number' || false}
            />
          </div>
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="question.name"
              control={control}
              errors={errors}
              label={t('name')}
              required
              size="small"
            />
            {/* <SgCheckbox label={t('status')} name="status" /> */}
            <SgCheckbox
              label={t('status')}
              name="question.status"
              control={control}
            />
          </div>
          <div className="flex flex-row items-center">
            <SgInput
              className="flex-1 !m-3"
              name="question.description"
              control={control}
              errors={errors}
              label={t('description')}
              required
              rows={3}
              size="small"
            />
          </div>
          <Divider />

          {optionsQuestion.map((item: any, index: number) => {
            return (
              <FormOptionQuestion
                key={`FormOptionQuestion-${index}`}
                index={index}
                control={control}
                errors={errors}
              />
            );
          })}
          <Divider />
          {!question?.id && (
            <div className="flex items-center flex-row my-2">
              <span className="font-bold text-lg"> {t('options')} </span>
              <span className="flex-1"></span>
              <Button
                variant="outlined"
                color="info"
                onClick={() =>
                  setOptionsQuestion([
                    ...optionsQuestion,
                    optionsQuestion.length + 1,
                  ])
                }
                className="mx-4"
              >
                {t('add_option')}
              </Button>
            </div>
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
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label={t('save')}
            // sending={isLoading}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};
