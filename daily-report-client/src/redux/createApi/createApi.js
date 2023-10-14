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
		getUserPreviousHistory: builder.query({
			//TODO: manage cash when transfer but don't change data when retype
			query: value => ({
				url: `/u/user/h?value=${value}`,
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
		getTodayReport: builder.query({
			query: ({ stationName, reportDate, userServiceID, numDays }) => ({
				url: `/r/update-info?s_n=${stationName}&r_d=${reportDate}&u_i=${userServiceID}&n_d=${numDays}`,
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
	useGetTodayReportQuery,
	useGetUserPreviousHistoryQuery
} = dailyReportAPI;
