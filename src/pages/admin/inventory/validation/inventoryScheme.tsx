import * as Yup from 'yup';
import { t } from 'i18next';

export const inventoryScheme = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
  description: Yup.string().required(`${t('field_is_required')}`),
  // quantity: Yup.number().required(`${t('field_is_required')}`),
  statusId: Yup.number().required(`${t('field_is_required')}`),
});
