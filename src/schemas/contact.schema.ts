import z from "zod";

export const ContactSchema = z.object({
    full_name: z.string().nonempty('Full Name must be filled!'),
    email: z.string().nonempty('Email must be filled!').email('Format email is invalid'),
    subject: z.string().nonempty('Subject must be filled!'),
    message: z.string().nonempty('Message must be filled!'),
    // token: z.string().min(1),
})

export type ContactInput = z.infer<typeof ContactSchema>