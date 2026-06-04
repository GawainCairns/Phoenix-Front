import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/user';
import { getSurveys, deleteSurvey } from '../../services/survey';
import { User, Survey } from '../../types/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'users' | 'surveys'>('users');

  useEffect(() => {
    async function loadData() {
      try {
        const [u, s] = await Promise.all([getUsers(), getSurveys()]);
        setUsers(u);
        setSurveys(s);
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load data.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleDeleteUser(id: string | number) {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
    } catch (err: any) {
      alert(err?.message ?? 'Failed to delete user.');
    }
  }

  async function handleDeleteSurvey(id: string | number) {
    if (!window.confirm('Delete this survey?')) return;
    try {
      await deleteSurvey(id);
      setSurveys((prev) => prev.filter((s) => String(s.id) !== String(id)));
    } catch (err: any) {
      alert(err?.message ?? 'Failed to delete survey.');
    }
  }

  const adminCount = users.filter(
    (u) => Array.isArray(u.permissions) && u.permissions.includes('admin')
  ).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center flex-grow p-6">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Dashboard</h2>

          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
          )}

          <div className="flex gap-4 mb-6">
            <div className="flex-1 p-4 text-center border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">{loading ? '—' : users.length}</div>
              <div className="text-sm text-gray-500">Total Users</div>
            </div>
            <div className="flex-1 p-4 text-center border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{loading ? '—' : adminCount}</div>
              <div className="text-sm text-gray-500">Admins</div>
            </div>
            <div className="flex-1 p-4 text-center border border-gray-200 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{loading ? '—' : surveys.length}</div>
              <div className="text-sm text-gray-500">Total Surveys</div>
            </div>
          </div>

          <div className="flex gap-2 mb-4 border-b border-gray-200">
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'users' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('users')}
            >
              Users ({users.length})
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${activeTab === 'surveys' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('surveys')}
            >
              Surveys ({surveys.length})
            </button>
          </div>

          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : activeTab === 'users' ? (
            <ul>
              {users.map((u) => (
                <li key={u.id} className="flex items-center justify-between p-3 mb-2 border rounded hover:bg-gray-50">
                  <div>
                    <div className="font-medium">{u.name ?? u.username}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                    {Array.isArray(u.permissions) && u.permissions.length > 0 && (
                      <div className="text-xs text-blue-500">{u.permissions.join(', ')}</div>
                    )}
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Link to={`/profile`} className="text-blue-500 hover:underline">Profile</Link>
                    <Link to={`/surveys/mine`} className="text-green-600 hover:underline">Surveys</Link>
                    <button className="text-red-600 hover:underline" onClick={() => handleDeleteUser(u.id!)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              {surveys.map((s) => (
                <li key={s.id} className="flex items-center justify-between p-3 mb-2 border rounded hover:bg-gray-50">
                  <div>
                    <div className="font-medium">{s.surveyName}</div>
                    <div className="text-xs text-gray-500">
                      Status: <span className="capitalize">{s.status ?? 'draft'}</span>
                      {s.creatorId && ` · Creator ID: ${s.creatorId}`}
                    </div>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Link to={`/surveys/view/${s.id}`} className="text-blue-500 hover:underline">View</Link>
                    <Link to={`/surveys/results/${s.id}`} className="text-green-600 hover:underline">Results</Link>
                    <button className="text-red-600 hover:underline" onClick={() => handleDeleteSurvey(s.id!)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
