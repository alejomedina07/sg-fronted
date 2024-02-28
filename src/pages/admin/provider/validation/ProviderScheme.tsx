import * as Yup from 'yup';
import i18n, { t } from 'i18next';
import i18next from '../../../../config/i18n/i18n';

export const providerScheme = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string(),
  address: Yup.string().required(`${i18next.t('field_is_required')}`),
  phoneNumber: Yup.string()
    .required(`${i18next.t('field_is_required')}`)
    .min(
      10,
      `${i18n.t('field_min_not_correctly')}  (10 ${i18n.t(
        'min_characters'
      )} )  `
    )
    .max(
      10,
      `${i18n.t('field_max_not_correctly')}  (10 ${i18n.t(
        'max_characters'
      )} )  `
    ),
  email: Yup.string()
    .required(`${i18next.t('field_is_required')}`)
    .email(`${i18n.t('email_invalid')}`),
  documentTypeId: Yup.number().required(`${i18next.t('field_is_required')}`),
  document: Yup.string().required(`${i18next.t('field_is_required')}`),
  status: Yup.boolean(),
});
