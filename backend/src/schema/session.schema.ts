import {object, string} from 'zod'

export const createSessionSchema = object({
    body: object({
        username: string().nonempty("Username is required"),
        password: string().nonempty("Password is required"),
    })
})