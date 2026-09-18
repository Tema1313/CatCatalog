import { useLanguage } from "@/i18n/hooks/useLanguage"
import type { ICat, ICatBreedType, ICatLocationType, ICoatType, IColor } from "@/shared/api/model"
import { catBreedsByLocale, catCoatTypesByLocale, catColorsByLocale, catLocationTypeByLocale } from "@/shared/api/testdata"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

const FormMode = {
    Create: "Create",
    Update: "Update",
} as const

type FormMode = typeof FormMode[keyof typeof FormMode]

export interface ICatForm {
    mode?: FormMode
    cat?: ICat
}

const CatFormSchema = z.object({
    name: z.string().optional(),
    shortName: z.string().optional(),
    mass: z.string({ message: "Required field" }).min(1, { message: "Required field" }),
    coatTypeId: z.string({ message: "Required field" }).min(1, { message: "Required field" }),
    colorId: z.string({ message: "Required field" }).min(1, { message: "Required field" }),
    breedTypeId: z.string({ message: "Required field" }).min(1, { message: "Required field" }),
    locationTypeId: z.string({ message: "Required field" }).min(1, { message: "Required field" }),
    softness: z.string({ message: "Required field" }),
    breadness: z.boolean().optional(),
    bigeyedness: z.string({ message: "Required field" }).min(1, { message: "Required field" }),
    owner: z.string().optional(),
    stars: z.string({ message: "Required field" }).min(1, { message: "Required field" })
})

type CatFormData = z.infer<typeof CatFormSchema>

export const useCatForm = (props: ICatForm) => {
    const [, reqSim] = useRequestSimulation()
    const { t, language } = useLanguage()

    const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false)
    const [isCatalogLoading, setIsCatalogLoading] = useState<boolean>(false)
    const [breedsList, setBreedsList] = useState<ICatBreedType[]>([])
    const [colorsList, setColorsList] = useState<IColor[]>([])
    const [catsTypeList, setCatsTypeList] = useState<ICatLocationType[]>([])
    const [coatsList, setCoatsList] = useState<ICoatType[]>([])

    const form = useForm<CatFormData>({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: zodResolver(CatFormSchema),
        values: props.mode === "Create" ? {
            coatTypeId: "",
            colorId: "",
            breedTypeId: "",
            locationTypeId: "",
            bigeyedness: "10",
            stars: "5",
            mass: "3",
            breadness: true,
            softness: ""
        } : {
            bigeyedness: props.cat?.bigeyedness ? String(props.cat?.bigeyedness) : "",
            breedTypeId: props.cat?.breedTypeId !== undefined ? String(props.cat?.breedTypeId) : "",
            name: props.cat?.name ?? "",
            shortName: props.cat?.shortName ?? "",
            coatTypeId: props.cat?.coatTypeId !== undefined ? String(props.cat?.coatTypeId) : "",
            colorId: props.cat?.colorId !== undefined ? String(props.cat?.colorId) : "",
            locationTypeId: props.cat?.locationTypeId !== undefined ? String(props.cat?.locationTypeId) : "",
            mass: props.cat?.mass ? String(props.cat?.mass) : "",
            stars: props.cat?.stars ? String(props.cat?.stars) : "5",
            breadness: props.cat?.breadness !== undefined ? props.cat?.breadness : true,
            owner: props.cat?.owner ?? "",
            softness: props.cat?.softness ?? ""
        }
    })

    const onSubmit = (data: CatFormData) => {
        setIsSubmitLoading(true)
        reqSim(() => {
            if (Number(data.stars) !== 5) {
                toast.error(t("cats.kitty-rating-error"))
                return
            } else {
                console.log(data)
                toast.error(t("common.technichal-problems"))
            }
        }, 2000).finally(() => {
            setIsSubmitLoading(false)
        })
    }

    useEffect(() => {
        setIsCatalogLoading(true)
        reqSim(() => {
            setBreedsList(catBreedsByLocale[language])
            setColorsList(catColorsByLocale[language])
            setCatsTypeList(catLocationTypeByLocale[language])
            setCoatsList(catCoatTypesByLocale[language])
        }).then(() => {
            setIsCatalogLoading(false)
        })
    }, [language])

    return [
        form,
        form.handleSubmit(onSubmit),
        { breedsList, colorsList, catsTypeList, coatsList, isSubmitLoading, isCatalogLoading }
    ] as const
}