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
import { useLanguage } from "@/i18n/hooks/useLanguage"

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
	const { t } = useLanguage()

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
										<FormLabel>{t("table-column-names.name")}</FormLabel>
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
										<FormLabel>{t("table-column-names.short-name")}</FormLabel>
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
										<FormLabel>{t("table-column-names.kitty-servant")}</FormLabel>
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
										<FormLabel>{t("table-column-names.softness")}</FormLabel>
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
											<FormLabel>{t("table-column-names.color")}</FormLabel>
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
														placeholder={t("cats.select-color")}
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
													<ComboboxEmpty>{t("common.no-data")}</ComboboxEmpty>

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
											<FormLabel>{t("table-column-names.breed")}</FormLabel>
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
													placeholder={t("cats.select-breed")}
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
													<ComboboxEmpty>{t("common.no-data")}</ComboboxEmpty>

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
											<FormLabel>{t("table-column-names.fluff")}</FormLabel>
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
													placeholder={t("cats.select-fluff")}
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
													<ComboboxEmpty>{t("common.no-data")}</ComboboxEmpty>

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
											<FormLabel>{t("table-column-names.kitty-type")}</FormLabel>
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
													placeholder={t("cats.select-kitty-type")}
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
													<ComboboxEmpty>{t("common.no-data")}</ComboboxEmpty>

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
											<FormLabel>{t("table-column-names.bigeyedness")}</FormLabel>
											<FormControl>
												<Combobox
													value={Number(field.value)}
													onValueChange={(val) => {
														field.onChange(val)
													}}
													items={options}
												>
													<ComboboxInput placeholder={t("cats.select-degree-of-bigeyedness")} />
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
											<FormLabel>{t("table-column-names.stars")}</FormLabel>
											<FormControl>
												<Combobox
													value={"⭐".repeat(Number(field.value))}
													onValueChange={(val) => {
														field.onChange(val)
													}}
													items={options}
												>
													<ComboboxInput placeholder={t("cats.select-stars")} />
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
										<FormLabel>{t("table-column-names.kitty-mass")}</FormLabel>
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
											<FormLabel>{t("table-column-names.breadness")}</FormLabel>
											<FormControl>
												<Combobox
													value={field.value}
													onValueChange={(val) => {
														field.onChange(val)
													}}
													items={options}
												>
													<ComboboxInput
														placeholder={t("cats.can-kitty-loaf")}
														render={(props) => {
															const selected = options.find((o) => o.value === field.value)
															return (
																<div {...props} className="flex w-full items-center gap-2 px-2.5">
																	{selected && <img src={selected.img} alt="" className="h-5 w-5 shrink-0" />}
																	<span className={selected ? "" : "text-muted-foreground"}>
																		{selected ? (selected.value ? t("cats.loaf") : t("cats.no-loaf")) : ""}
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
										{t("common.cancel")}
									</Button>
								</DialogClose>
								<Button disabled={isSubmitLoading} size={"sm"} className="cursor-pointer" type="submit">
									{isSubmitLoading ? <Loader2 className="m-2 animate-spin justify-center " /> : t("common.save")}
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
									{t("common.cancel")}
								</Button>
								<Button
									disabled={isSubmitLoading}
									size={"sm"}
									className="cursor-pointer"
									type="submit"
									variant="default"
								>
									{isSubmitLoading ? <Loader2 className="m-2 animate-spin justify-center " /> : t("common.save")}
								</Button>
							</div>
						)}
					</form>
				</Form>
			)}
		</>
	)
}
