import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

type AutocompleteProps = {
  name: string;
  label: string;
  options: any[];
  control: any;
  size: 'small' | 'medium' | undefined;
  optionValue: string;
  optionName: string;
  defaultValue?: any;
  errors?: any;
  // required?: any;
};

export const SgAutocomplete = (props: AutocompleteProps) => {
  const {
    name,
    label,
    options,
    control,
    size = 'small',
    optionValue,
    optionName,
    errors,
  } = props;

  return (
    <Controller
      // rules={{ required: required }}
      name={name}
      control={control}
      // defaultValue={
      //   defaultValue
      //     ? options.find((option) => option[optionValue] === defaultValue) || null
      //     : null
      // }
      render={({ field: { onChange, onBlur, value } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option: any) => option[optionName]}
          onChange={(_, data) => onChange(data ? data[optionValue] : null)}
          onBlur={onBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              size={size}
              error={Boolean(errors[name])}
              helperText={Boolean(errors[name]) && `${errors[name].message}`}
            />
          )}
          value={options.find((option) => option[optionValue] === value)}
          isOptionEqualToValue={(option, value) =>
            option[optionValue] === value[optionValue]
          }
        />
      )}
    />
  );
};
