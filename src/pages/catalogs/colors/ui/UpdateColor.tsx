import type { IColor, RgbColor } from "@/shared/api/model"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, type FC } from "react"
import { useForm } from "react-hook-form"
import z, { type ZodType } from "zod"
import { getRgb } from "../utils/getRgb"
import { toast } from "sonner"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Loader2, Pencil } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { RgbColorPicker } from "react-colorful"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"

interface IUpdateColorProps {
	color: IColor
}

const UpdateColorSchema = z.object({
	name: z.string({ message: "Обязательное поле" }).min(1, { message: "Обязательное поле" }),
	comment: z.string().optional(),
	color: z.object({
		r: z.number(),
		g: z.number(),
		b: z.number(),
	}) satisfies ZodType<RgbColor>,
})

type UpdateColorFormData = z.infer<typeof UpdateColorSchema>

export const UpdateColor: FC<IUpdateColorProps> = (props) => {
	const [open, setOpen] = useState<boolean>(false)
	const [loading, reqSim] = useRequestSimulation()

	const rgb = getRgb(props.color.rgb || "")

	const form = useForm<UpdateColorFormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(UpdateColorSchema),
		defaultValues: {
			color: {
				r: rgb?.r,
				g: rgb?.g,
				b: rgb?.b,
			},
			comment: props.color.comment || undefined,
			name: props.color.name || "",
		},
	})

	const onSubmit = (data: UpdateColorFormData) => {
		reqSim(() => {
			console.log(data)
			toast.error("Technichal problemeows")
		})
	}

	return (
		<Dialog
			modal
			open={open}
			onOpenChange={(open) => {
				setOpen(open)
				if (!open) form.reset()
			}}
		>
			<DialogTrigger title="Редактировать" className="cursor-pointer" asChild>
				<Button variant="link" className="ml-auto text-blue-500 cursor-pointer">
					<Pencil className="ml-2 h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="gap-0">
					<DialogTitle>Редактирование цвета</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<div>
					<Form {...form}>
						<form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Цвет</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="color"
								render={({ field }) => {
									return (
										<FormItem>
											<FormControl>
												<RgbColorPicker
													color={field.value}
													onChange={(newColor) => {
														field.onChange(newColor)
													}}
												/>
											</FormControl>
											<div className="flex gap-4">
												<div className="relative">
													<div className="absolute top-1/7 left-3 h-4 w-4 text-muted-foreground">R</div>
													<Input
														className="pl-10"
														value={field.value?.r}
														onChange={(event) => {
															if (Number(event.target.value) >= 0 && Number(event.target.value) <= 255) {
																field.onChange({
																	...field.value,
																	r: Number(event.target.value),
																})
															}
														}}
													/>
												</div>
												<div className="relative">
													<div className="absolute top-1/7 left-3 h-4 w-4 text-muted-foreground">G</div>
													<Input
														className="pl-10"
														value={field.value?.g}
														onChange={(event) => {
															if (Number(event.target.value) >= 0 && Number(event.target.value) <= 255) {
																field.onChange({
																	...field.value,
																	g: Number(event.target.value),
																})
															}
														}}
													/>
												</div>
												<div className="relative">
													<div className="absolute top-1/7 left-3 h-4 w-4 text-muted-foreground">B</div>
													<Input
														className="pl-10"
														value={field.value?.b}
														onChange={(event) => {
															if (Number(event.target.value) >= 0 && Number(event.target.value) <= 255) {
																field.onChange({
																	...field.value,
																	b: Number(event.target.value),
																})
															}
														}}
													/>
												</div>
											</div>
											<FormMessage />
										</FormItem>
									)
								}}
							/>
							<FormField
								control={form.control}
								name="comment"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Комментарий</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<DialogClose asChild>
									<Button
										variant="outline"
										className="cursor-pointer"
										onClick={() => {
											setOpen(false)
											form.reset()
										}}
										size={"sm"}
										type="button"
										disabled={loading}
									>
										Отменить
									</Button>
								</DialogClose>
								<Button disabled={loading} size={"sm"} className="cursor-pointer" type="submit">
									{loading ? <Loader2 className="m-2 animate-spin justify-center " /> : "Сохранить"}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
