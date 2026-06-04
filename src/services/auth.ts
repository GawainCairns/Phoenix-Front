import { Credentials, UserCreate, User } from "../types/api";
import { baseUrl, handleResponse } from "./utils";

export async function login(creds: Credentials): Promise<User> {
	if (!creds || !creds.password || (!creds.username && !creds.email)) {
		const err: any = new Error('Missing required fields: password and one of username or email');
		err.status = 400;
		throw err;
	}

	const res = await fetch(`${baseUrl}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(creds),
	});

	return handleResponse(res, 200);
}

export async function createUser(user: UserCreate): Promise<User> {
	if (!user || !user.username || !(user as any).passwordHash) {
		const err: any = new Error('Missing required fields: username and passwordHash');
		err.status = 400;
		throw err;
	}

	// Some backends expect the field to be named `password` instead of `passwordHash`.
	// Send both to maximize compatibility.
	const payload: any = { ...user, password: (user as any).passwordHash };

	const res = await fetch(`${baseUrl}/user/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	return handleResponse(res, 201);
}

export default {
	login,
	createUser,
};

