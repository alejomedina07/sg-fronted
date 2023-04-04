import * as Yup from 'yup';
import i18next  from '../../../../config/i18n/i18n';

export const expenseScheme = Yup.object().shape({
    name: Yup.string().required(`${i18next.t('field_is_required')}`),
    description: Yup.string().required(`${i18next.t('field_is_required')}`),
    amount: Yup.number().required(`${i18next.t('field_is_required')}`),

});
