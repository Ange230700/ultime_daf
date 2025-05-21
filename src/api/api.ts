// src\api\api.ts

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "https://api.fbi.gov",
});

export interface WantedItem {
  uid: string;
  title: string;
  images: { thumb: string; large: string }[];
  description?: string;
  caution?: string;
  details?: string;
  remarks?: string;
  place_of_birth?: string;
  race?: string;
  sex?: string;
  hair?: string;
  eyes?: string;
  poster_classification?: string;
  // …other fields
}

export interface WantedResponse {
  items: WantedItem[];
  total: number;
  // …other metadata
}

export async function fetchWantedList(params: {
  title?: string;
  poster_classification?: string;
  page?: number;
  pageSize?: number;
}): Promise<WantedResponse> {
  const qs = new URLSearchParams();
  if (params.title) qs.append("title", params.title);
  if (params.poster_classification)
    qs.append("poster_classification", params.poster_classification);
  if (params.page) qs.append("page", params.page.toString());
  if (params.pageSize) qs.append("pageSize", params.pageSize.toString());
  const { data } = await api.get<WantedResponse>(`/@wanted?${qs.toString()}`);
  return data;
}

export async function fetchItemDetails(uid: string): Promise<WantedItem> {
  const { data } = await api.get<WantedItem>(`/wanted/${uid}`);
  return data;
}
