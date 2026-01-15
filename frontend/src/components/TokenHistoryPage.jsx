import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TokenHistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("tokenHistory")) || [];
    setHistory(data);
  }, []);

  return (
    <div className="pt-28 px-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow p-8 space-y-6">

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

        {/* EMPTY STATE */}
        {history.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No token activity yet
          </p>
        )}

        {/* HISTORY LIST */}
        <div className="space-y-4">
          {history.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-xl px-4 py-3"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {item.reason}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(item.time).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    item.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.type === "credit" ? "+" : "-"}
                  {item.amount}
                </p>
                <p className="text-xs text-gray-500">
                  Balance: {item.balance}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TokenHistoryPage;
