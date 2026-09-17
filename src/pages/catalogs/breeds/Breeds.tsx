import type { ICatBreedType } from "@/shared/api/model"
import { catBreeds } from "@/shared/api/testdata"
import { Warning } from "@/shared/components/controls/warning"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableHeaderSortCell,
	TableRow,
} from "@/shared/components/ui/table"
import { TablePagination } from "@/shared/components/ui/table-pagination"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
} from "@tanstack/react-table"
import { Loader2, RefreshCcw, Trash } from "lucide-react"
import React, { useEffect } from "react"
import { useState, type FC } from "react"
import { toast } from "sonner"
import { UpdateBreed } from "./UpdateBreed"
import { useLanguage } from "@/i18n/hooks/useLanguage"
import { CreateBreed } from "./CreateBreed"

interface ICoatsProps {}

export const Breeds: FC<ICoatsProps> = () => {
	const [breeds, setBreeds] = useState<ICatBreedType[]>([])
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	})
	const [loading, reqSim] = useRequestSimulation()
	const { t } = useLanguage()

	useEffect(() => {
		reqSim(() => {
			setBreeds(catBreeds)
		}, 2000)
	}, [])

	const columns: ColumnDef<ICatBreedType>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.breed")} {...column} />,
		},
		{
			accessorKey: "comment",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.comment")} {...column} />,
		},
		{
			id: "update",
			enableHiding: false,
			cell: ({ row }) => <UpdateBreed breed={row.original} />,
		},
		{
			id: "delete",
			enableHiding: false,
			cell: ({ row }) => (
				<Warning
					actionClick={() => {
						reqSim(() => {
							console.log(row)
							toast.error(t("common.technichal-problems"))
						})
					}}
					actionTitle={t("common.delete")}
				>
					<Button variant="link" className="cursor-pointer">
						<Trash className="ml-2 h-4 w-4 " color="red" />
					</Button>
				</Warning>
			),
		},
	]

	const table = useReactTable({
		data: breeds,
		columns,
		state: {
			sorting,
			columnFilters,
			pagination,
		},
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<div className="m-4">
			<div className="flex justify-between content-center">
				<div className="mb-3 text-xl font-bold">{t("catalogs.breeds.cat-breeds")}</div>
				<div className="flex">
					<div>
						<Button
							onClick={() => {
								reqSim(() => {
									setBreeds(catBreeds)
								}, 2000)
							}}
							size="sm"
							variant="ghost"
							className="ml-auto green cursor-pointer"
							title={t("common.update")}
						>
							<RefreshCcw color="#4082b7" />
						</Button>
					</div>
					<CreateBreed />
				</div>
			</div>
			<div className="flex items-center pb-2 w-full">
				<Input
					className="w-full bg-card h-9"
					placeholder={t("catalogs.breeds.search-by-name")}
					onChange={(event) => {
						setColumnFilters(() => {
							return [{ id: "name", value: event.target.value }]
						})
						setPagination((prev) => ({
							...prev,
							pageIndex: 0,
						}))
					}}
				/>
			</div>
			{loading ? (
				<div className="flex justify-center">
					<Loader2 className="m-2 h-10 w-10 animate-spin justify-center " />
				</div>
			) : (
				<div className="w-full">
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
											<TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="h-[34px]">
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
												{t("catalogs.breeds.no-breeds")}
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
				</div>
			)}
		</div>
	)
}
