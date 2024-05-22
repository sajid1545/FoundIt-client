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

		getMyClaimedRequests: build.query({
			query: () => ({
				method: "GET",
				url: "/claims",
			}),
			providesTags: [tagTypes.claimItems],
		}),

		updateFoundItemClaimStatus: build.mutation({
			query: (data) => ({
				method: "PUT",
				url: `/claims/${data.id}`,
				data: data.status,
			}),
			invalidatesTags: [tagTypes.foundItems, tagTypes.claimItems],
		}),
	}),
});

export const {
	useCreateClaimItemMutation,
	useGetMyClaimedRequestsQuery,
	useUpdateFoundItemClaimStatusMutation,
} = claimItemsApi;
