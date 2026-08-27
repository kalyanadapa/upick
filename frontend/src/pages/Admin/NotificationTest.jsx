import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";
import {
  useSendTestNotificationMutation,
  useStartTestSeriesMutation,
  useStopTestSeriesMutation,
  useGetTestSeriesStatusQuery,
} from "../../redux/api/notificationApiSlice";
import { FaPaperPlane, FaPlay, FaStop, FaSync } from "react-icons/fa";

const NotificationTest = () => {
  const [title, setTitle] = useState("🏏 Upick Test Notification");
  const [body, setBody] = useState("This is a test web push notification delivered from Upick.");
  const [url, setUrl] = useState("/");

  const [sendTestNotification, { isLoading: isSending }] = useSendTestNotificationMutation();
  const [startTestSeries, { isLoading: isStarting }] = useStartTestSeriesMutation();
  const [stopTestSeries, { isLoading: isStopping }] = useStopTestSeriesMutation();
  const { data: statusData, refetch: refetchStatus } = useGetTestSeriesStatusQuery(undefined, {
    pollingInterval: 5000,
  });

  const seriesInfo = statusData?.data || {};

  const handleSendSingle = async (e) => {
    e.preventDefault();
    try {
      const res = await sendTestNotification({ title, body, url }).unwrap();
      const stats = res?.data;
      toast.success(
        `Dispatched! ${stats?.sent || 0} succeeded, ${stats?.failed || 0} failed out of ${stats?.totalActive || 0} active subscriptions.`
      );
      refetchStatus();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Failed to send test notification");
    }
  };

  const handleStartSeries = async () => {
    try {
      const res = await startTestSeries().unwrap();
      toast.success(res?.message || "Test notification series started.");
      refetchStatus();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Failed to start test series");
    }
  };

  const handleStopSeries = async () => {
    try {
      const res = await stopTestSeries().unwrap();
      toast.info(res?.message || "Test series stopped.");
      refetchStatus();
    } catch (err) {
      toast.error(err?.data?.message || err?.message || "Failed to stop test series");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-8">
        <AdminMenu />

        <div className="flex-1 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Web Push Notification Test
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Test lock-screen & background push notification delivery to registered user devices.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 px-4 py-2 rounded-lg text-sm font-semibold border border-pink-200 dark:border-pink-800">
              Active Subscriptions: {seriesInfo.activeSubscriptions ?? "..."}
            </div>
          </div>

          {/* Single Test Push Form */}
          <form onSubmit={handleSendSingle} className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Send Single Test Notification
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notification Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notification Message Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="Message body..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target URL (opens when clicked)
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                placeholder="/"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="bg-black hover:bg-gray-800 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
            >
              <FaPaperPlane className="text-sm" />
              {isSending ? "Sending..." : "Send Test Notification"}
            </button>
          </form>

          {/* Continuous Test Series Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Continuous Lock-Screen Test Series (30s Interval)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Sends live score test notifications every 30 seconds so you can lock your Android device and test background delivery.
                </p>
              </div>
              <button
                onClick={() => refetchStatus()}
                className="p-2 text-gray-500 hover:text-black dark:hover:text-white"
                title="Refresh Status"
              >
                <FaSync />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {!seriesInfo.isRunning ? (
                <button
                  onClick={handleStartSeries}
                  disabled={isStarting}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
                >
                  <FaPlay className="text-xs" />
                  {isStarting ? "Starting..." : "Start Test Series"}
                </button>
              ) : (
                <button
                  onClick={handleStopSeries}
                  disabled={isStopping}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer transition disabled:opacity-50"
                >
                  <FaStop className="text-xs" />
                  {isStopping ? "Stopping..." : "Stop Test Series"}
                </button>
              )}

              <span className="text-sm font-medium">
                Status:{" "}
                {seriesInfo.isRunning ? (
                  <span className="text-green-600 dark:text-green-400 animate-pulse font-semibold">
                    ● Series Running (Step #{seriesInfo.currentStep || 1})
                  </span>
                ) : (
                  <span className="text-gray-500">Idle</span>
                )}
              </span>
            </div>

            {/* Test Series Logs */}
            <div className="bg-gray-900 text-green-400 p-4 rounded-xl font-mono text-xs max-h-48 overflow-y-auto border border-gray-800">
              <div className="text-gray-400 mb-2 border-b border-gray-800 pb-1 flex justify-between">
                <span>[Test Series Execution Console Logs]</span>
                <span>Active Subs: {seriesInfo.activeSubscriptions ?? 0}</span>
              </div>
              {seriesInfo.logs && seriesInfo.logs.length > 0 ? (
                seriesInfo.logs.map((log, idx) => (
                  <div key={idx} className="py-0.5">
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">No test series logs recorded yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationTest;
