"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface LinkResponse {
	link: string;
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;

export default function RedirectPage() {
	const params = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchLink = async () => {
			try {
				const fullUrl = `${serverUrl}links/${params.short}`;
				console.log("Server URL in redirect page:", serverUrl);
				console.log("Full URL being requested:", fullUrl);
				const response = await axios.get(fullUrl);
				const data: LinkResponse = response.data;
				window.location.href = data.link;
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "An error occurred",
				);
				setIsLoading(false);
			}
		};

		fetchLink();
	}, [params.short]);

	if (error) {
		return (
			<div className="flex items-center justify-center min-h-screen gap-4 flex-col">
				<p className="">Error: {error}</p>
				<Link
					href="/"
					className={cn(buttonVariants({ variant: "outline" }))}
				>
					Go home
				</Link>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-xl font-semibold">Redirecting...</div>
		</div>
	);
}
