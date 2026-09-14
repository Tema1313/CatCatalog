import { Button } from "@/shared/components/ui/button"
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import type { RgbColor } from "@/shared/api/model"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus } from "lucide-react"
import { useState, type FC } from "react"
import { RgbColorPicker } from "react-colorful"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z, { type ZodType } from "zod"

interface ICreateColorProps {}

const CreateColorSchema = z.object({
	name: z.string({ message: "Обязательное поле" }).min(1, { message: "Обязательное поле" }),
	comment: z.string().optional(),
	color: z.object({
		r: z.number(),
		g: z.number(),
		b: z.number(),
	}) satisfies ZodType<RgbColor>,
})

type CreateColorFormData = z.infer<typeof CreateColorSchema>

export const CreateColor: FC<ICreateColorProps> = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [loading, reqSim] = useRequestSimulation()

	const form = useForm<CreateColorFormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(CreateColorSchema),
		defaultValues: {
			color: {
				r: 0,
				g: 0,
				b: 0,
			},
		},
	})

	const onSubmit = (data: CreateColorFormData) => {
		reqSim(() => {
			console.log(data)
			toast("Technichal problemeows", {
				position: "top-right",
			})
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
			<DialogTrigger title="Добавление" className="cursor-pointer" asChild>
				<Button size="sm" variant="ghost" className="ml-auto green" title="Добавить">
					<Plus color="#4082b7" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="gap-0">
					<DialogTitle>Добавить цвет котэка</DialogTitle>
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
									<Button disabled={loading} size={"sm"} className="cursor-pointer" variant="outline">
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
