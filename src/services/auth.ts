import { Credentials, UserCreate, User } from "../types/api";

const baseUrl = (import.meta as any).env?.VITE_API_BASE_URL ?? '';

async function handleResponse(res: Response, expectedStatus: number) {
	const text = await res.text();
	let body: any = null;
	try {
		body = text ? JSON.parse(text) : null;
	} catch (e) {
		body = text;
	}

	if (res.status === expectedStatus) return body;

	const err: any = new Error(body?.message || res.statusText || 'Request failed');
	err.status = res.status;
	err.body = body;
	throw err;
}

/**
 * POST /auth/login
 * Body: { username?, email?, password }
 * Success: 200 -> user object
 */
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

/**
 * POST /user/
 * Body: UserCreate
 * Success: 201 -> created user object
 */
export async function createUser(user: UserCreate): Promise<User> {
	if (!user || !user.username || !user.password_hash) {
		const err: any = new Error('Missing required fields: username and password_hash');
		err.status = 400;
		throw err;
	}

	const res = await fetch(`${baseUrl}/user/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(user),
	});

	return handleResponse(res, 201);
}

export default {
	login,
	createUser,
};

