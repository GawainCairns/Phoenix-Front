import React from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Link } from 'react-router-dom';
import { UserCreate } from '../../types/api';
import { createUser } from '../../services/auth';

function validateForm() {
  // Implement form validation logic here
  return true;
}

async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (!validateForm()) {
    alert('Please fill in all required fields correctly.');
    return;
  } else {
    // Handle registration logic here
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm-password') as string;
    console.log('Name:', name);
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    } else {
      alert(`Registered user: ${name} (mock)`);
      try {
        const newUser: UserCreate = { username: username , email: email, password_hash: password, name: name };
        const createdUser = await createUser(newUser);
        alert(`User created: ${createdUser.name} (mock)`);
      } catch (err: any) {
        alert(`Registration failed: ${err.message}`);
      }
    }
  }
}

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="w-full max-w-sm p-4 border border-gray-300 rounded-2xl">
          <h2 className="mb-4 text-2xl font-bold text-center text-gray-700">Register</h2>
          <form className="flex flex-col border-gray-300 rounded" onSubmit={handleRegister}>
            <div className="flex flex-col mt-2 mb-2 border-t border-gray-300"></div>
            <div className="flex flex-col mb-2">
              <label htmlFor="name">Name:</label>
              <input className="p-1 border border-gray-300 rounded-lg" type="text" id="name" name="name" required />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="username">Username:</label>
              <input className="p-1 border border-gray-300 rounded-lg" type="text" id="username" name="username" />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Email:</label>
              <input className="p-1 border border-gray-300 rounded-lg" type="email" id="email" name="email" required />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="password">Password:</label>
              <input className="p-1 border border-gray-300 rounded-lg" type="password" id="password" name="password" required />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input className="p-1 border border-gray-300 rounded-lg" type="password" id="confirm-password" name="confirm-password" required />
            </div>
            <div className="flex flex-col mt-2 mb-2 border-t border-gray-300"></div>
            <div>
              <Link className="text-blue-500" to="/login">Already have an account? Login</Link>
            </div>
            <button className="p-2 text-white bg-blue-500 rounded-lg" type="submit">Register</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}