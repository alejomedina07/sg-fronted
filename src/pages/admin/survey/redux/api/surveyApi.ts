import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../../../../../utils/api/apiConst';

export const surveyApi = createApi({
  reducerPath: 'surveyApi',

  baseQuery: baseQueryWithReauth,

  endpoints: (build) => ({
    getSurvey: build.query({
      query: () => '/survey',
      keepUnusedDataFor: 0,
    }),
    getMySurveys: build.query({
      query: (data: { idUser: number; list: boolean }) =>
        `/survey/${data.idUser}?list=${data.list}`,
      keepUnusedDataFor: 0,
    }),
    getSurveyAnswer: build.query({
      query: (idSurveyAnswer: number) =>
        `/survey/view-answers/${idSurveyAnswer}`,
      keepUnusedDataFor: 0,
    }),
    getSurveyAnswerGeneral: build.query({
      query: (idSurvey: number) => `/survey/view-answers-survey/${idSurvey}`,
      keepUnusedDataFor: 0,
    }),
    getUsersAssigned: build.query({
      query: (idSurvey: number) => `/survey/assign/${idSurvey}`,
      keepUnusedDataFor: 0,
    }),
    getSurveyComplete: build.query({
      query: (idSurvey: number) => `/survey/complete/${idSurvey}`,
      keepUnusedDataFor: 0,
    }),
    addSurvey: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/survey',
        method: 'POST',
        body,
      }),
    }),
    addAssign: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/survey/assign',
        method: 'POST',
        body,
      }),
    }),
    updateSurvey: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/survey/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    // category
    getCategory: build.query({
      query: () => '/survey/category',
      keepUnusedDataFor: 0,
    }),
    // category
    getCategoriesById: build.query({
      query: (ids: string) => `/survey/category/by-ids?ids=${ids}`,
      keepUnusedDataFor: 0,
    }),
    addCategory: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/survey/category',
        method: 'POST',
        body,
      }),
    }),
    updateCategory: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/survey/category/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),
    // question
    getQuestion: build.query({
      query: () => '/survey/question',
      keepUnusedDataFor: 0,
    }),
    addQuestion: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/survey/question',
        method: 'POST',
        body,
      }),
    }),
    updateQuestion: build.mutation<any, any>({
      query: (body: any) => ({
        url: `/survey/question/${body.question.id}`,
        method: 'PUT',
        body,
      }),
    }),
    addAnswer: build.mutation<any, any>({
      query: (body: any) => ({
        url: '/survey/answer',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetSurveyQuery,
  useGetMySurveysQuery,
  useGetSurveyAnswerQuery,
  useGetSurveyAnswerGeneralQuery,
  useGetUsersAssignedQuery,
  useGetSurveyCompleteQuery,
  useAddSurveyMutation,
  useAddAssignMutation,
  useUpdateSurveyMutation,

  // category

  useGetCategoryQuery,
  useGetCategoriesByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,

  // category

  useGetQuestionQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,

  // answer

  useAddAnswerMutation,
} = surveyApi;
