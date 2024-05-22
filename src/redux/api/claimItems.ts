import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const claimItemsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createClaimItem: build.mutation({
			query: (data) => ({
				method: "POST",
				url: "/claims",
				data,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: [tagTypes.claimItems],
		}),
	}),
});

export const { useCreateClaimItemMutation } = claimItemsApi;
