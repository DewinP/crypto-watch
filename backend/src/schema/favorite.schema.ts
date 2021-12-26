import { boolean, object, string, TypeOf } from 'zod'


const payload = {
    body: object({
        coin_id:string().nonempty(),

    })
}

const params = {
    params: object({
        user_id: string(),
    })
}


   export const createFavoriteSchema = object({
       ...payload,
       ...params
   })
   
   export const findFavoritesSchema = object({
       ...params
   })

export type CreateFavoriteInput = TypeOf<typeof createFavoriteSchema>
export type FindFavortieInput = TypeOf<typeof findFavoritesSchema>