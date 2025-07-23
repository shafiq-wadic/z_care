import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest,) {
    if (request.method === "POST") {
        const req = await request.json();
        console.log("req", req);
    }
}
