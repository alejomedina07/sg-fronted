import * as Yup from 'yup';
import i18next from '../../../../config/i18n/i18n';


export const appointmentSchema = Yup.object().shape({
  name: Yup.string().required(`${i18next.t('field_is_required')}`),
  duration: Yup.number().required(`${i18next.t('field_is_required')}`),
  description: Yup.string(),
  appointmentTypeId: Yup.number().required(`${i18next.t('field_is_required')}`),
  customerId: Yup.number().optional(),
});
