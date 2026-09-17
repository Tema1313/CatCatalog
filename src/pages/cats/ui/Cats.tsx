import { useNavigate, useSearch } from "@tanstack/react-router"
import { useEffect, useState, type FC } from "react"
import DateObject from "react-date-object"
import { useCatsStore } from "../model/catsStore"
import { useUpdateCatList } from "../hooks/useUpdateCats"
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type SortingState,
} from "@tanstack/react-table"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableHeaderSortCell,
	TableRow,
} from "@/shared/components/ui/table"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable"
import { Button } from "@/shared/components/ui/button"
import { Eraser, Loader2, RefreshCcw, X } from "lucide-react"
import { Warning } from "@/shared/components/controls/warning"
import { TablePagination } from "@/shared/components/ui/table-pagination"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import type { ICat, ICatBreedType, ICatLocationType, ICoatType, IColor } from "@/shared/api/model"
import { catBreeds, catCoatTypes, catColors, catLocationType } from "@/shared/api/testdata"
import { CatPersonalInfoLayout } from "./cat-personal-info/CatPersonalInfoLayout"
import catBread from "@assets/bread-icons/catbread.png"
import catNotBread from "@assets/bread-icons/catnobread.png"
import { CreateCat } from "./CreateCat"
import { toast } from "sonner"
import { getRgb } from "@/pages/catalogs/colors/utils/getRgb"
import { useLanguage } from "@/i18n/hooks/useLanguage"

interface ICatsProps {
	catId?: number
}

