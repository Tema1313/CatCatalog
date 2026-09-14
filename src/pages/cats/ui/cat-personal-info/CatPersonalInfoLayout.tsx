import { getCat } from "@/shared/api/GET/getCat"
import type { ICat } from "@/shared/api/model"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/components/ui/resizable"
import { useRequestSimulation } from "@/shared/hooks/useRequestSimulation"
import { Loader2 } from "lucide-react"
import { useEffect, useState, type FC } from "react"
import { CatForm } from "../CatForm"
import { CatPhotos } from "./CatPhotos"

interface ICatPersonalInfoLayoutProps {
	catId: number
}

export const CatPersonalInfoLayout: FC<ICatPersonalInfoLayoutProps> = (props) => {
	const [loading, reqSim] = useRequestSimulation()
	const [cat, setCat] = useState<ICat | undefined>(undefined)

	useEffect(() => {
		if (props.catId) {
			reqSim(() => {
				return getCat(props.catId)
			}).then((result) => {
				setCat(result || undefined)
			})
		}
	}, [props.catId])

	return (
		<>
			{loading ? (
				<div className="flex justify-center">
					<Loader2 className="m-2 h-10 w-10 animate-spin justify-center " />
				</div>
			) : (
				<ResizablePanelGroup direction="vertical">
					<ResizablePanel
						defaultSize={50}
						style={{
							overflow: "auto",
						}}
					>
						<div className="m-3">
							<CatForm mode="Update" cat={cat} />
						</div>
					</ResizablePanel>
					<ResizableHandle />
					<ResizablePanel defaultSize={50}>
						<CatPhotos photos={cat?.photos || []} />
					</ResizablePanel>
				</ResizablePanelGroup>
			)}
		</>
	)
}
