import * as Yup from 'yup';
import i18n    from 'i18next';
import i18next from '../../../../config/i18n/i18n';

export const customerSchema = Yup.object().shape({
  name: Yup.string().required(`${i18next.t('field_is_required')}`),
  phoneNumber: Yup.string()
    .required(`${i18n.t('field_is_required')}`)
    .min(10, `${i18next.t('field_min_not_correctly')}  (10 ${i18n.t('min_characters')} )  `)
    .max(10, `${i18n.t('field_max_not_correctly')}  (10 ${i18n.t('max_characters')} )  `),
  documentTypeId: Yup.number().required(`${i18n.t('field_is_required')}`),
  document: Yup.string().required(`${i18n.t('field_is_required')}`),
  statusId: Yup.number().required(`${i18n.t('field_is_required')}`),
  bloodType: Yup.string(),
  address: Yup.string().required(`${i18n.t('field_is_required')}`),
});