export const Cats: FC<ICatsProps> = (props) => {
	const navigate = useNavigate({ from: "/" })
	const searchParams = useSearch({ from: "__root__" })
	const cats = useCatsStore((store) => store.cats)
	const { updateCatList, isLoading: isCatListLoading } = useUpdateCatList()
	const [loading, reqSim] = useRequestSimulation()
	const { t } = useLanguage()

	const currentCat = cats.find((product) => product.id === props.catId)
	const isLoading = isCatListLoading || loading

	const [sorting, setSorting] = useState<SortingState>([])
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 15,
	})

	const [breedsList, setBreedsList] = useState<ICatBreedType[]>([])
	const [colorsList, setColorsList] = useState<IColor[]>([])
	const [catsTypeList, setCatsTypeList] = useState<ICatLocationType[]>([])
	const [coatsList, setCoatsList] = useState<ICoatType[]>([])

	const columns: ColumnDef<ICat>[] = [
		{
			accessorKey: "name",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.name")} {...column} />,
			cell: ({ row }) => {
				const value = row.getValue<ICat["name"]>("name")
				return (
					<div className="max-w-[200px]">
						<div title={value} className="overflow-hidden text-ellipsis">
							{value}
						</div>
					</div>
				)
			},
		},
		{
			accessorKey: "shortName",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.short-name")} {...column} />,
		},
		{
			accessorKey: "locationTypeId",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.kitty-type")} {...column} />,
			cell: ({ row }) => {
				const value =
					catsTypeList.find((elem) => elem.id === row.getValue<ICat["locationTypeId"]>("locationTypeId"))?.name ||
					t("common.unknown")
				return <div>{value}</div>
			},
			sortingFn: (rowA, rowB) => {
				const nameA = catsTypeList.find((e) => e.id === rowA.original.locationTypeId)?.name ?? ""
				const nameB = catsTypeList.find((e) => e.id === rowB.original.locationTypeId)?.name ?? ""
				return nameA.localeCompare(nameB, "ru")
			},
		},
		{
			accessorKey: "colorId",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.color")} {...column} />,
			cell: ({ row }) => {
				const color = colorsList.find((elem) => elem.id === row.getValue<ICat["colorId"]>("colorId"))
				const colorName = color?.name || t("common.unknown")
				const rgb = getRgb(color?.rgb || "")
				return (
					<div className="flex justify-start">
						<div
							style={{
								backgroundColor: `rgb(${rgb?.r},${rgb?.g},${rgb?.b})`,
							}}
							className="border border-solid border-black rounded-full w-[14px] h-[14px] inline-block relative mt-1 mr-2"
						/>
						<span>{colorName}</span>
					</div>
				)
			},
			sortingFn: (rowA, rowB) => {
				const nameA = colorsList.find((e) => e.id === rowA.original.colorId)?.name ?? ""
				const nameB = colorsList.find((e) => e.id === rowB.original.colorId)?.name ?? ""
				return nameA.localeCompare(nameB, "ru")
			},
		},
		{
			accessorKey: "coatTypeId",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.fluff")} {...column} />,
			cell: ({ row }) => {
				const value =
					coatsList.find((elem) => elem.id === row.getValue<ICat["coatTypeId"]>("coatTypeId"))?.name ||
					t("common.unknown")
				return <div>{value}</div>
			},
			sortingFn: (rowA, rowB) => {
				const nameA = colorsList.find((e) => e.id === rowA.original.colorId)?.name ?? ""
				const nameB = colorsList.find((e) => e.id === rowB.original.colorId)?.name ?? ""
				return nameA.localeCompare(nameB, "ru")
			},
		},
		{
			accessorKey: "breedTypeId",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.breed")} {...column} />,
			cell: ({ row }) => {
				const value =
					breedsList.find((elem) => elem.id === row.getValue<ICat["breedTypeId"]>("breedTypeId"))?.name ||
					t("common.unknown")

				return <div>{value}</div>
			},
			sortingFn: (rowA, rowB) => {
				const nameA = colorsList.find((e) => e.id === rowA.original.colorId)?.name ?? ""
				const nameB = colorsList.find((e) => e.id === rowB.original.colorId)?.name ?? ""
				return nameA.localeCompare(nameB, "ru")
			},
		},
		{
			accessorKey: "mass",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.kitty-mass")} {...column} />,
		},
		{
			accessorKey: "owner",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.kitty-servant")} {...column} />,
		},
		{
			accessorKey: "bigeyedness",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.bigeyedness")} {...column} />,
		},
		{
			accessorKey: "breadness",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.breadness")} {...column} />,
			cell: ({ row }) => {
				const isBread = row.getValue<ICat["breadness"]>("breadness")
				return (
					<div className="flex ">
						<img src={isBread ? catBread : catNotBread} alt="catbread" className="w-[25px] h-[25px]" />
					</div>
				)
			},
		},
		{
			accessorKey: "softness",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.softness")} {...column} />,
		},
		{
			accessorKey: "date",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.birthdate")} {...column} />,
			cell: ({ row }) => {
				return <div>{new DateObject(row.getValue<ICat["date"]>("date") || "").format("DD.MM.YYYY")}</div>
			},
		},
		{
			accessorKey: "stars",
			header: ({ column }) => <TableHeaderSortCell title={t("table-column-names.stars")} {...column} />,
			cell: ({ row }) => {
				const stars = Array.from({ length: row.getValue<ICat["stars"]>("stars") || 5 }, (_, index) => (
					<span key={index}>⭐</span>
				))
				return <div className="flex">{stars}</div>
			},
		},
	]

	const table = useReactTable({
		data: cats,
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

	useEffect(() => {
		if (props.catId && cats.length !== 0) {
			const rows = table.getSortedRowModel().rows
			const idx = rows.findIndex((row) => row.original.id === props.catId)
			if (idx !== -1) {
				const pageIndex = Math.floor(idx / pagination.pageSize)
				setPagination((prev) => (prev.pageIndex === pageIndex ? prev : { ...prev, pageIndex }))
			} else {
				setPagination((prev) => ({ ...prev, pageIndex: 0 }))
				navigate({
					to: "/",
					search: (prev) => prev,
				})
			}
		}
	}, [props.catId, cats])

	useEffect(() => {
		updateCatList()
	}, [searchParams])

	useEffect(() => {
		reqSim(() => {
			setBreedsList(catBreeds)
			setColorsList(catColors)
			setCatsTypeList(catLocationType)
			setCoatsList(catCoatTypes)
		}, 1500)
	}, [])

	return (
		<ResizablePanelGroup direction="horizontal">
			<ResizablePanel defaultSize={props.catId ? 40 : 100}>
				<div className="m-4">
					<div className="flex justify-between items-center mb-3">
						<div className="text-xl font-bold">{t("cats.kitty-products")}</div>
						<div className="flex">
							<Button
								variant="ghost"
								className="cursor-pointer p-2"
								title={t("cats.clear-filter")}
								onClick={() => {
									navigate({
										search: () => ({
											breedId: undefined,
											catTypeId: undefined,
											coatId: undefined,
											colorId: undefined,
											name: undefined,
											shortName: undefined,
										}),
									})
								}}
							>
								<Eraser color="#f7bb88" />
							</Button>
							<CreateCat />
							<Warning
								actionClick={() => {
									reqSim(() => {
										toast.error(t("common.technichal-problems"))
									})
								}}
								description={t("cats.delete-cat")}
								actionTitle={t("common.yes")}
							>
								<Button
									disabled={!currentCat}
									title={t("common.delete")}
									variant="ghost"
									className="cursor-pointer p-2"
								>
									<X color="red" strokeWidth={4} />
								</Button>
							</Warning>
							<Button
								onClick={() => {
									updateCatList()
								}}
								variant="ghost"
								title={t("common.update")}
								className="ml-auto green cursor-pointer p-2"
							>
								<RefreshCcw color="#4082b7" />
							</Button>
						</div>
					</div>
					{isLoading ? (
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
												<TableRow
													onClick={() => {
														if (row.original.id) {
															navigate({
																to: "/cat/$catId",
																params: {
																	catId: String(row.original.id),
																},
																search: (prev) => prev,
															})
														}
													}}
													key={row.id}
													data-state={row.getIsSelected() && "selected"}
													className={`${row.original.id === props.catId ? "bg-sky-300" : ""} h-[30px] cursor-pointer `}
												>
													{row.getVisibleCells().map((cell) => (
														<TableCell key={cell.id}>
															{flexRender(cell.column.columnDef.cell, cell.getContext())}
														</TableCell>
													))}
												</TableRow>
											))
										) : (
											<TableRow>
												<TableCell colSpan={columns.length} className="h-24 text-center">
													{t("cats.no-kitties")}
												</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
							</div>
							<div className="flex justify-between justify-items-center flex-wrap-reverse">
								<div className="mt-4">
									{t("cats.Limit")}: {pagination.pageSize}
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
									countElements={cats.length}
								/>
							</div>
						</div>
					)}
				</div>
			</ResizablePanel>
			{props.catId && (
				<>
					<ResizableHandle />
					<ResizablePanel defaultSize={60} className="relative flex flex-col">
						<CatPersonalInfoLayout catId={props.catId} />
					</ResizablePanel>
				</>
			)}
		</ResizablePanelGroup>
	)
}
