import { object, string, TypeOf } from 'zod'


const params = {
    params: object({
        user_id: string(),
        coin_id: string(),
    })
}


   export const createFavoriteSchema = object({
       ...params
   })
   
   export const findFavoritesSchema = object({
       ...params
   })

export type CreateFavoriteInput = TypeOf<typeof createFavoriteSchema>
export type FindFavortieInput = TypeOf<typeof findFavoritesSchema>