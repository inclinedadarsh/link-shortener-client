"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle } from "lucide-react";

export default function Home() {
	const [linkInput, setLinkInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	return (
		<main className="mt-20">
			<h1 className="text-center tracking-tight font-semibold text-3xl md:text-5xl">
				Simple Link Shortener
			</h1>
			<p className="text-gray-600 text-center mt-4">
				Just shorten your links. Idk why am I putting a description here
				🤷‍♂️
			</p>

			<Input
				className="mt-8"
				value={linkInput}
				onChange={e => setLinkInput(e.target.value)}
				placeholder="Enter your links here"
				disabled={isLoading}
			/>
			<Button
				type="button"
				className="mt-4 w-full cursor-pointer disabled:cursor-default"
				disabled={isLoading}
			>
				{isLoading ? (
					<LoaderCircle className="animate-spin" />
				) : (
					"Shorten it!"
				)}
			</Button>
		</main>
	);
}
