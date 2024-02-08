import {
  Autocomplete,
  Chip,
  Divider,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import { useSurveyContext } from '../formSurveyConfig';
import { useGetUserToListQuery } from '../../../../../appointment/redux/api/appointmentApi';

export const CategoryStep = () => {
  const {
    categories,
    setCategoriesSelected,
    categoriesSelected,
    setAnonymous,
    anonymous,
    setAllUsers,
    allUsers,
    setUsersSelected,
    usersSelected,
  } = useSurveyContext();

  const { data: users } = useGetUserToListQuery('');

  return (
    <>
      <Divider />
      <div className="flex flex-row items-center justify-center">
        <Typography variant="h5" gutterBottom className="!mt-4">
          {t('select_categories')}
        </Typography>
      </div>
      <Divider />
      <div className="!my-6 flex flex-row items-center">
        <span> {t('select_type_of_survey')} </span>
      </div>
      <div className="flex flex-row items-center">
        <span className="flex-1">
          <Switch
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
            name="anonymous"
          />
          {t('anonymous')}
        </span>
        {!anonymous && (
          <span className="flex-1">
            <Switch
              checked={allUsers}
              onChange={() => setAllUsers(!allUsers)}
              name="anonymous"
            />
            {t('all_users')}
          </span>
        )}
      </div>

      {!allUsers && !anonymous && (
        <div className="!mt-6 flex flex-row items-center">
          <Autocomplete
            multiple
            className="flex-1"
            id="fixed-tags-demo"
            value={usersSelected}
            onChange={(event, newValue) => {
              setUsersSelected([...newValue]);
            }}
            options={users?.data || []}
            getOptionLabel={(option: any) => option.name}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option: any, index) => (
                <Chip label={option.name} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('users')}
                placeholder={t('users') || ''}
              />
            )}
          />
        </div>
      )}

      <Autocomplete
        multiple
        className="!my-8"
        id="fixed-tags-demo"
        value={categoriesSelected}
        onChange={(event, newValue) => {
          setCategoriesSelected([...newValue]);
        }}
        options={categories?.data.filter((item: any) => item.status) || []}
        getOptionLabel={(option: any) => option.name}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option: any, index) => (
            <Chip label={option.name} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('categories')}
            placeholder={t('categories') || ''}
          />
        )}
      />
    </>
  );
};
