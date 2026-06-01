import { Answer, AnswerCreate, AnswerUpdate } from "../types/api";
import { baseUrl, handleResponse } from "./utils";

export async function getAnswers(): Promise<Answer[]> {
	const res = await fetch(`${baseUrl}/answer/`);
	return handleResponse(res, 200);
}

export async function getAnswerById(id: string | number): Promise<Answer> {
	const res = await fetch(`${baseUrl}/answer/${id}`);
	return handleResponse(res, 200);
}

export async function createAnswer(data: AnswerCreate): Promise<Answer> {
	const res = await fetch(`${baseUrl}/answer/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return handleResponse(res, 201);
}

export async function updateAnswer(id: string | number, data: AnswerUpdate): Promise<Answer> {
	const res = await fetch(`${baseUrl}/answer/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return handleResponse(res, 200);
}

export async function deleteAnswer(id: string | number): Promise<void> {
	const res = await fetch(`${baseUrl}/answer/${id}`, { method: 'DELETE' });
	return handleResponse(res, 204);
}

export default { getAnswers, getAnswerById, createAnswer, updateAnswer, deleteAnswer };
