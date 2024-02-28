import * as Yup from 'yup';
import { t } from 'i18next';

export const paymentScheme = Yup.object().shape({
  reference: Yup.string().required(`${t('field_is_required')}`),
  method: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string(),
  providerId: Yup.number(),
  amount: Yup.string().required(`${t('field_is_required')}`),
});
