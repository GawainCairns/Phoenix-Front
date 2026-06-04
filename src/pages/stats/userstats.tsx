import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { getUsers } from '../../services/user';
import { getSurveys } from '../../services/survey';
import { getResponses } from '../../services/response';
import { User, Survey, SurveyResponse } from '../../types/api';

export default function UserStats() {
  const [users, setUsers] = useState<User[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [u, s, r] = await Promise.all([getUsers(), getSurveys(), getResponses()]);
        setUsers(u);
        setSurveys(s);
        setResponses(r);
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load stats.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const adminCount = users.filter(
    (u) => Array.isArray(u.permissions) && u.permissions.includes('admin')
  ).length;

  const surveysPerUser = users.map((u) => ({
    user: u,
    count: surveys.filter((s) => String(s.creatorId) === String(u.id)).length,
  })).sort((a, b) => b.count - a.count);

  const respondentCount = new Set(responses.map((r) => String(r.respondentId))).size;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-1">User Statistics</h2>
          <p className="text-sm text-gray-500 mb-6">Platform-wide user engagement overview.</p>

          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
          )}

          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
                <div className="p-4 text-center border rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{users.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Total Users</div>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <div className="text-3xl font-bold text-red-600">{adminCount}</div>
                  <div className="text-xs text-gray-500 mt-1">Admins</div>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{surveys.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Surveys Created</div>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">{respondentCount}</div>
                  <div className="text-xs text-gray-500 mt-1">Active Respondents</div>
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-3">Surveys per User</h3>
              {surveysPerUser.length === 0 ? (
                <div className="text-sm text-gray-500">No users found.</div>
              ) : (
                <div className="border rounded overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left px-4 py-2 text-gray-600">User</th>
                        <th className="text-left px-4 py-2 text-gray-600">Email</th>
                        <th className="text-right px-4 py-2 text-gray-600">Surveys</th>
                      </tr>
                    </thead>
                    <tbody>
                      {surveysPerUser.map(({ user: u, count }) => (
                        <tr key={u.id} className="border-b last:border-b-0 hover:bg-gray-50">
                          <td className="px-4 py-2">
                            <div className="font-medium">{u.name ?? u.username}</div>
                            {u.username && u.name && (
                              <div className="text-xs text-gray-400">@{u.username}</div>
                            )}
                          </td>
                          <td className="px-4 py-2 text-gray-500">{u.email}</td>
                          <td className="px-4 py-2 text-right font-semibold text-blue-600">{count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}