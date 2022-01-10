export interface ISignupInput {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface ILoginInput {
    username: string;
    password: string;
}

export interface ICoin {
    id: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_change_percentage_24h: number;
    market_cap_rank: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    circulating_supply: number;
    max_supply: number;
}

export interface ISingleCoin {
    id: string;
    name: string;
    symbol: string;
    description: {
        en: string;
    }
    image: {
        large: string;
        small: string;
    }
    market_data: {
        current_price: {
            usd: number;
        }
        market_cap: {
            usd: number;
        }
        market_cap_rank: number
        total_volume: {
            usd: number;
        }   
        high_24h: {
            usd: number;
        }
        low_24h: {
            usd: number;
        }
        circulating_supply: number;
        price_change_24h: number
    }

    
}


export interface IUser {
    _id: string;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    session: string;
    iat: number;
    exp: number;
}




export interface IFavoriteCoin {
    coin_id: string;
    _id: string;
    user_id: string;
}

export type SortCoinType = 'price_desc' | 'price_asc' | 'market_cap_desc' | 'market_cap_asc' | 'like';

export interface ISessionPayload{
    refreshToken:string;
    accessToken:string;
    user:IUser;
}