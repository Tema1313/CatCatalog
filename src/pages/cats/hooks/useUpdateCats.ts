import { useSearch } from "@tanstack/react-router";
import { useCatsStore } from "../model/catsStore";
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation";
import { getCats } from "@/shared/api/GET/getCats";

export const useUpdateCatList = () => {
    const { setCats } = useCatsStore((store) => store);
    const searchParams = useSearch({ from: "__root__" });
    const [loading, reqSim] = useRequestSimulation()

    const updateCatList = () => {
        return reqSim(() => {
            return getCats({
                breedId: searchParams.breedId ? Number(searchParams.breedId) : undefined,
                colorId: searchParams.colorId ? Number(searchParams.colorId) : undefined,
                coatId: searchParams.coatId ? Number(searchParams.coatId) : undefined,
                catTypeId: searchParams.catTypeId ? Number(searchParams.catTypeId) : undefined,
                name: searchParams.name ? searchParams.name : undefined,
                shortName: searchParams.shortName ? searchParams.shortName : undefined
            })
        }, 1500).then((response) => {
            setCats(response);
        });
    };

    return { updateCatList, isLoading: loading };
};
