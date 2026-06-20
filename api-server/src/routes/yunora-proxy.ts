import { Router } from "express";

const router = Router();

const YUNORA_API = process.env.YUNORA_API_URL || "https://yunora-enterprise-system-1.onrender.com";
const ADMIN_EMAIL = process.env.YUNORA_ADMIN_EMAIL || "";
const ADMIN_PASSWORD = process.env.YUNORA_ADMIN_PASSWORD || "";

let sessionCookie: string | null = null;
let sessionExpiry = 0;

async function getSession(): Promise<string> {
  if (sessionCookie && Date.now() < sessionExpiry) return sessionCookie;

  const res = await fetch(`${YUNORA_API}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });

  if (!res.ok) throw new Error(`Yunora login failed: ${res.status}`);

  const setCookie = res.headers.get("set-cookie");
  if (!setCookie) throw new Error("No session cookie returned from Yunora API");

  // Extract the cookie value
  const match = setCookie.match(/yunora\.sid=[^;]+/);
  if (!match) throw new Error("Could not parse yunora.sid from Set-Cookie");

  sessionCookie = match[0];
  // Expire 30 minutes before the actual expiry (cookie lasts 24h)
  sessionExpiry = Date.now() + 23 * 60 * 60 * 1000;

  return sessionCookie;
}

// Forward any /yunora/* request to the Yunora backend with auth
router.all("/yunora/*splat", async (req, res) => {
  try {
    const cookie = await getSession();

    // Strip our /yunora prefix to get the real backend path
    const backendPath = req.url.replace(/^\/yunora/, "");
    const url = `${YUNORA_API}${backendPath}`;

    const isWrite = ["POST", "PUT", "PATCH", "DELETE"].includes(req.method);

    const upstream = await fetch(url, {
      method: req.method,
      headers: {
        "Cookie": cookie,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: isWrite ? JSON.stringify(req.body) : undefined,
    });

    const data = await upstream.json().catch(() => null);
    res.status(upstream.status).json(data);
  } catch (err: any) {
    res.status(502).json({ error: "Proxy error", message: err.message });
  }
});

export default router;
