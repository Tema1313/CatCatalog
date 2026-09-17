import { useLanguage } from "@/i18n/hooks/useLanguage"
import type { ICoatType } from "@/shared/api/model"
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

interface IUpdateCoatProps {
	coat: ICoatType
}

const UpdateCoatSchema = z.object({
	name: z.string({ message: "Required field" }).min(1, { message: "Required field" }),
	comment: z.string().optional(),
})

type UpdateCoatFormData = z.infer<typeof UpdateCoatSchema>

export const UpdateCoat: FC<IUpdateCoatProps> = (props) => {
	const [open, setOpen] = useState<boolean>(false)
	const [loading, reqSim] = useRequestSimulation()
	const { t } = useLanguage()

	const form = useForm<UpdateCoatFormData>({
		mode: "onSubmit",
		reValidateMode: "onChange",
		resolver: zodResolver(UpdateCoatSchema),
		defaultValues: {
			name: props.coat.name || "",
			comment: props.coat.comment || "",
		},
	})

	const onSubmit = (data: UpdateCoatFormData) => {
		reqSim(() => {
			console.log(data)
			toast.error(t("common.technichal-problems"))
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
			<DialogTrigger title={t("common.edit")} className="cursor-pointer" asChild>
				<Button variant="link" className="ml-auto text-blue-500 cursor-pointer">
					<Pencil className="ml-2 h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="gap-0">
					<DialogTitle>{t("catalogs.fluff.change-fluff")}</DialogTitle>
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
										<FormLabel>{t("table-column-names.fluff")}</FormLabel>
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
										<FormLabel>{t("table-column-names.comment")}</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<DialogFooter>
								<DialogClose asChild>
									<Button disabled={loading} size={"sm"} className="cursor-pointer" variant="outline">
										{t("common.cancel")}
									</Button>
								</DialogClose>
								<Button disabled={loading} size={"sm"} className="cursor-pointer" type="submit">
									{loading ? <Loader2 className="m-2 animate-spin justify-center " /> : t("common.save")}
								</Button>
							</DialogFooter>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	)
}
