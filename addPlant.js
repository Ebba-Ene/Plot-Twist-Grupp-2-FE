import { getBaseUrl } from "./src/utils/api.js";

const form = document.querySelector("form");
const plantNameInput = document.querySelector("#plant-name");
const plantTypeInput = document.querySelector("#plant-type");
const plantImageInput = document.querySelector("#plant-image");
const plantLocationInput = document.querySelector("#plant-location");
const plantTimeInput = document.querySelector("#plant-time");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const plantName = plantNameInput.value.trim();
    const plantType = plantTypeInput.value.trim();
    const plantImage = plantImageInput.files[0];
    const plantLocation = plantLocationInput.value.trim();
    const plantTime = plantTimeInput.value.trim();

    if (!plantName || !plantType || !plantImage || !plantLocation || !plantTime) {
        alert("Please fill in all fields and select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("name", plantName);
    formData.append("species", plantType);
    formData.append("image", plantImage);
    formData.append("location", plantLocation);
    formData.append("meetingTime", plantTime);
    formData.append("coordinates", JSON.stringify([59.858, 17.644]));

    try {
        const response = await fetch(`${getBaseUrl()}plants`, {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Created plant:", data);

        alert("Plant added successfully!");
        form.reset();
        } catch (error) {
            console.error("Failed to add plant:", error);
            alert("Failed to add plant. Please try again.");
        }
        
        console.log(formData); 
});