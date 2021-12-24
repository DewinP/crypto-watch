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

export type SortCoinType = 'price_desc' | 'price_asc' | 'market_cap_desc' | 'market_cap_asc'