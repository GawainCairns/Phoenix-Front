import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

type User = { id: number; name: string; email: string };

export default function UserList() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com' },
  ]);

  function removeUser(id: number) {
    setUsers((s) => s.filter((u) => u.id !== id));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="p-6 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <ul>
            {users.map((u) => (
              <li key={u.id} className="flex justify-between items-center border p-3 rounded mb-2">
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-sm text-gray-600">{u.email}</div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/profile`} className="text-blue-600">View</Link>
                  <button className="text-red-600" onClick={() => removeUser(u.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
