import { useEffect, useState } from "react";
import { fetchAdminStats, fetchAdminUsers } from "./admin.api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const s = await fetchAdminStats();
        const u = await fetchAdminUsers();
        setStats(s);
        setUsers(u);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <div className="p-6">Loading admin dashboard…</div>;
  if (!stats) return <div className="p-6 text-red-600">Failed to load admin data</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Stat title="Total Users" value={stats.totalUsers} />
        <Stat title="Total Tokens" value={stats.totalTokens} />
        <Stat title="Admins" value="1" />
        <Stat title="System" value="Online" />
      </div>

      {/* USERS TABLE */}
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
              <tr key={u._id} className="border-t">
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
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white rounded-xl p-5 shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminDashboard;
