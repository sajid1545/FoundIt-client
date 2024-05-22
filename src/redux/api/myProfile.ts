import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const myProfileApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getMyProfile: build.query({
			query: () => ({
				method: "GET",
				url: "/my-profile",
			}),
			providesTags: [tagTypes.user],
		}),

		updateMyProfile: build.mutation({
			query: (data) => ({
				method: "PUT",
				url: "/my-profile",
				data,
			}),
			invalidatesTags: [tagTypes.user],
		}),
	}),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = myProfileApi;
