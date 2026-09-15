import { Button } from "@/shared/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableHeaderSortCell,
	TableRow,
} from "@/shared/components/ui/table"
import type { IColor } from "@/shared/api/model"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table"
import { Loader2, RefreshCcw, Trash } from "lucide-react"
import React from "react"
import { useEffect, useState, type FC } from "react"
import DateObject from "react-date-object"
import { UpdateColor } from "./UpdateColor"
import { Warning } from "@/shared/components/controls/warning"
import { toast } from "sonner"
import { TablePagination } from "@/shared/components/ui/table-pagination"
import { CreateColor } from "./CreateColor"
import { catColors } from "@/shared/api/testdata"
import { getRgb } from "../utils/getRgb"

export interface IColorsProps {}

export const Colors: FC<IColorsProps> = () => {
	const [colors, setColors] = useState<IColor[]>([])
	const [loading, reqSim] = useRequestSimulation()

	useEffect(() => {
		reqSim(() => {
			setColors(catColors)
		}, 2000)
	}, [])

	const [sorting, setSorting] = React.useState<SortingState>([])
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	})

	const columns: ColumnDef<IColor>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => <TableHeaderSortCell title="Цвет" {...column} />,
		},
		{
			accessorKey: "rgb",
			header: ({ column }) => <TableHeaderSortCell title="Цвет(rgb)" {...column} />,
			cell: ({ cell }) => {
				const cellValue = cell.getValue() as string
				const rgb = getRgb(cellValue)
				return (
					<div className="flex justify-start">
						<div
							style={{
								backgroundColor: `rgb(${rgb?.r},${rgb?.g},${rgb?.b})`,
							}}
							className="border border-solid border-black rounded-full w-[14px] h-[14px] inline-block relative mt-1 mr-2"
						/>
						<span>{cellValue}</span>
					</div>
				)
			},
		},
		{
			accessorKey: "comment",
			header: ({ column }) => <TableHeaderSortCell title="Комментарий" {...column} />,
		},
		{
			accessorKey: "date",
			header: ({ column }) => <TableHeaderSortCell title="Дата модификации" {...column} />,
			cell: ({ row }) => {
				return <div>{new DateObject(row.getValue<IColor["date"]>("date") || "").format("DD.MM.YYYY")}</div>
			},
		},
		{
			id: "update",
			enableHiding: false,
			cell: ({ row }) => <UpdateColor color={row.original} />,
		},
		{
			id: "delete",
			enableHiding: false,
			cell: () => (
				<Warning
					actionClick={() => {
						reqSim(() => {
							console.log("trying to delete the color...")
							toast.error("Error delete")
						})
					}}
					actionTitle="Удалить"
				>
					<Button variant="link" className="cursor-pointer">
						<Trash className="ml-2 h-4 w-4 " color="red" />
					</Button>
				</Warning>
			),
		},
	]

	const table = useReactTable({
		data: colors,
		columns,
		state: {
			sorting,
			pagination,
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div className="m-4">
			<div className="flex justify-between content-center">
				<div className="mb-3 text-xl font-bold">Цвета котиков</div>
				<div className="flex">
					<div>
						<Button
							onClick={() => {
								// Если бы использовался tanstack-query, то  тут можно было бы просто инвалидировать запрос
								reqSim(() => {
									setColors(catColors)
								}, 2000)
							}}
							size="sm"
							variant="ghost"
							className="ml-auto green cursor-pointer"
							title="Обновить"
						>
							<RefreshCcw color="#4082b7" />
						</Button>
					</div>
					<CreateColor />
				</div>
			</div>
			{loading ? (
				<div className="flex justify-center">
					<Loader2 className="m-2 h-10 w-10 animate-spin justify-center " />
				</div>
			) : (
				<div>
					<div className="overflow-hidden rounded-md border">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(header.column.columnDef.header, header.getContext())}
												</TableHead>
											)
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="h-[40px]">
											{row.getVisibleCells().map((cell) => (
												<TableCell className="py-[0px]" key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={columns.length} className="h-24 text-center">
											Нет данных
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
					<TablePagination
						table={table}
						pageIndex={pagination.pageIndex}
						setPageIndex={(pageIndex) => {
							setPagination((prev) => ({
								...prev,
								pageIndex: pageIndex,
							}))
						}}
					/>
				</div>
			)}
		</div>
	)
}
