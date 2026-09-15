import { getRgb } from "@/pages/catalogs/colors/utils/getRgb"
import type { ICatBreedType, ICatLocationType, ICoatType, IColor } from "@/shared/api/model"
import { catBreeds, catCoatTypes, catColors, catLocationType } from "@/shared/api/testdata"
import { Button } from "@/shared/components/ui/button"
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/shared/components/ui/combobox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useState, type FC } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

interface IFiltersProps {}

export const FiltersSchema = z.object({
	name: z.string().optional().catch(undefined),
	shortName: z.string().optional().catch(undefined),
	catTypeId: z.union([z.string(), z.number()]).optional(),
	colorId: z.union([z.string(), z.number()]).optional(),
	breedId: z.union([z.string(), z.number()]).optional(),
	coatId: z.union([z.string(), z.number()]).optional(),
})

export type FilterFormData = z.infer<typeof FiltersSchema>

export const Filters: FC<IFiltersProps> = () => {
	const [loading, reqSim] = useRequestSimulation()
	const searchParams = useSearch({ from: "__root__" })
	const navigate = useNavigate({ from: "/" })
	const defaultOption: { id?: number; name?: string } = { id: -1, name: "Все" }

	const [search, setSearch] = useState<{
		color: string
		catType: string
		coat: string
		breed: string
	}>({
		color: "",
		catType: "",
		breed: "",
		coat: "",
	})
	const [breedsList, setBreedsList] = useState<ICatBreedType[]>([])
	const [colorsList, setColorsList] = useState<IColor[]>([])
	const [catsTypeList, setCatsTypeList] = useState<ICatLocationType[]>([])
	const [coatsList, setCoatsList] = useState<ICoatType[]>([])

	const breeds: ICatBreedType[] = [defaultOption, ...breedsList]
	const colors: IColor[] = [defaultOption, ...colorsList]
	const catsTypes: ICatLocationType[] = [defaultOption, ...catsTypeList]
	const coats: ICoatType[] = [defaultOption, ...coatsList]

	const form = useForm<FilterFormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(FiltersSchema),
		defaultValues: {
			name: searchParams.name ? searchParams.name : "",
			shortName: searchParams.shortName ? searchParams.shortName : "",
			catTypeId: searchParams.catTypeId !== undefined ? String(searchParams.catTypeId) : "-1",
			colorId: searchParams.colorId !== undefined ? String(searchParams.colorId) : "-1",
			breedId: searchParams.breedId !== undefined ? String(searchParams.breedId) : "-1",
			coatId: searchParams.coatId !== undefined ? String(searchParams.coatId) : "-1",
		},
	})

	const onSubmit = (data: FilterFormData) => {
		navigate({
			search: () => ({
				name: data.name ? data.name : undefined,
				shortName: data.shortName ? data.shortName : undefined,
				catTypeId: data.catTypeId !== "-1" ? Number(data.catTypeId) : undefined,
				colorId: data.colorId !== "-1" ? Number(data.colorId) : undefined,
				breedId: data.breedId !== "-1" ? Number(data.breedId) : undefined,
				coatId: data.coatId !== "-1" ? Number(data.coatId) : undefined,
			}),
		})
	}

	useEffect(() => {
		reqSim(() => {
			setBreedsList(catBreeds)
			setColorsList(catColors)
			setCatsTypeList(catLocationType)
			setCoatsList(catCoatTypes)
		})
	}, [])

	useEffect(() => {
		form.reset({
			name: searchParams.name ? searchParams.name : "",
			shortName: searchParams.shortName ? searchParams.shortName : "",
			catTypeId: searchParams.catTypeId !== undefined && !loading ? String(searchParams.catTypeId) : "-1",
			breedId: searchParams.breedId !== undefined && !loading ? String(searchParams.breedId) : "-1",
			colorId: searchParams.colorId !== undefined && !loading ? String(searchParams.colorId) : "-1",
			coatId: searchParams.coatId !== undefined && !loading ? String(searchParams.coatId) : "-1",
		})
	}, [searchParams, loading])

	return (
		<div className={`mx-2 my-4 ${loading ? "pointer-events-none opacity-50" : ""}`}>
			<Form {...form}>
				<form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="shortName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Короткое имя</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="colorId"
						control={form.control}
						render={({ field }) => {
							const selectedColor =
								field.value === "-1"
									? (defaultOption as unknown as IColor)
									: colors.find((color) => String(color.id) === String(field.value))
							const selectedColorRgb = getRgb(selectedColor?.rgb || "")

							return (
								<FormItem className="w-full min-w-0">
									<FormLabel>Цвет</FormLabel>

									<Combobox
										value={field.value ? String(field.value) : undefined}
										onValueChange={(val) => {
											field.onChange(val)
											setSearch((prev) => ({
												...prev,
												color: "",
											}))
										}}
										items={colors}
									>
										<div className="relative w-full">
											{selectedColorRgb && !search.color && (
												<div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
													<div
														style={{
															backgroundColor: `rgb(${selectedColorRgb?.r},${selectedColorRgb?.g},${selectedColorRgb?.b})`,
														}}
														className="border border-solid border-black rounded-full w-[14px] h-[14px]"
													/>
												</div>
											)}
											<ComboboxInput
												value={search.color || selectedColor?.name || ""}
												onChange={(e) =>
													setSearch((prev) => ({
														...prev,
														color: e.target.value,
													}))
												}
												onBlur={(e) => {
													setSearch((prev) => ({
														...prev,
														color: "",
													}))
													if (!e.target.value) {
														field.onChange("-1")
													}
												}}
												className={selectedColorRgb && !search.color ? "pl-5" : ""}
											/>
										</div>

										<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
											<ComboboxEmpty>Цвет не найдены</ComboboxEmpty>

											<ComboboxList>
												{(color: IColor) => {
													const rgb = getRgb(color.rgb || "")
													return (
														<ComboboxItem
															key={color.id}
															value={String(color.id)}
															onSelect={() => {
																field.onChange(String(color.id))
																setSearch((prev) => ({
																	...prev,
																	color: "",
																}))
															}}
															data-selected={String(color.id) === String(field.value)}
														>
															<div className="flex content-center justify-center">
																{color.id !== -1 && (
																	<div
																		style={{
																			backgroundColor: `rgb(${rgb?.r},${rgb?.g},${rgb?.b})`,
																		}}
																		className="border border-solid border-black rounded-full w-[14px] h-[14px] inline-block relative mt-1 mr-2"
																	/>
																)}
																<span>{color.name}</span>
															</div>
														</ComboboxItem>
													)
												}}
											</ComboboxList>
										</ComboboxContent>
									</Combobox>

									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<FormField
						name="coatId"
						control={form.control}
						render={({ field }) => {
							const selectedCoat =
								field.value === "-1"
									? { id: "-1", name: "Все" }
									: coats.find((coat) => String(coat.id) === String(field.value))

							return (
								<FormItem>
									<FormLabel>Шерстка</FormLabel>
									<Combobox
										value={field.value ? String(field.value) : undefined}
										onValueChange={(val) => {
											field.onChange(val)
											setSearch((prev) => ({
												...prev,
												coat: "",
											}))
										}}
										items={coats}
									>
										<ComboboxInput
											value={search.coat || selectedCoat?.name || ""}
											onChange={(e) =>
												setSearch((prev) => ({
													...prev,
													coat: e.target.value,
												}))
											}
											onBlur={(e) => {
												setSearch((prev) => ({
													...prev,
													coat: "",
												}))
												if (!e.target.value) {
													field.onChange("-1")
												}
											}}
										/>

										<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
											<ComboboxEmpty>Шерстки не найдены</ComboboxEmpty>

											<ComboboxList>
												{(item: ICoatType) => (
													<ComboboxItem
														key={item.id}
														value={String(item.id)}
														onSelect={() => {
															field.onChange(String(item.id))
															setSearch((prev) => ({
																...prev,
																coat: "",
															}))
														}}
														data-selected={String(item.id) === String(field.value)}
													>
														{item.name}
													</ComboboxItem>
												)}
											</ComboboxList>
										</ComboboxContent>
									</Combobox>

									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<FormField
						name="catTypeId"
						control={form.control}
						render={({ field }) => {
							const selectedCatType =
								field.value === "-1"
									? { id: "-1", name: "Все" }
									: catsTypes.find((catType) => String(catType.id) === String(field.value))

							return (
								<FormItem>
									<FormLabel>Тип котика</FormLabel>
									<Combobox
										value={field.value ? String(field.value) : undefined}
										onValueChange={(val) => {
											field.onChange(val)
											setSearch((prev) => ({
												...prev,
												catType: "",
											}))
										}}
										items={catsTypes}
									>
										<ComboboxInput
											value={search.catType || selectedCatType?.name || ""}
											onChange={(e) =>
												setSearch((prev) => ({
													...prev,
													catType: e.target.value,
												}))
											}
											onBlur={(e) => {
												setSearch((prev) => ({
													...prev,
													catType: "",
												}))
												if (!e.target.value) {
													field.onChange("-1")
												}
											}}
										/>

										<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
											<ComboboxEmpty>{`Такого типа котика не существует(`}</ComboboxEmpty>

											<ComboboxList>
												{(item: ICatLocationType) => (
													<ComboboxItem
														key={item.id}
														value={String(item.id)}
														onSelect={() => {
															field.onChange(String(item.id))
															setSearch((prev) => ({
																...prev,
																catType: "",
															}))
														}}
														data-selected={String(item.id) === String(field.value)}
													>
														{item.name}
													</ComboboxItem>
												)}
											</ComboboxList>
										</ComboboxContent>
									</Combobox>

									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<FormField
						name="breedId"
						control={form.control}
						render={({ field }) => {
							const selectedBreedType =
								field.value === "-1"
									? { id: "-1", name: "Все" }
									: breeds.find((breed) => String(breed.id) === String(field.value))

							return (
								<FormItem>
									<FormLabel>Порода</FormLabel>
									<Combobox
										value={field.value ? String(field.value) : undefined}
										onValueChange={(val) => {
											field.onChange(val)
											setSearch((prev) => ({
												...prev,
												breed: "",
											}))
										}}
										items={breeds}
									>
										<ComboboxInput
											value={search.catType || selectedBreedType?.name || ""}
											onChange={(e) =>
												setSearch((prev) => ({
													...prev,
													breed: e.target.value,
												}))
											}
											onBlur={(e) => {
												setSearch((prev) => ({
													...prev,
													breed: "",
												}))
												if (!e.target.value) {
													field.onChange("-1")
												}
											}}
										/>

										<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
											<ComboboxEmpty>{`Такой породы котика не существует(`}</ComboboxEmpty>

											<ComboboxList>
												{(item: ICatLocationType) => (
													<ComboboxItem
														key={item.id}
														value={String(item.id)}
														onSelect={() => {
															field.onChange(String(item.id))
															setSearch((prev) => ({
																...prev,
																breed: "",
															}))
														}}
														data-selected={String(item.id) === String(field.value)}
													>
														{item.name}
													</ComboboxItem>
												)}
											</ComboboxList>
										</ComboboxContent>
									</Combobox>

									<FormMessage />
								</FormItem>
							)
						}}
					/>
					<Button type="submit" className="w-full">
						Применить
					</Button>
				</form>
			</Form>
		</div>
	)
}
