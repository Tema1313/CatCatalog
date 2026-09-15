import type { ICatBreedType, IColor } from "@/shared/api/model"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Loader2 } from "lucide-react"
import { useState, type FC } from "react"
import { useCatForm, type ICatForm } from "../hooks/forms/useCatForm"
import { Input } from "@/shared/components/ui/input"
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/shared/components/ui/combobox"
import { getRgb } from "@/pages/catalogs/colors/utils/getRgb"
import catBread from "@assets/bread-icons/catbread.png"
import catNotBread from "@assets/bread-icons/catnobread.png"
import { DialogClose, DialogFooter } from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"

export const CatForm: FC<ICatForm> = (props) => {
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

	const [form, submit, { breedsList, catsTypeList, coatsList, colorsList, isSubmitLoading, isCatalogLoading }] =
		useCatForm({
			...props,
		})

	return (
		<>
			{isCatalogLoading ? (
				<div className="flex justify-center">
					<Loader2 className="m-2 h-10 w-10 animate-spin justify-center " />
				</div>
			) : (
				<Form {...form}>
					<form className="@container" onSubmit={submit}>
						<div className="grid grid-cols-1 @[420px]:grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
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
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="owner"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Слуга</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="softness"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Мягкость</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="colorId"
								render={({ field }) => {
									const selectedColor = colorsList.find((color) => String(color.id) === String(field.value))
									const selectedColorRgb = getRgb(selectedColor?.rgb || "")

									return (
										<FormItem>
											<FormLabel>Цвет</FormLabel>
											<Combobox
												value={field.value}
												onValueChange={(val) => {
													field.onChange(val)
													setSearch((prev) => ({
														...prev,
														color: "",
													}))
												}}
												items={colorsList || []}
											>
												<div className="relative w-full">
													{selectedColor && !search.color && (
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
														placeholder="Выберите цвет"
														value={search.color || selectedColor?.name || ""}
														onChange={(e) =>
															setSearch((prev) => ({
																...prev,
																color: e.target.value,
															}))
														}
														onBlur={() =>
															setSearch((prev) => ({
																...prev,
																color: "",
															}))
														}
														className={selectedColor && !search.color ? "pl-5" : ""}
													/>
												</div>

												<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
													<ComboboxEmpty>Цвета не найдены</ComboboxEmpty>

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
																		<div
																			style={{
																				backgroundColor: `rgb(${rgb?.r},${rgb?.g},${rgb?.b})`,
																			}}
																			className="border border-solid border-black rounded-full w-[14px] h-[14px] inline-block relative mt-1 mr-2"
																		/>
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
								control={form.control}
								name="breedTypeId"
								defaultValue={"0"}
								render={({ field }) => {
									const selectedBreed = breedsList.find((breed) => String(breed.id) === String(field.value))

									return (
										<FormItem>
											<FormLabel>Порода</FormLabel>
											<Combobox
												value={field.value}
												onValueChange={(val) => {
													field.onChange(val)
													setSearch((prev) => ({
														...prev,
														breed: "",
													}))
												}}
												items={breedsList}
											>
												<ComboboxInput
													placeholder="Выберите породу"
													value={search.breed || selectedBreed?.name || ""}
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
															field.onChange("0")
														}
													}}
												/>

												<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
													<ComboboxEmpty>Породы не найдены</ComboboxEmpty>

													<ComboboxList>
														{(item: ICatBreedType) => (
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
							<FormField
								control={form.control}
								name="coatTypeId"
								defaultValue={"0"}
								render={({ field }) => {
									const selectedCoat = coatsList.find((coat) => String(coat.id) === String(field.value))

									return (
										<FormItem>
											<FormLabel>Тип шерстки</FormLabel>
											<Combobox
												value={field.value}
												onValueChange={(val) => {
													field.onChange(val)
													setSearch((prev) => ({
														...prev,
														coat: "",
													}))
												}}
												items={coatsList}
											>
												<ComboboxInput
													placeholder="Выберите шерстку"
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
															field.onChange("0")
														}
													}}
												/>

												<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
													<ComboboxEmpty>Шерстки не найдены</ComboboxEmpty>

													<ComboboxList>
														{(item: ICatBreedType) => (
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
								control={form.control}
								name="locationTypeId"
								defaultValue={"0"}
								render={({ field }) => {
									const selectedLocationType = catsTypeList.find((type) => String(type.id) === String(field.value))

									return (
										<FormItem>
											<FormLabel>Тип котика</FormLabel>
											<Combobox
												value={field.value}
												onValueChange={(val) => {
													field.onChange(val)
													setSearch((prev) => ({
														...prev,
														catType: "",
													}))
												}}
												items={catsTypeList}
											>
												<ComboboxInput
													placeholder="Выберите тип"
													value={search.coat || selectedLocationType?.name || ""}
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
															field.onChange("0")
														}
													}}
												/>

												<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
													<ComboboxEmpty>Типы котика не найдены</ComboboxEmpty>

													<ComboboxList>
														{(item: ICatBreedType) => (
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
								control={form.control}
								name="bigeyedness"
								render={({ field }) => {
									const options = Array.from({ length: 10 }, (_, index) => index + 1)
									return (
										<FormItem>
											<FormLabel>Большеглазость (от 1 до 10)</FormLabel>
											<FormControl>
												<Combobox
													value={Number(field.value)}
													onValueChange={(val) => {
														field.onChange(val)
													}}
													items={options}
												>
													<ComboboxInput placeholder="Выберите степень большеглазости" />
													<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
														<ComboboxList>
															{(item: number) => (
																<ComboboxItem
																	key={item}
																	value={String(item)}
																	onSelect={() => {
																		field.onChange(String(item))
																	}}
																	data-selected={String(item) === field.value}
																>
																	{item}
																</ComboboxItem>
															)}
														</ComboboxList>
													</ComboboxContent>
												</Combobox>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								control={form.control}
								name="stars"
								render={({ field }) => {
									const options = Array.from({ length: 5 }, (_, index) => index + 1)
									return (
										<FormItem>
											<FormLabel>Рейтинг</FormLabel>
											<FormControl>
												<Combobox
													value={"⭐".repeat(Number(field.value))}
													onValueChange={(val) => {
														field.onChange(val)
													}}
													items={options}
												>
													<ComboboxInput placeholder="Выберите степень большеглазости" />
													<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
														<ComboboxList>
															{(item: number) => (
																<ComboboxItem
																	key={item}
																	value={String(item)}
																	onSelect={() => {
																		field.onChange(String(item))
																	}}
																	data-selected={String(item) === field.value}
																>
																	<span>{"⭐".repeat(item)}</span>
																</ComboboxItem>
															)}
														</ComboboxList>
													</ComboboxContent>
												</Combobox>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								control={form.control}
								name="mass"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Вес котика</FormLabel>
										<FormControl>
											<Input
												value={field.value || ""}
												onChange={(event) => {
													const value = event.target.value
													if (/^\d*([.]?\d*)?$/.test(value)) {
														field.onChange(value)
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="breadness"
								render={({ field }) => {
									const options: { value: boolean; img: string }[] = [
										{
											value: true,
											img: catBread,
										},
										{
											value: false,
											img: catNotBread,
										},
									]
									return (
										<FormItem>
											<FormLabel>Хлебобулочность</FormLabel>
											<FormControl>
												<Combobox
													value={field.value}
													onValueChange={(val) => {
														field.onChange(val)
													}}
													items={options}
												>
													<ComboboxInput
														placeholder="Возможен ли батон"
														render={(props) => {
															const selected = options.find((o) => o.value === field.value)
															return (
																<div {...props} className="flex w-full items-center gap-2 px-2.5">
																	{selected && <img src={selected.img} alt="" className="h-5 w-5 shrink-0" />}
																	<span className={selected ? "" : "text-muted-foreground"}>
																		{selected ? (selected.value ? "Батон" : "Не батон") : ""}
																	</span>
																</div>
															)
														}}
													/>
													<ComboboxContent className="pointer-events-auto" onWheel={(e) => e.stopPropagation()}>
														<ComboboxList>
															{(item: { value: boolean; img: string }) => (
																<ComboboxItem
																	key={Number(item.value)}
																	value={item.value}
																	onSelect={() => {
																		field.onChange(item.value)
																	}}
																	data-selected={item.value === field.value}
																>
																	<img className="w-[25px] h-[25px]" src={item.img} alt="" />
																</ComboboxItem>
															)}
														</ComboboxList>
													</ComboboxContent>
												</Combobox>
											</FormControl>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
						</div>
						{props.mode === "Create" ? (
							<DialogFooter className="me-1">
								<DialogClose asChild>
									<Button disabled={isSubmitLoading} size={"sm"} className="cursor-pointer" variant="outline">
										Отменить
									</Button>
								</DialogClose>
								<Button disabled={isSubmitLoading} size={"sm"} className="cursor-pointer" type="submit">
									{isSubmitLoading ? <Loader2 className="m-2 animate-spin justify-center " /> : "Сохранить"}
								</Button>
							</DialogFooter>
						) : (
							<div className="flex gap-3 justify-end mt-2">
								<Button
									size={"sm"}
									className="cursor-pointer"
									variant="outline"
									type="button"
									onClick={() => {
										form.reset()
									}}
									disabled={isSubmitLoading}
								>
									Отменить
								</Button>
								<Button
									disabled={isSubmitLoading}
									size={"sm"}
									className="cursor-pointer"
									type="submit"
									variant="default"
								>
									{isSubmitLoading ? <Loader2 className="m-2 animate-spin justify-center " /> : "Сохранить"}
								</Button>
							</div>
						)}
					</form>
				</Form>
			)}
		</>
	)
}
