import * as Yup from 'yup';
import i18next from '../../../../config/i18n/i18n';

export const PersonSchema = Yup.object().shape({
  id: Yup.number().nullable(),
  document: Yup.string().required(`${i18next.t('field_is_required')}`),
  name: Yup.string()
    .required(`${i18next.t('field_is_required')}`)
    .test(
      'min-words',
      'El nombre debe tener minimo un nombre y dos apellidos.',
      (value) => {
        if (!value) return false; // Si no hay valor, falla la validación
        const words = value.trim().split(/\s+/); // Divide el valor en palabras
        return words.length >= 3; // Devuelve true si hay al menos tres palabras
      }
    ),
});
