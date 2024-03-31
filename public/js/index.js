const shortenBtn = document.querySelector(".shorten-button");
const urlInput = document.querySelector("#url");
const shortenedUrlText = document.querySelector(".shortened-url-text");
const copyBtn = document.getElementById("copy-button");

shortenBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const url = urlInput.value;

    // Regular expression to validate URL
    const urlPattern =
        /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (!urlPattern.test(url)) {
        showToast("Please enter a valid URL");
        return;
    }
    //https://link-minify.vercel.app/api/v1/shorten
    const response = await fetch("/api/v1/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });
    const data = await response.json();

    if (response.status === 200) {
        shortenedUrlText.value = data.shortLink;
        urlInput.value = ""; // Clear the input field
    } else {
        console.error(data);
    }
});

copyBtn.addEventListener("click", () => {
    const copyText = shortenedUrlText.value;
    if (!copyText) {
        return;
    }

    navigator.clipboard
        .writeText(copyText)
        .then(() => {
            showToast("Copied to clipboard");
        })
        .catch((error) => {
            console.error("Failed to copy to clipboard:", error);
        });
});

function showToast(message) {
    // Create toast container if it doesn't exist
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    // Create the toast
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;

    // Add the toast to the container
    container.appendChild(toast);

    // Show the toast
    setTimeout(() => {
        toast.classList.add("toast-show");
    }, 100); // Slight delay to allow for CSS transition

    // Automatically remove the toast after 5 seconds
    setTimeout(() => {
        toast.classList.remove("toast-show");
        setTimeout(() => {
            container.removeChild(toast);
            if (container.childNodes.length === 0) {
                container.parentNode.removeChild(container);
            }
        }, 600); // Wait for the hide transition before removing
    }, 5000);
}

function showSidebar() {
    document.querySelector(".sidebar").style.display = "flex";
}

function hideSidebar() {
    document.querySelector(".sidebar").style.display = "none";
}
