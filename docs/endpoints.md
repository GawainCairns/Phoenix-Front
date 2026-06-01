# API Endpoints

This document lists all HTTP endpoints in the project, the expected request body to avoid errors, and the typical responses.

## Root

- **GET /**: Returns API status.
	- Response: `200` JSON `{ message: 'SurveyApp API running' }`

- **GET /health**: Health check.
	- Response: `200` (empty body)

- **POST /echo**: Echoes request body.
	- Body: any JSON
	- Response: `200` JSON `{ received: <your body> }`

## DB

- **GET /db/**
	- Response: `200` JSON `{ message: 'DB router placeholder' }`

- **GET /db/test**
	- Response: `200` JSON `{ ok: true, now: '<timestamp>' }` on success, `500` JSON `{ ok: false, error: '<message>' }` on error.

## Admin

- **GET /admin/**
	- Response: `200` JSON `{ admin: 'stub' }`

## Auth

- **GET /auth/status**
	- Response: `200` JSON `{ auth: 'ok' }`

- **POST /auth/login**
	- Body: JSON with either `{ username, password }` or `{ email, password }`.
		- Required: `password` and one of `username` or `email`.
	- Success Response: `200` JSON user object (password_hash removed).
	- Errors: `400` if missing fields, `401` for invalid credentials, `500` for server error.

## Survey

- **GET /survey/**
	- Response: `200` JSON array of surveys.

- **GET /survey/:id**
	- Response: `200` JSON survey object or `404` `{ error: 'Survey not found' }`.

- **POST /survey/**
	- Body: JSON `{ code, survey_name, description, status, creator_id, updated_by }` (provide the fields you need; at minimum `survey_name`/`code` depending on your DB constraints).
	- Response: `201` JSON created survey object.
	- Errors: `500` on DB/server error.

- **PUT /survey/:id**
	- Body: any of `{ code, survey_name, description, status, creator_id, updated_by }`.
		- If no valid fields provided, returns `400` JSON `{ error: 'No valid fields provided' }`.
	- Response: `200` JSON updated survey object.

- **DELETE /survey/:id**
	- Response: `204` No Content on success.

- **GET /survey/public**
	- Response: `200` JSON single survey object with `status = "public"`, or `404` `{ error: 'No public surveys found' }` if none.

- **GET /survey/creator/:id**
	- Response: `200` JSON single survey object created by the given creator id, or `404` `{ error: 'No surveys found for this creator' }`.

## User

- **GET /user/**
	- Response: `200` JSON array of users.

- **GET /user/:id**
	- Response: `200` JSON user object or `404` `{ error: 'User not found' }`.

- **POST /user/**
	- Body: JSON `{ username, name, email, description, password_hash, permissions, updated_by }`.
		- Provide required fields per your DB (at minimum `username` and `password_hash` if enforced by schema).
	- Response: `201` JSON created user object.

- **PUT /user/:id**
	- Body: any of `username, name, email, description, password_hash, permissions, updated_by`.
		- If none provided, returns `400` `{ error: 'No valid fields provided' }`.
	- Response: `200` JSON updated user object.

- **DELETE /user/:id**
	- Response: `204` No Content on success.

## Question

- **GET /question/**
	- Response: `200` JSON array of questions.

- **GET /question/:id**
	- Response: `200` JSON question object or `404` `{ error: 'Question not found' }`.

- **POST /question/**
	- Body: JSON `{ survey_id, question, type, creator_id, updated_by }`.
		- Required fields depend on DB constraints; provide at least `survey_id` and `question`.
	- Response: `201` JSON created question object.

- **PUT /question/:id**
	- Body: any of `{ survey_id, question, type, creator_id, updated_by }`.
		- If no valid fields provided, returns `400` `{ error: 'No valid fields provided' }`.
	- Response: `200` JSON updated question object.

- **DELETE /question/:id**
	- Response: `204` No Content on success.

## Answer

- **GET /answer/**
	- Response: `200` JSON array of answers.

- **GET /answer/:id**
	- Response: `200` JSON answer object or `404` `{ error: 'Answer not found' }`.

- **POST /answer/**
	- Body: JSON `{ question_id, answer, respondent_id, updated_by }`.
		- Provide `question_id` and `answer` at minimum.
	- Response: `201` JSON created answer object.

- **PUT /answer/:id**
	- Body: any of `{ question_id, answer, respondent_id, updated_by }`.
		- If no valid fields provided, returns `400` `{ error: 'No valid fields provided' }`.
	- Response: `200` JSON updated answer object.

- **DELETE /answer/:id**
	- Response: `204` No Content on success.

## Response (responses resource)

- **GET /response/**
	- Response: `200` JSON array of responses.

- **GET /response/:id**
	- Response: `200` JSON response object or `404` `{ error: 'Response not found' }`.

- **POST /response/**
	- Body: JSON `{ survey_id, question_id, respondent_id, answer }`.
		- Provide `survey_id`, `question_id`, and `answer` to avoid DB constraint errors.
	- Response: `201` JSON created response object.

- **DELETE /response/:id**
	- Response: `204` No Content on success.


---
Notes:
- All endpoints return `500` with `{ error: '<message>' }` on unexpected server/database errors.
- For PUT endpoints, the server validates that at least one allowed field is provided and returns `400` if not.

