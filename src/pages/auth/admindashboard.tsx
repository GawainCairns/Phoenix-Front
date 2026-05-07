import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

const stats = [
  { label: 'Total Users', value: '1,204' },
  { label: 'Total Surveys', value: '348' },
  { label: 'Total Responses', value: '18,921' },
  { label: 'Active Surveys', value: '73' },
];

const recentUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', joined: '2026-04-28' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', joined: '2026-05-01' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Admin', joined: '2026-05-03' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl shadow p-6 text-center">
                <p className="text-3xl font-extrabold text-indigo-600">{s.value}</p>
                <p className="text-gray-500 mt-1 text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Users */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">Recent Users</h3>
            </div>
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-800">{u.name}</td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          u.role === 'Admin'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{u.joined}</td>
                    <td className="px-6 py-4 space-x-3">
                      <button className="text-indigo-600 hover:underline text-sm">Edit</button>
                      <button className="text-red-500 hover:underline text-sm">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
