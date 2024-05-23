import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllUsers: build.query({
			query: (arg: Record<string, any>) => ({
				method: "GET",
				url: "/user",
				params: arg,
			}),
			providesTags: [tagTypes.user],
		}),

		updateUserStatus: build.mutation({
			query: (data) => ({
				method: "PUT",
				url: `/user/${data.id}`,
				data: data.status,
			}),
			invalidatesTags: [tagTypes.user, tagTypes.meta],
		}),
	}),
});

export const { useGetAllUsersQuery, useUpdateUserStatusMutation } = userApi;
