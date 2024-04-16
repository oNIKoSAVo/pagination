import { createContext } from "react"


export interface Row {
    id: number,
    title?: string,
    canonical_brand?: number | null,
    canonical_brand_name?: string,
    type?: string | null,
    industry?: any[],
    country?: any[] | null,
    checkbox?: boolean,
}

export interface Synonym {
    id: number,
    synonym: string,
    canonical_brand__title?: string,
}
export type SynonymRow = Synonym

export type BrandRow = Row

export type ColumnConfig =  (
    {
        columnId: string;
        width: number;
        resizable: boolean;
        header: {
            type: string;
            text: string;
            id?: undefined;
            sortTop?: undefined;
        };
        cell: (el: BrandRow | SynonymRow) => {
            type: string;
            text: string;
        };
    } | {
        columnId: string;
        width: number;
        resizable: boolean;
        header: any;
        cell: (el: BrandRow | SynonymRow) => void;
    }
)[]

interface Context {
    pages?: number,
    totalItems?: number,
    rows?: Row[],
    methods?: any[],
}

export type State = Context

export enum Action {
    NOOP = 'noop',
    SET_ROWS = 'rows:set',
}
export interface DispatchAction {type: Action, data: any}
export type Reducer = (prevState: State, action: DispatchAction) => State

// const testRows = [
//     {
//         id: 0, title: "Hello, world!",
//         canonical_brand_name: '',
//         type: null,
//         // industry: undefined,
//     },
// ]

export const defaultContext: Context = {
    rows: [] as Row[],
    methods: undefined,
}

export type Cache = {
    [page: number]: Row[] | undefined,
}

export const BrandsContext = createContext<Context>(defaultContext as any as Context)

export function reducer(state: State, action: DispatchAction) {
    const {type, data} = action

    const newState = {...state}

    switch (type) {
        case Action.NOOP:
            break
        case Action.SET_ROWS:
            newState.rows = data.items
            newState.pages = data.pages
            newState.totalItems = data.totalItems
            break
        default:
            break
    }

    return newState
}

export const canonicalBrands = (context: Context) => {

}
