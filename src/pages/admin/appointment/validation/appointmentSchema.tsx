import * as Yup from 'yup';

export const appointmentSchema = Yup.object().shape({
  name: Yup.string().required('field_is_required'),
  duration: Yup.number().required('field_is_required'),
  description: Yup.string(),
  appointmentTypeId: Yup.number(),
  customerId: Yup.number().nullable(),
});
