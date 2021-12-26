import { DocumentDefinition, FilterQuery, QueryOptions } from "mongoose"
import FavoriteModel, { FavoriteDocument } from "../model/like.model"

export const createFavorite = async(input: DocumentDefinition<Omit<FavoriteDocument,"createdAt" | "updatedAt">>)=>{
    return FavoriteModel.create(input)
}


export const findAllFavorites = async(query:FilterQuery<FavoriteDocument>,options:QueryOptions = {lean:true})=>{
    return FavoriteModel.find(query,{},options)
}

export const deleteFavorite = async(query: FilterQuery<FavoriteDocument>,
    )=> {
      return FavoriteModel.findOneAndDelete(query);
    }