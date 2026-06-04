import React, { useEffect, useState } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { useAuth } from '../../contexts/AuthContext';
import { getUserById, updateUser } from '../../services/user';
import { UserUpdate } from '../../types/api';

export default function Profile() {
  const { user: authUser, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!authUser?.id) {
      setLoading(false);
      return;
    }
    async function loadProfile() {
      try {
        const u = await getUserById(authUser!.id!);
        setName(u.name ?? '');
        setUsername(u.username ?? '');
        setEmail(u.email ?? '');
        setDescription(u.description ?? '');
      } catch (err: any) {
        // Fall back to stored auth data
        setName(authUser!.name ?? '');
        setUsername(authUser!.username ?? '');
        setEmail(authUser!.email ?? '');
        setDescription(authUser!.description ?? '');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [authUser]);

  async function handleSave() {
    if (!authUser?.id) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const data: UserUpdate = { name, username, email, description };
      const updated = await updateUser(authUser.id, data);
      setUser({ ...authUser, ...updated });
      setEditing(false);
      setSuccess('Profile updated successfully.');
    } catch (err: any) {
      setError(err?.message ?? 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    setEditing(false);
    setError(null);
    // Restore from authUser
    setName(authUser?.name ?? '');
    setUsername(authUser?.username ?? '');
    setEmail(authUser?.email ?? '');
    setDescription(authUser?.description ?? '');
  }

  const inputClass = (editable: boolean) =>
    `border border-gray-300 rounded-lg p-1 mb-2 ${editable ? 'bg-white' : 'bg-gray-50 text-gray-600'}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-sm border border-gray-300 rounded-2xl p-4">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Profile</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="flex flex-col border-gray-300 rounded">
              <div className="border-t border-gray-300 mb-2 mt-2"></div>

              {error && (
                <div className="p-2 mb-2 text-sm text-red-700 bg-red-100 border border-red-300 rounded">{error}</div>
              )}
              {success && (
                <div className="p-2 mb-2 text-sm text-green-700 bg-green-100 border border-green-300 rounded">{success}</div>
              )}

              <div className="flex flex-col mb-2">
                <label>Name:</label>
                <input type="text" className={inputClass(editing)} value={name}
                  readOnly={!editing} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex flex-col mb-2">
                <label>Username:</label>
                <input type="text" className={inputClass(editing)} value={username}
                  readOnly={!editing} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="flex flex-col mb-2">
                <label>Email:</label>
                <input type="email" className={inputClass(editing)} value={email}
                  readOnly={!editing} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col mb-2">
                <label>Description:</label>
                <textarea className={`${inputClass(editing)} max-h-40`} value={description}
                  readOnly={!editing} onChange={(e) => setDescription(e.target.value)} />
              </div>

              <div className="border-t border-gray-300 mt-2"></div>
              <div className="flex gap-2 mt-4">
                {editing ? (
                  <>
                    <button
                      className="flex-1 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 disabled:opacity-50"
                      onClick={handleSave} disabled={saving}
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      className="flex-1 bg-gray-200 text-gray-700 rounded-lg p-2 hover:bg-gray-300"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="flex-1 bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
                    onClick={() => { setEditing(true); setSuccess(null); }}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
