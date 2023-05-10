import * as Yup from 'yup';
import { t } from 'i18next';

export const inventoryScheme = Yup.object().shape({
  note: Yup.string().required(`${t('field_is_required')}`),
  increment: Yup.boolean(),
  inventoryId: Yup.number().required(`${t('field_is_required')}`),
  quantity: Yup.number().required(`${t('field_is_required')}`),
});
