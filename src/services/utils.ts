export const baseUrl = (import.meta as any).env?.VITE_API_BASE_URL ?? '';

export async function handleResponse(res: Response, expectedStatus: number): Promise<any> {
	const text = await res.text();
	let body: any = null;
	try {
		body = text ? JSON.parse(text) : null;
	} catch {
		body = text;
	}

	if (res.status === expectedStatus) return body;

	const errMessage =
		body?.message ||
		body?.error ||
		(typeof body === 'string' ? body : undefined) ||
		res.statusText ||
		'Request failed';
	const err: any = new Error(errMessage);
	err.status = res.status;
	err.body = body;
	throw err;
}
