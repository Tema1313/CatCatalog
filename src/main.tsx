import { createRoot } from "react-dom/client"
import "./index.css"
import React from "react"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./app/router/routeTree.gen"
import { Toaster } from "./shared/components/ui/sonner"

import "./i18n"

// Create a new router instance
const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Toaster position="top-right" />
		<RouterProvider router={router} />
	</React.StrictMode>,
)
