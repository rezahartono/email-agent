import type { Context } from "hono";
import { ContactSchema } from "../schemas/contact.schema.js";
import { MailService } from "../services/mail.service.js";

export const SendEmailHandler = async (c: Context) => {
    const body = await c.req.json()

    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
        return c.json(
            {
                success: false,
                errors: parsed.error.flatten().fieldErrors,
            },
            400
        )
    }

    // const { token } = parsed.data
    // const ip = c.req.header('cf-connecting-ip')
    // const turnstile = await verifyTurnstile(turnstileToken, ip)

    // if (!turnstile.success) {
    //     return c.json(
    //         { success: false, message: 'Bot verification failed' },
    //         403
    //     )
    // }
    const mailService = new MailService()

    try {
        await mailService.send(parsed.data)
        return c.json({
            success: true,
            message: 'Message sent successfully',
        })
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        return c.json(
            { success: false, message: 'Failed to send email' },
            500
        )
    }
}