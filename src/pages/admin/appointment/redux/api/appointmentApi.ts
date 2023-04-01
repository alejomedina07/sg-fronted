import { createApi }             from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth       from '../../../../../utils/api/apiConst';
import AppointmentModel          from '../../models/AppointmentModel';
import { RangeAppointmentProps } from '../../../../../services/utils/DateFnsManager';


export const appointmentApi = createApi({

  reducerPath: 'appointmentApi',

  baseQuery: baseQueryWithReauth,


  endpoints: (build)=> ({

    getAppointments: build.query({
      query: ( range : RangeAppointmentProps)=> `/appointment?start=${range.start}&end=${range.end}`,
      keepUnusedDataFor: 5,
      transformResponse: (rawResult:any) => {
        // console.log(999, rawResult.data);
        return rawResult.data.map( (item: AppointmentDto) => AppointmentModel(item) )
      },
    }),
    getAppointmentType: build.query({
      query: ( )=> '/appointment/type',
    }),
    addAppointment: build.mutation<any, any>({
      query: ( body: any ) => ({
        url:'/appointment',
        method: 'POST',
        body,
      }),
    }),

  })

})

export const { useGetAppointmentsQuery, useGetAppointmentTypeQuery, useAddAppointmentMutation } = appointmentApi;

