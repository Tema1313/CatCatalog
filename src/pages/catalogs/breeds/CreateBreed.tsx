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
import { Loader2, Plus } from "lucide-react"
import { useState, type FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"

interface ICreateBreedProps {}

const CreateBreedSchema = z.object({
	name: z.string({ message: "Обязательное поле" }).min(1, { message: "Обязательное поле" }),
})

type CreateBreedFormData = z.infer<typeof CreateBreedSchema>

export const CreateBreed: FC<ICreateBreedProps> = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [loading, reqSim] = useRequestSimulation()

	const form = useForm<CreateBreedFormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(CreateBreedSchema),
	})

	const onSubmit = (data: CreateBreedFormData) => {
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
					<DialogTitle>Добавить породу</DialogTitle>
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
										<FormLabel>Название породы</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<DialogClose asChild>
									<Button size={"sm"} className="cursor-pointer" variant="outline">
										Отменить
									</Button>
								</DialogClose>
								<Button size={"sm"} className="cursor-pointer" type="submit">
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
