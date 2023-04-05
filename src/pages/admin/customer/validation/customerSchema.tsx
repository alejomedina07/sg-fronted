import * as Yup from 'yup';
import { t }    from 'i18next';

export const customerSchema = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
  phoneNumber: Yup.string()
    .required(`${t('field_is_required')}`)
    .min(10, `${t('field_min_not_correctly')}  (10 ${t('min_characters')} )  `)
    .max(10, `${t('field_max_not_correctly')}  (10 ${t('max_characters')} )  `),
  documentTypeId: Yup.number().required(`${t('field_is_required')}`),
  document: Yup.string().required(`${t('field_is_required')}`),
  statusId: Yup.number().required(`${t('field_is_required')}`),
  bloodType: Yup.string(),
  address: Yup.string().required(`${t('field_is_required')}`),
});
