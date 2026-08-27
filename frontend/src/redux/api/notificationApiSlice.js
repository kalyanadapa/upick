import { apiSlice } from "./apiSlice";
import { NOTIFICATIONS_URL } from "../constants";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchVapidKey: builder.query({
      query: () => `${NOTIFICATIONS_URL}/vapid-key`,
    }),
    subscribeToPush: builder.mutation({
      query: (data) => ({
        url: `${NOTIFICATIONS_URL}/subscribe`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
    unsubscribeFromPush: builder.mutation({
      query: (data) => ({
        url: `${NOTIFICATIONS_URL}/unsubscribe`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Notification"],
    }),
    checkSubscriptionStatus: builder.query({
      query: (endpoint) => `${NOTIFICATIONS_URL}/subscription-status?endpoint=${encodeURIComponent(endpoint)}`,
      providesTags: ["Notification"],
    }),
    sendTestNotification: builder.mutation({
      query: (data) => ({
        url: `${NOTIFICATIONS_URL}/test`,
        method: "POST",
        body: data,
      }),
    }),
    startTestSeries: builder.mutation({
      query: () => ({
        url: `${NOTIFICATIONS_URL}/test-series/start`,
        method: "POST",
      }),
    }),
    stopTestSeries: builder.mutation({
      query: () => ({
        url: `${NOTIFICATIONS_URL}/test-series/stop`,
        method: "POST",
      }),
    }),
    getTestSeriesStatus: builder.query({
      query: () => `${NOTIFICATIONS_URL}/test-series/status`,
    }),
  }),
});

export const {
  useFetchVapidKeyQuery,
  useSubscribeToPushMutation,
  useUnsubscribeFromPushMutation,
  useCheckSubscriptionStatusQuery,
  useSendTestNotificationMutation,
  useStartTestSeriesMutation,
  useStopTestSeriesMutation,
  useGetTestSeriesStatusQuery,
} = notificationApiSlice;
