import * as Yup from 'yup';
import { t } from 'i18next';

export const expenseScheme = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string().required(`${t('field_is_required')}`),
  amount: Yup.number().required(`${t('field_is_required')}`),
  typeId: Yup.number().required(`${t('field_is_required')}`),
});
