import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const foundItemsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createFoundItem: build.mutation({
			query: (data) => ({
				method: "POST",
				url: "/found-items",
				data,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: [tagTypes.foundItems],
		}),
		getAllFoundItems: build.query({
			query: () => ({
				method: "GET",
				url: "/found-items",
			}),
			providesTags: [tagTypes.foundItems],
		}),
	}),
});

export const { useCreateFoundItemMutation, useGetAllFoundItemsQuery } = foundItemsApi;
