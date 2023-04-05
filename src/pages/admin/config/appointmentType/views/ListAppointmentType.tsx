import {ViewTitle} from '../../../components/share/title/ViewTitle';
import {SgLink} from '../../../../../components/form/button/SgLink';
import {SgTable} from '../../../../../components/table/SgTable';
import {useGetAppointmentTypeQuery} from '../../../appointment/redux/api/appointmentApi';
import {ColumnsAppointmentType} from '../helpers/columnsAppointmentType';
import { t }                      from 'i18next';


export const ListAppointmentType = () => {
    const { data, isLoading } = useGetAppointmentTypeQuery('');
    console.log(data)
    return (
        <>
            <ViewTitle title= {t('list_appointment_type')}>
                <SgLink label={t('create_appointment_type')} to="/admin/appointment-type/create"/>
            </ViewTitle>
            <div style={{ height: '70vh', width: '100%' }}>
                <SgTable
                    columns={ColumnsAppointmentType}
                    data={ data?.data || []}
                    isLoading={isLoading}/>
            </div>
        </>

    )

};
