import {ViewTitle}                  from '../../../components/share/title/ViewTitle';
import {SgLink}                     from '../../../../../components/form/button/SgLink';
import {SgTable}                    from '../../../../../components/table/SgTable';
import {useGetAppointmentTypeQuery} from '../../../appointment/redux/api/appointmentApi';
import {ColumnsAppointmentType}     from '../helpers/columnsAppointmentType';
import { t }                        from 'i18next';
import { useNavigate }              from 'react-router-dom';
import { GridRowParams }            from '@mui/x-data-grid';
import useForms                     from '../../../../../store/hooks/form/useForms';


export const ListAppointmentType = () => {
    const navigate = useNavigate();
    const { setAppointmentTypeEditAction } = useForms();
    const handleRowDoubleClick = (params: GridRowParams) => {
      setAppointmentTypeEditAction(params.row);
      navigate(`/admin/appointment-type/edit/${params.row.id}`);
    }
    const { data, isLoading } = useGetAppointmentTypeQuery('');

    return (
        <>
            <ViewTitle title= {t('list_appointment_type')}>
                <SgLink label={t('create_appointment_type')} to="/admin/appointment-type/create"/>
            </ViewTitle>
            <div style={{ height: '70vh', width: '100%' }}>
                <SgTable
                    columns={ColumnsAppointmentType}
                    onRowDoubleClick={ handleRowDoubleClick }
                    data={ data?.data || []}
                    isLoading={isLoading}/>
            </div>
        </>

    )

};
