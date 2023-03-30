import * as Yup from 'yup';
import i18n from 'i18next';

export const expenseScheme = Yup.object().shape({
    name: Yup.string().required('field_is_required'),
    description: Yup.string().required('field_is_required'),
    amount: Yup.string().required('field_is_required'),

});
