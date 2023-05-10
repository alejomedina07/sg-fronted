import * as Yup from 'yup';
import { t }    from 'i18next';

export const optionsListScheme = Yup.object().shape({
  name: Yup.string().required(`${t('field_is_required')}`),
});
