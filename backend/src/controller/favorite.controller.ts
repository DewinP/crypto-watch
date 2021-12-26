import { CreateFavoriteInput} from "../schema/favorite.schema";
import { createFavorite, deleteFavorite, findAllFavorites } from "../service/favorite.service";
import { Request, Response } from "express";



export const createFavoriteHandler = async (req: Request<CreateFavoriteInput["params"],{},CreateFavoriteInput["body"]>, res: Response) => {
    const user_id= res.locals.user._id;
    const coin_id = req.body.coin_id;

    const comment = createFavorite({coin_id, user_id})
    res.status(201).json(comment)
}


export const findAllFavoritesByUser = async (_: Request, res: Response) => {
    const user_id = res.locals.user.user_id;
    const favorites= await findAllFavorites({user_id})
    return res.send(favorites)
}

export async function deleteFavoriteHandler(
    req: Request,
    res: Response
  ) {
    const coin_id = req.params.coin_id;
    
    const deletedFavorite = await deleteFavorite({coin_id});

    return res.send(deletedFavorite);
  }