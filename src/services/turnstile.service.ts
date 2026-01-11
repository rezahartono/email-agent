export async function verifyTurnstile(token: string, ip?: string) {
    const res = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY!,
                response: token,
                ...(ip && { remoteip: ip }),
            }),
        }
    )

    return res.json() as Promise<{
        success: boolean
        'error-codes'?: string[]
    }>
}
