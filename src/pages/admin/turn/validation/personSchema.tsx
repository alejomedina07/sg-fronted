import * as Yup from 'yup';
import i18next from '../../../../config/i18n/i18n';

export const PersonSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  document: Yup.string().required(`${i18next.t('field_is_required')}`),
  name: Yup.string().required(`${i18next.t('field_is_required')}`),
});
