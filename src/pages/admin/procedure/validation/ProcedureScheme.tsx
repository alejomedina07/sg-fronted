import * as Yup from 'yup';
import { t } from 'i18next';

export const procedureScheme = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string().required(`${t('field_is_required')}`),
  status: Yup.boolean(),
  parent: Yup.boolean(),
});
