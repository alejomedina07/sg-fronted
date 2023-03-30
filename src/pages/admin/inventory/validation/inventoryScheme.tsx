import * as Yup from 'yup';
import i18n from 'i18next';

export const inventoryScheme = Yup.object().shape({
    name: Yup.string().required('field_is_required'),
    description: Yup.string().required('field_is_required'),
    quantity: Yup.string().required('field_is_required'),
    status: Yup.string().required('field_is_required'),

});