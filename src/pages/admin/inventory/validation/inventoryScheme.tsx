import * as Yup from 'yup';
import i18next  from '../../../../config/i18n/i18n';

export const inventoryScheme = Yup.object().shape({
    name: Yup.string().required(`${i18next.t('field_is_required')}`),
    description: Yup.string().required(`${i18next.t('field_is_required')}`),
    quantity: Yup.number().required(`${i18next.t('field_is_required')}`),
    status: Yup.string().required(`${i18next.t('field_is_required')}`),

});