import { ViewTitle } from '../../../components/share/title/ViewTitle';
import { SgLink } from '../../../../../components/form/button/SgLink';
import { SgTable } from '../../../../../components/table/SgTable';
import { useGetAppointmentTypeQuery } from '../../../appointment/redux/api/appointmentApi';
import { ColumnsAppointmentType } from '../helpers/columnsAppointmentType';
import { useNavigate } from 'react-router-dom';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useForms from '../../../../../store/hooks/form/useForms';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { NotesButton } from '../../../components/notes/components/NotesButton';

export const ListAppointmentType = () => {
  const navigate = useNavigate();
  const { setAppointmentTypeEditAction } = useForms();
  const { t, i18n } = useTranslation();
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const columnsAppointmentType = ColumnsAppointmentType();

  const onClickView = (params: GridRenderCellParams) => {
    setAppointmentTypeEditAction(params.row);
    navigate(`/admin/appointment-type/edit/${params.row.id}`);
  };

  const { data, isLoading } = useGetAppointmentTypeQuery('');

  useEffect(() => {
    setColumns([
      ...columnsAppointmentType,
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
              <NotesButton keyProp="appointmentTypeId" id={params.row.id} />
            </div>
          );
        },
      },
    ]);
  }, [i18n.language]);

  return (
    <>
      <ViewTitle title={t('list_appointment_type')}>
        <SgLink
          label={t('create_appointment_type')}
          to="/admin/appointment-type/create"
        />
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
