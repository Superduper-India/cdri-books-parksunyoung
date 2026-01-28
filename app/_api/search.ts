import ky from "ky";
import type { KakaoSearchResponse } from "@/app/_types/book";

export const searchBookApi = {
  fetchSearchWeb: async (
    query: string,
    target?: string,
    sort?: string,
    page?: number,
    size?: number,
  ): Promise<KakaoSearchResponse> => {
    const baseUrl =
      process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_URL || "https://dapi.kakao.com";
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;

    if (!apiKey) {
      throw new Error("Kakao REST API Key is not configured");
    }

    const searchParams: Record<string, string> = {
      query,
    };

    if (target) {
      searchParams.target = target;
    }
    if (sort) {
      searchParams.sort = sort.toLowerCase();
    }
    if (page !== undefined) {
      searchParams.page = page.toString();
    }
    if (size !== undefined) {
      searchParams.size = size.toString();
    }

    const res = await ky.get<KakaoSearchResponse>(`${baseUrl}/v3/search/book`, {
      searchParams,
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
      cache: "no-store",
    });

    return res.json();
  },
};
