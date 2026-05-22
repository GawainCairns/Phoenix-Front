export interface User {
	id?: string;
	username?: string;
	name?: string;
	email?: string;
	description?: string;
	permissions?: string[];
	updated_by?: string;
	[key: string]: any;
}

export interface UserCreate {
	username: string;
	name?: string;
	email?: string;
	description?: string;
	password_hash: string;
	permissions?: string[];
	updated_by?: string;
}

export interface Credentials {
	username?: string;
	email?: string;
	password: string;
}