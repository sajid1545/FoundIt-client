import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const metaApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getAllMetaData: build.query({
			query: () => ({
				method: "GET",
				url: "/meta",
			}),
			providesTags: [tagTypes.meta],
		}),
	}),
});

export const { useGetAllMetaDataQuery } = metaApi;
