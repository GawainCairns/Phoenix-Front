import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/user';
import { User } from '../types/api';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load users.');
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  async function handleDelete(id: string | number) {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
    } catch (err: any) {
      alert(err?.message ?? 'Failed to delete user.');
    }
  }

  const filtered = users.filter(
    (u) =>
      (u.name ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (u.username ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (u.email ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-6 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Users</h2>

          <input
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Search by name, username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {error && (
            <div className="p-2 mb-4 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
          )}

          {loading ? (
            <div className="text-sm text-gray-500">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="text-sm text-gray-500">
              {search ? 'No users match your search.' : 'No users found.'}
            </div>
          ) : (
            <ul>
              {filtered.map((u) => (
                <li key={u.id} className="flex justify-between items-center border p-3 rounded mb-2 hover:bg-gray-50">
                  <div>
                    <div className="font-medium">{u.name ?? u.username}</div>
                    <div className="text-sm text-gray-600">{u.email}</div>
                    {u.username && u.name && (
                      <div className="text-xs text-gray-400">@{u.username}</div>
                    )}
                    {Array.isArray(u.permissions) && u.permissions.length > 0 && (
                      <div className="text-xs text-blue-500">{u.permissions.join(', ')}</div>
                    )}
                  </div>
                  <div className="flex gap-3 text-sm">
                    <Link to={`/profile`} className="text-blue-600 hover:underline">View</Link>
                    <button className="text-red-600 hover:underline" onClick={() => handleDelete(u.id!)}>
                      Remove
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
