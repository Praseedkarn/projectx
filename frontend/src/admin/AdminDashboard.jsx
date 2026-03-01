import { useEffect, useState } from "react";
import {
  fetchAdminStats,
  fetchAdminUsers,
  fetchAdminSearches,
} from "./admin.api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [searches, setSearches] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeTab, setActiveTab] = useState("users"); // 🔥 NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const s = await fetchAdminStats();
        const u = await fetchAdminUsers();
        const sh = await fetchAdminSearches();

        setStats(s);
        setUsers(u);
        setSearches(sh);
      } catch (err) {
        console.error("ADMIN LOAD ERROR 👉", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-6">Loading admin dashboard…</div>;
  if (!stats)
    return <div className="p-6 text-red-600">Failed to load admin data</div>;

  const guestSearches = searches.filter((s) => s.isGuest);
  const userSearches = searches.filter((s) => !s.isGuest);

  return (
    <div className=" bg-white max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat title="Total Users" value={stats.totalUsers} />
        <Stat title="Total Tokens" value={stats.totalTokens} />
        <Stat title="Guest Searches" value={guestSearches.length} />
        <Stat title="User Searches" value={userSearches.length} />
      </div>

      {/* ================= TABS ================= */}
      <div className="flex gap-4 border-b pb-3">
        <button
          onClick={() => {
            setActiveTab("users");
            setSelectedUser(null);
          }}
          className={`px-4 py-2 rounded ${
            activeTab === "users"
              ? "bg-black text-white"
              : "bg-gray-100"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => {
            setActiveTab("guests");
            setSelectedUser(null);
          }}
          className={`px-4 py-2 rounded ${
            activeTab === "guests"
              ? "bg-black text-white"
              : "bg-gray-100"
          }`}
        >
          Guests
        </button>
      </div>

      {/* ================= USERS TAB ================= */}
      {activeTab === "users" && (
        <>
          <div className="bg-white rounded-xl shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-center">Tokens</th>
                  <th className="px-4 py-3 text-right">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    onClick={() => setSelectedUser(u)}
                    className={`border-t cursor-pointer hover:bg-gray-50 ${
                      selectedUser?._id === u._id ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="px-4 py-3">{u.name}</td>
                    <td className="px-4 py-3">{u.email}</td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {u.tokens}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedUser && (
            <SearchTable
              title={`Search History — ${selectedUser.name}`}
              searches={searches.filter(
                (s) => s.user?._id === selectedUser._id
              )}
            />
          )}
        </>
      )}

      {/* ================= GUEST TAB ================= */}
      {activeTab === "guests" && (
        <SearchTable
          title="Guest Search History"
          searches={guestSearches}
        />
      )}
    </div>
  );
};

/* ================= REUSABLE SEARCH TABLE ================= */
const SearchTable = ({ title, searches }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>

    {searches.length === 0 ? (
      <p className="text-center text-gray-500 py-6">
        No searches found
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Search</th>
              <th className="px-4 py-2 text-center">Tokens</th>
              <th className="px-4 py-2 text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {searches.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="px-4 py-2">{s.place}</td>
                <td className="px-4 py-2 text-center font-semibold">
                  {s.tokensUsed}
                </td>
                <td className="px-4 py-2 text-right text-gray-500">
                  {new Date(s.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminDashboard;