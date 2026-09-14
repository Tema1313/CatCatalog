import type { Table } from "@tanstack/react-table"
import { useMemo } from "react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "./pagination"
import { Button } from "./button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Props<T> {
	table: Table<T>
	setPageIndex: (pageIndex: number) => void
	pageIndex: number
	countElemements?: number
	centerButtons?: number
}

const PAGINATION_ELLIPSIS = "ELLIPSIS" as const
type PaginationElement = number | typeof PAGINATION_ELLIPSIS

function getPaginationRange(totalPages: number, currentIndex: number, centerButtonsCount: number): PaginationElement[] {
	if (totalPages <= centerButtonsCount + 2) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	const currentPage = currentIndex + 1

	const leftInitial = currentPage - Math.floor(centerButtonsCount / 2)
	const rightInitial = currentPage + Math.ceil(centerButtonsCount / 2) - 1

	let left = leftInitial
	let right = rightInitial

	if (left < 2) {
		left = 2
		right = left + centerButtonsCount - 1
	}

	if (right > totalPages - 1) {
		right = totalPages - 1
		left = right - (centerButtonsCount - 1)
		if (left < 2) left = 2
	}

	const showLeftEllipsis = left > 2
	const showRightEllipsis = right < totalPages - 1

	const pages: PaginationElement[] = [1]
	if (showLeftEllipsis) pages.push(PAGINATION_ELLIPSIS)

	for (let page = left; page <= right; page++) pages.push(page)

	if (showRightEllipsis) pages.push(PAGINATION_ELLIPSIS)
	pages.push(totalPages)

	return pages
}

export const TablePagination = <T,>({ table, setPageIndex, pageIndex, centerButtons = 3 }: Props<T>) => {
	const totalPages = table.getPageCount()
	const currentPageIndex = table.getState().pagination.pageIndex

	const paginationRange = useMemo(
		() => getPaginationRange(totalPages, currentPageIndex, centerButtons),
		[totalPages, currentPageIndex, centerButtons],
	)

	return (
		<div className="flex justify-between flex-nowrap items-center">
			<Pagination className="flex justify-end mt-3">
				<PaginationContent>
					<PaginationItem>
						<Button
							variant="outline"
							size="icon"
							onClick={() => {
								setPageIndex(pageIndex - 1)
							}}
							disabled={!table.getCanPreviousPage()}
							className="cursor-pointer"
							aria-label="page-index-minus"
						>
							<ChevronLeft />
						</Button>
					</PaginationItem>

					{paginationRange.map((pageNumber, index) => {
						return pageNumber === PAGINATION_ELLIPSIS ? (
							<PaginationItem key={`ellipsis-${index}`}>
								<PaginationEllipsis />
							</PaginationItem>
						) : (
							<PaginationItem key={`page-${pageNumber}`}>
								<PaginationLink
									className="cursor-pointer"
									onClick={() => {
										const currentIndex = pageNumber - 1
										setPageIndex(currentIndex)
									}}
									isActive={currentPageIndex === pageNumber - 1}
								>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						)
					})}

					<PaginationItem>
						<Button
							variant="outline"
							size="icon"
							onClick={() => {
								setPageIndex(pageIndex + 1)
							}}
							disabled={!table.getCanNextPage()}
							className="cursor-pointer"
							aria-label="page-index-plus"
						>
							<ChevronRight />
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
