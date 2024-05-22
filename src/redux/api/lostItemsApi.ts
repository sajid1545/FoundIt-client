import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const lostItemsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createLostItem: build.mutation({
			query: (data) => ({
				method: "POST",
				url: "/lost-items",
				data,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: [tagTypes.lostItems],
		}),
	}),
});

export const { useCreateLostItemMutation } = lostItemsApi;
