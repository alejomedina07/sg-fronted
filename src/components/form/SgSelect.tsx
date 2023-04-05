import { useEffect, useState }                             from 'react';
import { FormControl, FormHelperText, InputLabel, Select } from '@mui/material';
import Typography                                          from '@mui/material/Typography';
import { Controller }                                      from 'react-hook-form';
import MenuItem                                            from '@mui/material/MenuItem';
import { SgSpinner }                                       from '../utils/spinner/SgSpinner';
import { useGetListByKeyQuery }                            from '../../store/apis/listApi';
import i18next                                             from '../../config/i18n/i18n';


export const SgSelect = (props: any) => {
  const {control, errors, fieldId, fieldLabel, fieldDescription, label, list, name, onChange, options, required = false, size, defaultValue, ...rest} = props
  // const { getListByKey, getMiscListDirectory } = useLists();

  const { data } = list ? useGetListByKeyQuery(list) : { data: null };

  const [selectOptions, setSelectOptions] = useState([])
  const [ready, setReady] = useState(false)
  const isError = Boolean(errors[name]);
  //Determinar si el label es muy largo para ubicarlo encima del select
  const _label = label.length > 50 ? "" : label
  const longLabel = label.length > 50 ? label : ""

  const optionsFromList = list ? data?.data : null

  useEffect(() => {
    if(options?.length) {
      setSelectOptions(options)
      setReady(true)
    }
  }, [options]);

  useEffect(() => {
    //Si no se ha cargado la lista o si no se esta enviando una lista personalizada de items
    if(!optionsFromList || options) return;

    setSelectOptions(optionsFromList)
    setReady(true)
  }, [optionsFromList])

  const labelId = `${name}-label`;

  const onValueChange = (e:any, field:any) => {
    if (onChange) {
      onChange(e.target.value);
    }
    // Asignar valor al controller
    field.onChange(e.target.value);
  };

  return (ready && (
    <FormControl {...rest} size={size} fullWidth error={isError}>
      {
        longLabel && <Typography >{longLabel}</Typography>
      }
      <InputLabel id={labelId}>{required ? `${_label}*` : _label}</InputLabel>
      <Controller
        rules={{ required: required }}
        render={({ field }) => (
          <>
            <Select
              {...field}
              onChange={(e) => onValueChange(e, field)}
              labelId={labelId}
              label={_label}
              error={isError}
              value={defaultValue !== undefined ? defaultValue : ""}
            >
              {!defaultValue &&
                <MenuItem value="">---------------------</MenuItem>
              }

              {
                selectOptions.map( (e,i) =>
                  <MenuItem key={`opt-${name}-${i}`} value={e[fieldId]}>
                    {e[fieldLabel]} { fieldDescription ? ` :: ${e[fieldDescription]}` : ''}
                  </MenuItem>
                )
              }
            </Select>
            {isError && <FormHelperText>{i18next.t('field_is_required')}</FormHelperText>}
          </>
        )}
        name={name}
        control={control}
      />
    </FormControl>
  )) || (<SgSpinner text="Cargando información..." />)
};
