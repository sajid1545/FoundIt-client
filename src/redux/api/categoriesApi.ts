import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const categoriesApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getCategories: build.query({
			query: () => ({
				method: "GET",
				url: "/found-item-categories",
			}),
			providesTags: [tagTypes.categories, tagTypes.meta],
		}),
	}),
});

export const { useGetCategoriesQuery } = categoriesApi;
