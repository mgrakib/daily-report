
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
			query: ({key, value}) => ({
				url: `/u/user?key=${key}&value=${value}`,
			}),
		}),
	}),
});



export const { useCreateNewUserMutation, useGetSingleUserQuery } = dailyReportAPI;