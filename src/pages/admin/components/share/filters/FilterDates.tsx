import { t } from 'i18next';
import { SgSelect } from '../../../../../components/form/SgSelect';
import { useForm } from 'react-hook-form';
import { SgButton } from '../../../../../components/form/button/SgButton';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import DateFnsManager from '../../../../../services/utils/DateFnsManager';
const managerDate = new DateFnsManager();

const types = [
  { value: 'current_month', key: 'current_month' },
  { value: 'month', key: 'month' },
  { value: 'range', key: 'range' },
];

export const FilterDates = (props: any) => {
  const { onChange } = props;
  const [startDate, setStartDate] = useState<Date | null>();
  const [monthDate, setMonthDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();

  const {
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm();
  const type = watch('type');

  const handleChange = () => {
    console.log('handleChange', getValues());

    let filters = `?type=${type}`;
    let pass = false;
    console.log(123, filters);
    if (type == 'current_month') pass = true;
    else if (type == 'month' && monthDate) {
      filters += `&month=${managerDate.getFormatStandardMonth(monthDate)}`;
      pass = true;
    } else if (type == 'range' && startDate && endDate) {
      filters += `&start_date=${managerDate.getFormatStandard(startDate)}`;
      filters += `&end_date=${managerDate.getFormatStandard(endDate)}`;
      pass = true;
    }
    if (onChange && pass) onChange(filters);
  };

  return (
    <div className="flex flex-row items-center">
      <SgSelect
        key="documentTypeId-select"
        control={control}
        name="type"
        label={t('type')}
        defaultValue={'current_month'}
        fieldId="value"
        fieldLabel="key"
        className="flex-1 !m-3"
        size="small"
        errors={errors}
        options={types}
      />
      {type == 'range' && (
        <>
          <span className="flex-1 !m-3 border rounded border-gray-300 p-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}
              endDate={endDate}
              placeholderText="Seleccione inicio"
            />
          </span>

          <span className="flex-1 !m-3 border rounded border-gray-300 p-2">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Seleccione final"
            />
          </span>
        </>
      )}

      {type == 'month' && (
        <span className="flex-1 !m-3 border rounded border-gray-300 p-2">
          <DatePicker
            selected={monthDate}
            showMonthYearPicker
            onChange={(date) => setMonthDate(date)}
            placeholderText="Seleccione mes"
            dateFormat="MM/yyyy"
          />
        </span>
      )}

      <SgButton label={t('filter')} onClickAction={handleChange} />
    </div>
  );
};
