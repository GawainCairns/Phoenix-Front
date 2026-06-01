import { Question, QuestionCreate, QuestionUpdate } from "../types/api";
import { baseUrl, handleResponse } from "./utils";

export async function getQuestions(): Promise<Question[]> {
	const res = await fetch(`${baseUrl}/question/`);
	return handleResponse(res, 200);
}

export async function getQuestionById(id: string | number): Promise<Question> {
	const res = await fetch(`${baseUrl}/question/${id}`);
	return handleResponse(res, 200);
}

export async function createQuestion(data: QuestionCreate): Promise<Question> {
	const res = await fetch(`${baseUrl}/question/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return handleResponse(res, 201);
}

export async function updateQuestion(id: string | number, data: QuestionUpdate): Promise<Question> {
	const res = await fetch(`${baseUrl}/question/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return handleResponse(res, 200);
}

export async function deleteQuestion(id: string | number): Promise<void> {
	const res = await fetch(`${baseUrl}/question/${id}`, { method: 'DELETE' });
	return handleResponse(res, 204);
}

export default { getQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion };
