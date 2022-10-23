import {useMemo} from "react";


export function useQuery(search){
    return useMemo(() => new URLSearchParams(search), [search]);
}