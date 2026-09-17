import { useState, type FC } from "react"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/shared/components/ui/carousel"
import { Card, CardContent } from "@/shared/components/ui/card"
import { useLanguage } from "@/i18n/hooks/useLanguage"

interface ICatPhotosProps {
	photos: string[]
}

export const CatPhotos: FC<ICatPhotosProps> = (props) => {
	const [loaded, setLoaded] = useState(false)
	const { t } = useLanguage()

	return (
		<div className="relative w-full h-full flex justify-center items-center">
			{props.photos.length !== 0 ? (
				<Carousel className="w-full max-w-[12rem] sm:max-w-xs">
					<CarouselContent>
						{props.photos.map((photo, index) => (
							<CarouselItem key={index}>
								<div className="p-1">
									<Card>
										<CardContent className="flex aspect-square items-center justify-center">
											{!loaded && <div className="absolute inset-0 bg-muted animate-pulse rounded" />}

											<img
												src={photo}
												alt={""}
												onLoad={() => setLoaded(true)}
												onError={() => setLoaded(true)}
												decoding="async"
												draggable={false}
												className={`w-full h-full object-contain transition-opacity duration-200 ${
													loaded ? "opacity-100" : "opacity-0"
												}`}
											/>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			) : (
				<div>{t("cats.no-kitty-photo")}</div>
			)}
		</div>
	)
}
