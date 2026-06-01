import { SurveyResponse, SurveyResponseCreate } from "../types/api";
import { baseUrl, handleResponse } from "./utils";

export async function getResponses(): Promise<SurveyResponse[]> {
	const res = await fetch(`${baseUrl}/response/`);
	return handleResponse(res, 200);
}

export async function getResponseById(id: string | number): Promise<SurveyResponse> {
	const res = await fetch(`${baseUrl}/response/${id}`);
	return handleResponse(res, 200);
}

export async function createResponse(data: SurveyResponseCreate): Promise<SurveyResponse> {
	const res = await fetch(`${baseUrl}/response/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return handleResponse(res, 201);
}

export async function deleteResponse(id: string | number): Promise<void> {
	const res = await fetch(`${baseUrl}/response/${id}`, { method: 'DELETE' });
	return handleResponse(res, 204);
}

export default { getResponses, getResponseById, createResponse, deleteResponse };
