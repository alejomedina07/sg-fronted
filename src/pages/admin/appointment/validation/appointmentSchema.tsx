import * as Yup from 'yup';
import { t } from 'i18next';

export const appointmentSchema = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
  duration: Yup.number().required(`${t('field_is_required')}`),
  description: Yup.string(),
  appointmentTypeId: Yup.number().required(`${t('field_is_required')}`),
  customerId: Yup.number().optional(),
});
