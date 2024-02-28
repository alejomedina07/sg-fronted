import { ViewTitle } from '../../../components/share/title/ViewTitle';
import { SgLink } from '../../../../../components/form/button/SgLink';
import { SgTable } from '../../../../../components/sgTable/SgTable';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetListByKeyQuery } from '../../../../../store/apis/listApi';
import { ColumnsOptions } from '../helpers/columsOptions';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useForms from '../../../../../store/hooks/form/useForms';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NotesButton } from '../../../components/notes/components/NotesButton';

export const ListOptions = () => {
  const { keyValue } = useParams();
  const navigate = useNavigate();
  const { setConfigFormEditAction } = useForms();
  const columnsOptions = ColumnsOptions();
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const { data, isLoading } = useGetListByKeyQuery(`${keyValue}&getAll=true`);

  const onClickView = (params: GridRenderCellParams) => {
    setConfigFormEditAction(params.row);
    navigate(`/admin/config/config-edit/${keyValue}/${params.row.id}`);
  };

  useEffect(() => {
    setColumns([
      ...columnsOptions,
      {
        field: 'actions',
        headerName: `${t('actions')}`,
        flex: 50,
        renderCell: (params: GridRenderCellParams) => {
          return (
            <div className="flex flex-row items-center">
              <Tooltip title={t('view')} placement="bottom" arrow>
                <IconButton
                  onClick={() => onClickView(params)}
                  aria-label="view"
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <NotesButton entityType="serviceId" entityId={params.row.id} />
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <ViewTitle title={`${t('list_of')} ${t(`${keyValue}`)}`}>
        {/* <SgLink label={t('create_appointment_type')} to="/admin/appointment-type/create"/> */}
        <SgLink
          label={t('back')}
          to={`/admin/config/config-options`}
          classes="!mr-4"
        />
        <SgLink label={t('add')} to={`/admin/config/config-form/${keyValue}`} />
      </ViewTitle>
      <div style={{ height: '70vh', width: '100%' }}>
        <SgTable
          columns={columns}
          data={data?.data || []}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};
