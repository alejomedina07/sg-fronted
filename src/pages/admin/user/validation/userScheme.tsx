import * as Yup from 'yup';
import i18next from '../../../../config/i18n/i18n';
import i18n from 'i18next';

export const userSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  firstName: Yup.string().required(`${i18next.t('field_is_required')}`),
  lastName: Yup.string().required(`${i18next.t('field_is_required')}`),
  address: Yup.string().required(`${i18next.t('field_is_required')}`),
  bloodType: Yup.string(),
  phoneNumber: Yup.string()
    .required(`${i18next.t('field_is_required')}`)
    .min(10, `${i18n.t('field_min_not_correctly')}  (10 ${i18n.t('min_characters')} )  `)
    .max(10, `${i18n.t('field_max_not_correctly')}  (10 ${i18n.t('max_characters')} )  `),
  email: Yup.string()
    .required(`${i18next.t('field_is_required')}`)
    .email( `${i18n.t('email_invalid')}` ),
  documentTypeId: Yup.number().required(`${i18next.t('field_is_required')}`),
  documentNumber: Yup.string().required(`${i18next.t('field_is_required')}`),
  statusId: Yup.number().required(`${i18next.t('field_is_required')}`),
  rolId: Yup.number().required(`${i18next.t('field_is_required')}`),
  password: Yup.string()
    .test('password-required', `${i18next.t('field_is_required')}`, function(value) {
    const id = this.parent.id;
    return !id ? Yup.string()
      .required(`${i18next.t('field_is_required')}`)
  .min(6, `${i18next.t('min_password')}`)
  .max(40, `${i18next.t('max_password')}`)
  .isValidSync(value)
  : true;
  }),
  // password: Yup.string()
  //   .required(`${i18next.t('field_is_required')}`)
  //   .min(6, `${i18next.t('min_password')}`)
  //   .max(40, `${i18next.t('max_password')}`),
  // passwordConfirm: Yup.string()
  //   .required(`${i18next.t('field_is_required')}`)
  //   .oneOf([Yup.ref('password'), ''], `${i18next.t('confirm_password')}`),
  passwordConfirm: Yup.string()
    .test('password-required', `${i18next.t('field_is_required')}`, function(value) {
      const id = this.parent.id;
      return !id ? Yup.string()
          .required(`${i18next.t('field_is_required')}`)
          .oneOf([Yup.ref('password'), ''], `${i18next.t('confirm_password')}`)
          .isValidSync(value)
        : true;
    }),
});

// firstName: string;
// lastName: string;
// address: string;
// phoneNumber: string;
// email: string;
// documentType: string;
// documentNumber: string;
// password: string;
// status: string;
// passwordConfirm?: string;