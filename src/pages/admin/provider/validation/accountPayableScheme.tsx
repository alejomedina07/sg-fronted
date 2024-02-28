import * as Yup from 'yup';
import { t } from 'i18next';

export const accountPayableScheme = Yup.object().shape({
  reference: Yup.string(),
  description: Yup.string().required(`${t('field_is_required')}`),
  maxDateOfPay: Yup.date().required(`${t('field_is_required')}`),
  amount: Yup.string().required(`${t('field_is_required')}`),
});
