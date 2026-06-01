import { User, UserUpdate } from "../types/api";
import { baseUrl, handleResponse } from "./utils";

export async function getUsers(): Promise<User[]> {
	const res = await fetch(`${baseUrl}/user/`);
	return handleResponse(res, 200);
}

export async function getUserById(id: string | number): Promise<User> {
	const res = await fetch(`${baseUrl}/user/${id}`);
	return handleResponse(res, 200);
}

export async function updateUser(id: string | number, data: UserUpdate): Promise<User> {
	const res = await fetch(`${baseUrl}/user/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return handleResponse(res, 200);
}

export async function deleteUser(id: string | number): Promise<void> {
	const res = await fetch(`${baseUrl}/user/${id}`, { method: 'DELETE' });
	return handleResponse(res, 204);
}

export default { getUsers, getUserById, updateUser, deleteUser };
