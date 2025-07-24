"use client";

import { useMutation, QueryClient } from "@tanstack/react-query";
import type HttpError from "@/models/HttpError";
import type { RecommendationResponse, UserRequest } from "@/models/Movies";
import { API_BASE_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase/browserClient";
import { toast } from "sonner";
import { format } from "date-fns";
import { StatusCodes } from "http-status-codes";
import useDataStore from "@/hooks/useDataStore";

const useFetchRecommendation = (queryClient: QueryClient) => {
  const setDisplayResults = useDataStore((state) => state.setDisplayResults);

  return useMutation<RecommendationResponse, HttpError, UserRequest>({
    mutationFn: async (request: UserRequest) => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 10 sec

        const accessToken = session?.access_token;
        console.log("Token", accessToken);
        const response = await fetch(API_BASE_URL + "/recommendation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + (accessToken || "xyz"),
          },
          body: JSON.stringify(request),
          signal: controller.signal,
        });

        if (!response.ok) {
          const error: HttpError = new Error("Request Failed");
          error.status = response.status;
          error.data = await response.json();
          error.response = response;
          console.log(`this is an error ${error.data.detail}`);
          throw error;
        }
        clearTimeout(timeoutId);
        return await response.json();
      } catch (err) {
        if (err instanceof DOMException) {
          const error: HttpError = new Error("Request timed out");
          error.status = StatusCodes.REQUEST_TIMEOUT;
          throw error;
        } else {
          throw err;
        }
      }
    },
    onMutate: () => setDisplayResults(true),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["recommendations", variables.request_id], data);
    },
    onError: (error) => {
      const date = new Date();
      const formattedDate = format(date, "EEEE, MMMM do 'at' h:mmaaa");
      toast.error(error.message, {
        description: formattedDate,
      });
    },
  });
};

export default useFetchRecommendation;
