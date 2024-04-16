import { useEffect, useReducer, useState } from "react"

import useCachePage from "./cache"


interface PaginatedResponseContent {
    items: any[],
    pages: number,
    totalItems: number,
}

export function useHookPagination(
    reducer: any, initializer: any,
    getRows: any, API_URL: any,
    loading: boolean, setLoading: any,
) {
    const [state, dispatch] = useReducer<(prevState: typeof initializer, action: { type: string, data: any }) => typeof initializer>(
        reducer, initializer
    )

    const {
        page, setPage, cache, setCache,
    } = useCachePage(state)

    const [invalidateCache, setInvalidateCache] = useState(true);

    useEffect(() => {
        let p;
        if (typeof page === 'number' && loading) {
            if (cache[page] && cache[page] && !invalidateCache) {
                // Если есть закешированные данные и кэш не инвалидирован, используем их
                p = Promise.resolve({
                    items: cache[page],
                    // FIXME: resolve TS complaints
                    pages: state.pages, totalItems: state.totalItems
                })
            } else {
                
                p = getRows(API_URL, page);
            }
        }
        p?.then(
            (content: PaginatedResponseContent) => {
                dispatch({
                    type: 'rows:set',
                    data: { ...content },
                })
                setCache({
                    ...cache,
                    [page]: content.items,
                })
            }
        ).finally(() => {
            setInvalidateCache(false);
            setLoading(false);
            // window.location?.search ? clearURL() : null;
        });
    }, [page, loading, cache, invalidateCache]);

    return {
        state,
        page, setPage, 
    }
}
