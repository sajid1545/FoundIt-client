import { IMeta } from "@/types";
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
			invalidatesTags: [tagTypes.lostItems, tagTypes.meta],
		}),

		getAllLostItems: build.query({
			query: (arg: Record<string, any>) => ({
				method: "GET",
				url: "/lost-items",
				params: arg,
			}),
			transformResponse: (response: [], meta: IMeta) => {
				return {
					lostItems: response,
					meta,
				};
			},
			providesTags: [tagTypes.lostItems],
		}),

		getMyLostItems: build.query({
			query: () => ({
				method: "GET",
				url: "/lost-items/my-items",
			}),
			providesTags: [tagTypes.lostItems],
		}),

		getSingleLostItem: build.query({
			query: (id) => ({
				method: "GET",
				url: `/lost-items/${id}`,
			}),
			providesTags: [tagTypes.lostItems],
		}),

		updateLostItem: build.mutation({
			query: (data) => ({
				method: "PATCH",
				url: `/lost-items/${data.id}`,
				data: data.data,
			}),
			invalidatesTags: [tagTypes.lostItems, tagTypes.meta],
		}),
		deleteLostItem: build.mutation({
			query: (id) => ({
				method: "DELETE",
				url: `/lost-items/${id}`,
			}),
			invalidatesTags: [tagTypes.lostItems, tagTypes.meta],
		}),

		updateLostItemFoundStatus: build.mutation({
			query: (id) => ({
				method: "PUT",
				url: `/lost-items/status/${id}`,
			}),
			invalidatesTags: [tagTypes.lostItems, tagTypes.meta],
		}),
	}),
});

export const {
	useCreateLostItemMutation,
	useGetMyLostItemsQuery,
	useGetSingleLostItemQuery,
	useUpdateLostItemMutation,
	useDeleteLostItemMutation,
	useGetAllLostItemsQuery,
	useUpdateLostItemFoundStatusMutation,
} = lostItemsApi;
