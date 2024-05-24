import { IMeta } from "@/types";
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
			invalidatesTags: [tagTypes.foundItems, tagTypes.meta],
		}),
		getAllFoundItems: build.query({
			query: (arg: Record<string, any>) => ({
				method: "GET",
				url: "/found-items",
				params: arg,
			}),
			transformResponse: (response: [], meta: IMeta) => {
				return {
					foundItems: response,
					meta,
				};
			},
			providesTags: [tagTypes.foundItems],
		}),

		getMyFoundItems: build.query({
			query: () => ({
				method: "GET",
				url: "/found-items/my-items",
			}),
			providesTags: [tagTypes.foundItems, tagTypes.user],
		}),

		getSingleFoundItem: build.query({
			query: (id) => ({
				method: "GET",
				url: `/found-items/${id}`,
			}),
			providesTags: [tagTypes.foundItems],
		}),

		updateFoundItem: build.mutation({
			query: (data) => ({
				method: "PATCH",
				url: `/found-items/${data.id}`,
				data: data.data,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: [tagTypes.foundItems, tagTypes.meta],
		}),

		deleteFoundItem: build.mutation({
			query: (id) => ({
				method: "DELETE",
				url: `/found-items/${id}`,
			}),
			invalidatesTags: [tagTypes.foundItems, tagTypes.meta],
		}),
	}),
});

export const {
	useCreateFoundItemMutation,
	useGetAllFoundItemsQuery,
	useGetMyFoundItemsQuery,
	useGetSingleFoundItemQuery,
	useUpdateFoundItemMutation,
	useDeleteFoundItemMutation,
} = foundItemsApi;
