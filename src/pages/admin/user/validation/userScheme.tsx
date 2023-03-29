import * as Yup from 'yup';
import { t }    from 'i18next';
import i18n from 'i18next';

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required('field_is_required'),
  lastName: Yup.string().required('field_is_required'),
  address: Yup.string().required('field_is_required'),
  bloodType: Yup.string(),
  phoneNumber: Yup.string()
    .required('field_is_required')
    .min(10, `${i18n.t('field_min_not_correctly')}  (10 ${i18n.t('min_characters')} )  `)
    .max(10, `${i18n.t('field_max_not_correctly')}  (10 ${i18n.t('max_characters')} )  `),
  email: Yup.string()
    .required('Email is required')
    .email( `${i18n.t('email_invalid')}` ),
  documentTypeId: Yup.number().required('field_is_required'),
  documentNumber: Yup.string().required('field_is_required'),
  statusId: Yup.number().required('field_is_required'),
  rolId: Yup.number().required('field_is_required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  passwordConfirm: Yup.string()
    .required('Confirm_Password_is_required')
    .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
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