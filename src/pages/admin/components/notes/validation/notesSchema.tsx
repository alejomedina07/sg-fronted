import * as Yup from 'yup';
import { t } from 'i18next';

export const notesSchema = Yup.object().shape({
  title: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string().required(`${t('field_is_required')}`),
});
