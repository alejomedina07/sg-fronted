import { SgLink } from '../../../../components/form/button/SgLink';
import { ViewTitle } from '../../components/share/title/ViewTitle';
import { useTranslation } from 'react-i18next';
import { ListMySurvey } from '../components/mySurvey/listMySurvey';

export const ListSurvey = () => {
  const { t } = useTranslation();

  return (
    <>
      <ViewTitle title={t('list_survey')}>
        <SgLink label={t('create_survey')} to="/admin/survey/create" />
      </ViewTitle>
      <ListMySurvey />
    </>
  );
};
