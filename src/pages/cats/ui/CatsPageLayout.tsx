import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable"
import type { FC } from "react"
import { Cats } from "./Cats"
import { Filters } from "./Filters"

interface ICatsPageLayoutProps {
	catId?: number
}

export const CatsPageLayout: FC<ICatsPageLayoutProps> = (props) => {
	return (
		<ResizablePanelGroup direction="horizontal" className="overflow-auto">
			<ResizablePanel defaultSize={15} maxSize={50}>
				<Filters />
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={85} className="relative flex flex-col">
				<Cats catId={props.catId} />
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
