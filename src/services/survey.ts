import { Survey, SurveyCreate, SurveyUpdate } from "../types/api";
import { baseUrl, handleResponse } from "./utils";

export async function getSurveys(): Promise<Survey[]> {
	const res = await fetch(`${baseUrl}/survey/`);
	return handleResponse(res, 200);
}

export async function getSurveyById(id: string | number): Promise<Survey> {
	const res = await fetch(`${baseUrl}/survey/${id}`);
	return handleResponse(res, 200);
}

export async function getPublicSurvey(): Promise<Survey> {
	const res = await fetch(`${baseUrl}/survey/public`);
	return handleResponse(res, 200);
}

export async function getSurveyByCreator(creatorId: string | number): Promise<Survey> {
	const res = await fetch(`${baseUrl}/survey/creator/${creatorId}`);
	return handleResponse(res, 200);
}

export async function createSurvey(data: SurveyCreate): Promise<Survey> {
	const res = await fetch(`${baseUrl}/survey/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return handleResponse(res, 201);
}

export async function updateSurvey(id: string | number, data: SurveyUpdate): Promise<Survey> {
	const res = await fetch(`${baseUrl}/survey/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return handleResponse(res, 200);
}

export async function deleteSurvey(id: string | number): Promise<void> {
	const res = await fetch(`${baseUrl}/survey/${id}`, { method: 'DELETE' });
	return handleResponse(res, 204);
}

export default {
	getSurveys,
	getSurveyById,
	getPublicSurvey,
	getSurveyByCreator,
	createSurvey,
	updateSurvey,
	deleteSurvey,
};
