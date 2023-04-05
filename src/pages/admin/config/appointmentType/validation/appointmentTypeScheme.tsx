import * as Yup from 'yup';
import { t }    from 'i18next';

export const appointmentTypeScheme = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string().required(`${t('field_is_required')}`),
  status: Yup.string().required(`${t('field_is_required')}`),

});