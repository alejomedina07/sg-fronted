import * as Yup from 'yup';
import { t } from 'i18next';

export const surveyScheme = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string(),
  status: Yup.boolean(),
});
