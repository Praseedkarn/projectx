import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../services/apiClient";

const TokenHistoryPage = () => {
  const navigate = useNavigate();
  const [tokenHistory, setTokenHistory] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchAll = async () => {
      try {
        const [tokenRes, searchRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/history/tokens`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/api/history/search`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!tokenRes.ok || !searchRes.ok) {
          throw new Error("History fetch failed");
        }

        const tokenData = await tokenRes.json();
        const searchData = await searchRes.json();

        setTokenHistory(tokenData);
        setSearchHistory(searchData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [navigate]);

  // 🔗 Find matching search by closest time
  const findSearchForToken = (tokenItem) => {
    if (tokenItem.reason !== "AI_ITINERARY") return null;

    return searchHistory.find((s) => {
      const diff =
        Math.abs(
          new Date(s.createdAt).getTime() -
          new Date(tokenItem.createdAt).getTime()
        );
      return diff < 5000; // within 5 seconds
    });
  };

  return (
    <div className="pt-24 px-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow p-6 sm:p-8 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">🪙 Token History</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500"
          >
            ← Back
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500 py-10">
            Loading token history…
          </p>
        )}

        {/* EMPTY */}
        {!loading && tokenHistory.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No token activity yet
          </p>
        )}

        {/* HISTORY LIST */}
        <div className="space-y-4">
          {tokenHistory.map((item) => {
            const search = findSearchForToken(item);

            return (
              <div
                key={item._id}
                className="border rounded-xl px-4 py-3 space-y-1"
              >
                <p className="font-medium text-gray-800">
                  {item.reason}
                </p>

                {/* 🔍 SHOW SEARCH CONTEXT */}
                {search && (
                  <p className="text-sm text-gray-600">
                    📍 {search.place}
                  </p>
                )}

                <p className="text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <p
                    className={`font-semibold ${
                      item.change > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.change > 0 ? "+" : ""}
                    {item.change}
                  </p>

                  <p className="text-xs text-gray-500">
                    Balance: {item.balanceAfter}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default TokenHistoryPage;
