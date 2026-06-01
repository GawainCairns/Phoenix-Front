export interface User {
	id?: string;
	username?: string;
	name?: string;
	email?: string;
	description?: string;
	permissions?: string[];
	[key: string]: any;
}

export interface UserCreate {
	username: string;
	name?: string;
	email?: string;
	description?: string;
	password_hash: string;
	permissions?: string[];
}

export interface Credentials {
	username?: string;
	email?: string;
	password: string;
}

export interface UserUpdate {
	username?: string;
	name?: string;
	email?: string;
	description?: string;
	password_hash?: string;
	permissions?: string[];
	updated_by?: string | number;
}

export interface Survey {
	id?: string | number;
	code?: string;
	survey_name?: string;
	description?: string;
	status?: string;
	creator_id?: string | number;
	updated_by?: string | number;
	[key: string]: any;
}

export interface SurveyCreate {
	survey_name: string;
	code?: string;
	description?: string;
	status?: string;
	creator_id?: string | number;
	updated_by?: string | number;
}

export interface SurveyUpdate {
	code?: string;
	survey_name?: string;
	description?: string;
	status?: string;
	creator_id?: string | number;
	updated_by?: string | number;
}

export interface Question {
	id?: string | number;
	survey_id?: string | number;
	question?: string;
	type?: string;
	creator_id?: string | number;
	updated_by?: string | number;
	[key: string]: any;
}

export interface QuestionCreate {
	survey_id: string | number;
	question: string;
	type?: string;
	creator_id?: string | number;
	updated_by?: string | number;
}

export interface QuestionUpdate {
	survey_id?: string | number;
	question?: string;
	type?: string;
	creator_id?: string | number;
	updated_by?: string | number;
}

export interface Answer {
	id?: string | number;
	question_id?: string | number;
	answer?: string;
	respondent_id?: string | number;
	updated_by?: string | number;
	[key: string]: any;
}

export interface AnswerCreate {
	question_id: string | number;
	answer: string;
	respondent_id?: string | number;
	updated_by?: string | number;
}

export interface AnswerUpdate {
	question_id?: string | number;
	answer?: string;
	respondent_id?: string | number;
	updated_by?: string | number;
}

export interface SurveyResponse {
	id?: string | number;
	survey_id?: string | number;
	question_id?: string | number;
	respondent_id?: string | number;
	answer?: string;
	[key: string]: any;
}

export interface SurveyResponseCreate {
	survey_id: string | number;
	question_id: string | number;
	answer: string;
	respondent_id?: string | number;
}