import * as Yup from 'yup';
import { t } from 'i18next';

export const optionQuestionScheme = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string(),
  status: Yup.boolean(),
});

export const questionScheme = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string(),
  status: Yup.boolean(),
  categoryId: Yup.number().required(`${t('field_is_required')}`),
});

export const bodyQuestionScheme = Yup.object().shape({
  question: questionScheme,
  options: Yup.array().of(optionQuestionScheme),
});
