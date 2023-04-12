import { Autocomplete, TextField } from '@mui/material';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type AutocompleteOption = {
  label: string;
  value: string;
};

type AutocompleteFieldProps = {
  name: string;
  label: string;
  options: AutocompleteOption[];
  control: Control;
  defaultValue?: AutocompleteOption | null;
  errors?: FieldErrors;
  rules?: Record<string, unknown>;
};

export const SgAutocomplete = (props: AutocompleteFieldProps) => {
  const {
    name,
    label,
    options,
    control,
    defaultValue = null,
    errors = {},
    rules = {},
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value } }) => (
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          value={value}
          onChange={(_, data) => onChange(data)}
          onBlur={onBlur}
          renderInput={(params) => (
            <TextField
              className="flex-1 !m-3"
              {...params}
              label={label}
              error={Boolean(errors[name])}
              // helperText={errors[name]?.message}
            />
          )}
        />
      )}
    />
  );
};