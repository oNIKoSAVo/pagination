import { useEffect, useState } from "react"

import { Cache } from "./model"

export default function useCachePage(
    state: any
) {
    const [page, setPage] = useState<number>(1)
    const [cache, setCache] = useState<Cache>({
        [page]: state.rows || [],
    })

    return {
        page, setPage,
        cache, setCache,
    }
}

export function useButtonCache(
    state: any, clickSearchButton:boolean
) {
    const [buttonCreate, setButtonCreate] = useState(true);
    useEffect(() => {
        if (state.totalItems === 0 && clickSearchButton) {
            setButtonCreate(false);
        }
        else {
            setButtonCreate(true);
        }

    }, [state, clickSearchButton]);
    return {
        buttonCreate
    }
}