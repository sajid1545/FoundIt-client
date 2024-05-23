import { Input } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

const FoundItImageUpload = () => {
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const handleFileChange = (e: any) => {
		setImage(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (!image) return;

		setLoading(true);
		const formData = new FormData();
		formData.append("image", image);

		try {
			const apiKey = "abf703d0b85d0c19f3408875de351a48"; // Replace with your ImgBB API key
			const response = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
			setImageUrl(response.data.data.url);
		} catch (error) {
			console.error("Error uploading image:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<Input type="file" onChange={handleFileChange} />
			{/* <input type="file" accept="image/*" onChange={handleFileChange} /> */}
			<button type="button" className="m-10" onClick={handleUpload} disabled={loading}>
				{loading ? "Uploading..." : "Upload Image"}
			</button>
			{imageUrl && <Image src={imageUrl} alt="Uploaded Image" width={200} height={200} />}
		</div>
	);
};

export default FoundItImageUpload;
