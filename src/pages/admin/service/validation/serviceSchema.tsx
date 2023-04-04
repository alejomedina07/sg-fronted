import * as Yup from 'yup';
import i18next from '../../../../config/i18n/i18n';

export const serviceSchema = Yup.object().shape({
 // created_at: Yup.date().required(`${i18next.t('field_is_required')}`),
  amount: Yup.string().required(`${i18next.t('field_is_required')}`),
  description: Yup.string().required(`${i18next.t('field_is_required')}`),
});
