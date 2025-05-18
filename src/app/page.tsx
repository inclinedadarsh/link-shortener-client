"use client";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
import { ArrowUpRight, Copy, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const linkSchema = z.string().url();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL!;
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL!;

export default function Home() {
	const [linkInput, setLinkInput] = useState<z.infer<typeof linkSchema>>("");
	const [isLoading, setIsLoading] = useState(false);
	const [shortenedLink, setShortenedLink] = useState("");

	const handleSubmit = async () => {
		try {
			setIsLoading(true);

			console.log("Server URL in home page:", serverUrl);
			console.log("Full URL being requested:", `${serverUrl}links`);

			if (linkInput === "") {
				toast.warning("Please enter a link!");
				return;
			}

			if (!linkSchema.safeParse(linkInput).success) {
				toast.error("Please enter a valid link!");
				return;
			}

			const response = await axios.post(`${serverUrl}links`, {
				link: linkInput,
			});
			const data = response.data;

			setShortenedLink(`${websiteUrl}/${data.short}`);

			confetti({
				particleCount: 200,
				spread: 70,
				origin: { y: 0.6 },
			});
		} catch (err) {
			// toast.error(err.message);
		} finally {
			setIsLoading(false);
		}
	};

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
				onClick={handleSubmit}
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
			{shortenedLink && (
				<div className="flex gap-2 mt-16">
					<span className="flex-1 truncate border-border border rounded-sm py-1 px-3 font-mono">
						{shortenedLink}
					</span>
					<Button
						variant="outline"
						size="icon"
						onClick={() => window.open(shortenedLink, "_blank")}
					>
						<ArrowUpRight />
					</Button>
					<Button
						variant="outline"
						size="icon"
						onClick={() => {
							navigator.clipboard.writeText(shortenedLink);
							toast.success("Link copied to clipboard!");
						}}
					>
						<Copy />
					</Button>
				</div>
			)}
		</main>
	);
}
