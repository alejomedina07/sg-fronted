import * as Yup from 'yup';
import { t }    from 'i18next';

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required(`${t('field_is_required')}`),
  lastName: Yup.string().required(`${t('field_is_required')}`),
  address: Yup.string().required(`${t('field_is_required')}`),
  bloodType: Yup.string(),
  phoneNumber: Yup.string()
    .required(`${t('field_is_required')}`)
    .min(10, `${t('field_min_not_correctly')}  (10 ${t('min_characters')} )  `)
    .max(10, `${t('field_max_not_correctly')}  (10 ${t('max_characters')} )  `),
  email: Yup.string()
    .required(`${t('field_is_required')}`)
    .email( `${t('email_invalid')}` ),
  documentTypeId: Yup.number().required(`${t('field_is_required')}`),
  documentNumber: Yup.string().required(`${t('field_is_required')}`),
  statusId: Yup.number().required(`${t('field_is_required')}`),
  rolId: Yup.number().required(`${t('field_is_required')}`),
  password: Yup.string()
    .required(`${t('field_is_required')}`)
    .min(6, `${t('min_password')}`)
    .max(40, `${t('max_password')}`),
  passwordConfirm: Yup.string()
    .required(`${t('field_is_required')}`)
    .oneOf([Yup.ref('password'), ''], `${t('confirm_password')}`),
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