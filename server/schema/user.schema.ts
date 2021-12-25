import { object,string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
        username: string().max(15,"Name must be less than 15 characters").nonempty("Username required"),
        email: string().email("Not a valid email").nonempty("Email is required"),
        password: string().min(6, "Password too short. Should be atleast 6 characters minimum").nonempty("Password is required"),
        passwordConfirmation: string().nonempty("Password confirmation is required")
    }).refine((data)=> data.password === data.passwordConfirmation,{
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    })
})

export type CreateUserInputType = Omit<
    TypeOf<typeof createUserSchema>,
     "body.passwordConfirmation"
>