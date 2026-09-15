import type { ICatBreedType } from "@/shared/api/model"
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
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Pencil } from "lucide-react"
import { useState, type FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

interface IUpdateBreedProps {
	breed: ICatBreedType
}

const UpdateBreedSchema = z.object({
	name: z.string({ message: "Обязательное поле" }).min(1, { message: "Обязательное поле" }),
	comment: z.string().optional(),
})

type UpdateBreedFormData = z.infer<typeof UpdateBreedSchema>

export const UpdateBreed: FC<IUpdateBreedProps> = (props) => {
	const [open, setOpen] = useState<boolean>(false)
	const [loading, reqSim] = useRequestSimulation()

	const form = useForm<UpdateBreedFormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(UpdateBreedSchema),
		defaultValues: {
			name: props.breed.name || "",
			comment: props.breed.comment || "",
		},
	})

	const onSubmit = (data: UpdateBreedFormData) => {
		reqSim(() => {
			console.log(data)
			toast.error("Technichal problemeows")
		}, 500)
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
					<DialogTitle>Редактирование породы</DialogTitle>
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
										<FormLabel>Порода</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
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
