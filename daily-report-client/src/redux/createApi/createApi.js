/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dailyReportAPI = createApi({
	reducerPath: "dailyReportAPIS",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4000/api/v1",
	}),

	endpoints: builder => ({
		createNewUser: builder.mutation({
			query: ({ ...userInfo }) => ({
				url: `/u/create-user`,
				method: "POST",
				body: userInfo,
			}),
		}),

		getSingleUser: builder.query({
			//TODO: manage cash when transfer but don't change data when retype
			query: ({ key, value }) => ({
				url: `/u/user?key=${key}&value=${value}`,
			}),
		}),
		transferUser: builder.mutation({
			query: ({ s_i, new_s }) => ({
				url: `/u/user?s_i=${s_i}&new_s=${new_s}`,
				method: "PATCH",
			}),
			invalidates: [{ endpoint: "getSingleUser", args: { key: "s_i" } }],
		}),
		getWorkStationOpe: builder.query({
			query: stationName => ({
				url: `/r/workstation-ope?s_n=${stationName}`,
			}),
		}),
		submitDailyReport: builder.mutation({
			query: ([...report]) => ({
				url: `/r/update-report`,
				method: "POST",
				body: report,
			}),
		}),
		getTodayReportForStation: builder.query({
			query: stationName => ({
				url: `/r/update-info?s_n=${stationName}`,
			}),
		}),
	}),
});

export const {
	useCreateNewUserMutation,
	useGetSingleUserQuery,
	useTransferUserMutation,
	useGetWorkStationOpeQuery,
	useSubmitDailyReportMutation,
	useGetTodayReportForStationQuery
} = dailyReportAPI;
