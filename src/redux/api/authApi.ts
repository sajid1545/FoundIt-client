import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		changePassword: build.mutation({
			query: (data) => ({
				method: "POST",
				url: "/change-password",
				data,
			}),
			invalidatesTags: [tagTypes.user, tagTypes.meta],
		}),
	}),
});

export const { useChangePasswordMutation } = authApi;
