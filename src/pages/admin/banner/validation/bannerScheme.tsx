import * as Yup from 'yup';
import i18next from '../../../../config/i18n/i18n';
import i18n from 'i18next';

export const bannerSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  name: Yup.string().required(`${i18next.t('field_is_required')}`),
  description: Yup.string().required('Description is required'),
  status: Yup.boolean(),
  file: Yup.mixed()
    .test('fileSize', 'The file is too large', (value: any) => {
      if (!value?.length) return true; // attachment is optional
      return value[0].size <= 2000000;
    }) // 2MB
    .test('fileType', 'Unsupported file format', (value: any) => {
      if (!value?.length) return true;
      return (
        value &&
        ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type)
      );
    }),
});
