import * as Yup from 'yup';
import { t } from 'i18next';

export const AnswerScheme = Yup.object().shape({
  questionId: Yup.number(),
  // value: Yup.number(),
  value: Yup.mixed()
    .required(`${t('field_is_required')}`)
    .test('is-valid-value', `${t('incorrect_field')}`, function (value) {
      const isNumber = typeof value === 'number' && value > 0;
      const isString = typeof value === 'string' && value.length > 0;
      const isArray =
        Array.isArray(value) &&
        value.length > 0 &&
        value.every((item) => typeof item === 'number');

      return isNumber || isString || isArray;
    }),
  surveyId: Yup.number(),
  // name: Yup.string().required(`${t('field_is_required')}`),
  // description: Yup.string(),
  // status: Yup.boolean(),
});

export const AnswerSurveyScheme = Yup.object().shape({
  id: Yup.number(),
  comment: Yup.string().required(`${t('field_is_required')}`),
  answers: Yup.array().of(AnswerScheme),
});
