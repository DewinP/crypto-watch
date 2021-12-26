import { CreateFavoriteInput} from "../schema/favorite.schema";
import { createFavorite, deleteFavorite, findAllFavorites } from "../service/favorite.service";
import { Request, Response } from "express";



export const createFavoriteHandler = async (req: Request<CreateFavoriteInput["params"],{},{}>, res: Response) => {
    const user_id= res.locals.user._id;
    const coin_id = req.params.coin_id;

    const comment = createFavorite({coin_id, user_id})
    res.status(201).json(comment)
}


export const findFavorites = async (_: Request, res: Response) => {
    const favorites= await findAllFavorites({})
    return res.send(favorites)
}

export async function deleteFavoriteHandler(
    req: Request,
    res: Response
  ) {
    const user_id= res.locals.user._id;
    const coin_id = req.params.coin_id;
    
    const deletedFavorite = await deleteFavorite({coin_id,user_id });

    return res.send(deletedFavorite);
  }