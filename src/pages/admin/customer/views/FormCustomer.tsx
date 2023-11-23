import React, { useEffect, useState } from 'react';
import { t } from 'i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SgButton } from '../../../../components/form/button/SgButton';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { SgLink } from '../../../../components/form/button/SgLink';
import { SgInput } from '../../../../components/form/SgInput';
import useSnackbar from '../../../../store/hooks/notifications/snackbar/useSnackbar';
import { SgSelect } from '../../../../components/form/SgSelect';
import { BLOOD_TYPES } from '../../../../utils/consts/shared/bloodTypes';
import {
  useAddCustomerMutation,
  useUpdateCustomerMutation,
} from '../redux/api/customerApi';
import { customerSchema } from '../validation/customerSchema';
import { defaultValues } from '../helpers';
import DatePicker from 'react-datepicker';
import { Skeleton } from '@mui/material';

interface FormCustomerProps {
  customerEdit?: Customer;
}

export const FormCustomer = ({ customerEdit }: FormCustomerProps) => {
  const { customerId } = useParams();
  const [defaultValuesActive, setDefaultValuesActive] = useState<Customer>();
  const { openSnackbarAction } = useSnackbar();
  const navigate = useNavigate();
  const [addCustomer, { isLoading }] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [startDate, setStartDate] = useState<Date | null>();

  const {
    setValue,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Customer>({
    defaultValues: defaultValuesActive,
    resolver: yupResolver(customerSchema),
  });

  const handleChangeDate = (event: Date | null) => {
    setValue('birthDate', event);
    setStartDate(event);
  };

  useEffect(() => {
    if (customerId && customerEdit && customerId === `${customerEdit.id}`) {
      if (customerEdit.birthDate)
        setStartDate(new Date(customerEdit.birthDate));
      setDefaultValuesActive(customerEdit);
    } else {
      setDefaultValuesActive(defaultValues);
    }
  }, [customerId, customerEdit]);

  useEffect(() => {
    reset(defaultValuesActive);
  }, [defaultValuesActive, reset]);

  const submitForm = async (data: any) => {
    try {
      let res;
      if (data.id) {
        delete data.services;
        delete data.appointments;
        res = await updateCustomer(data).unwrap();
      } else res = await addCustomer(data).unwrap();
      openSnackbarAction({
        message: res.msg || `${t('created')}`,
        type: 'success',
      });
      navigate('/admin/customer');
    } catch (e) {
      openSnackbarAction({ message: `${t('error_save')}`, type: 'error' });
    }
  };

  return (
    <>
      <ViewTitle title={customerId ? t('edit_customer') : t('create_customer')}>
        <SgLink label={t('list_customer')} to="/admin/customer" />
      </ViewTitle>
      <form onSubmit={handleSubmit(submitForm)}>
        {/* name phoneNumber */}
        <div className="flex flex-col sm:flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="name"
            control={control}
            errors={errors}
            label={t('name')}
            required
            size="small"
          />

          <SgInput
            className="flex-1 !m-3"
            name="phoneNumber"
            control={control}
            errors={errors}
            label={t('phone_number')}
            required
            size="small"
          />
        </div>
        {/* documentType document */}
        <div className="flex flex-col sm:flex-row items-center">
          <SgSelect
            key="documentTypeId-select"
            control={control}
            name="documentTypeId"
            label={t('document_type')}
            defaultValue={customerEdit?.documentTypeId ?? ''}
            required
            fieldId="id"
            fieldLabel="name"
            fieldDescription="description"
            className="flex-1 !m-3"
            size="small"
            errors={errors}
            list="documentType"
          />
          <SgInput
            className="flex-1 !m-3"
            name="document"
            control={control}
            errors={errors}
            label={t('document_number')}
            required
            size="small"
          />
        </div>
        {/* statusId bloodType */}
        <div className="flex flex-col sm:flex-row items-center">
          <SgSelect
            key="filter-field-select"
            control={control}
            name="statusId"
            label={t('status')}
            defaultValue={customerEdit?.statusId ?? ''}
            required
            fieldId="id"
            fieldLabel="name"
            className="flex-1 !m-3"
            size="small"
            errors={errors}
            list="statusCustomer"
          />
          <SgSelect
            key="bloodType-select"
            control={control}
            name="bloodType"
            label={t('blood_type')}
            defaultValue={customerEdit?.bloodType ?? null}
            fieldId="value"
            fieldLabel="value"
            className="flex-1 !m-3"
            size="small"
            errors={errors}
            options={BLOOD_TYPES}
          />
        </div>
        {/* address */}
        <div className="flex flex-col sm:flex-row items-center">
          <SgInput
            className="flex-1 !m-3"
            name="address"
            control={control}
            errors={errors}
            label={t('address')}
            required
            size="small"
          />
          <span className="flex-1 !m-3 border rounded border-gray-300 pr-2">
            <DatePicker
              selected={startDate}
              onChange={handleChangeDate}
              placeholderText={`${t('birth_date')}`}
              className="m-2 w-full"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              locale="es"
            />
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <SgInput
            rows={4}
            className="flex-1 !m-3"
            name="description"
            control={control}
            errors={errors}
            label={t('note')}
            size="small"
          />
        </div>
        <div className="mt-4 mb-4 flex flex-col sm:flex-row items-end justify-end">
          <SgButton
            variant="contained"
            color="primary"
            type="submit"
            label={t('save')}
            sending={isLoading}
          />
        </div>
      </form>
    </>
  );
};
