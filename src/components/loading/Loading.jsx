import React from "react";

function Loading() {
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<img
				className="w-[20%] object-cover object-center"
				src="https://www.icegif.com/wp-content/uploads/writing-icegif-8.gif"
				alt="Loading..."
			/>
		</div>
	);
}

export default Loading;
