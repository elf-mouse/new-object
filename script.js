document.addEventListener('DOMContentLoaded', () => {
    const bgImage = document.getElementById('bgImage');
    const hotspotContainer = document.getElementById('hotspotContainer');

    // --- Configuration ---
    // IMPORTANT: User needs to replace 'placeholder-background.jpg' in index.html
    // and update these hotspot coordinates based on their NEW image's original dimensions.
    const hotspotsConfig = [
        {
            id: 'hotspot1',
            x: 10, // Percentage from left of original image
            y: 15, // Percentage from top of original image
            width: 20, // Percentage width of original image
            height: 10, // Percentage height of original image
            url: 'https://example.com/page1',
            title: 'Hotspot 1: Example Page 1'
        },
        {
            id: 'hotspot2',
            x: 60, // Percentage from left
            y: 40, // Percentage from top
            width: 15, // Percentage width
            height: 15, // Percentage height
            url: 'https://example.com/page2',
            title: 'Hotspot 2: Example Page 2'
        }
        // Add more hotspots here as needed
    ];

    // Store original image dimensions once loaded - crucial for percentage calculations
    let originalImageWidth = 0;
    let originalImageHeight = 0;

    function createHotspots() {
        hotspotContainer.innerHTML = ''; // Clear existing hotspots if any

        hotspotsConfig.forEach(config => {
            const hotspotElement = document.createElement('a');
            hotspotElement.href = config.url;
            hotspotElement.classList.add('hotspot');
            hotspotElement.id = config.id;
            if (config.title) {
                hotspotElement.title = config.title;
                // hotspotElement.textContent = config.title; // Optional: display title in hotspot
            }
            hotspotElement.style.pointerEvents = 'auto'; // Ensure it's clickable

            hotspotContainer.appendChild(hotspotElement);
        });
        adjustHotspots(); // Adjust them once created
    }

    function adjustHotspots() {
        if (!bgImage || !hotspotContainer || originalImageWidth === 0 || originalImageHeight === 0) {
            // console.warn("Background image or container not found, or original dimensions not set.");
            return;
        }

        // Get the actual displayed dimensions of the background image
        const displayedImageWidth = bgImage.clientWidth;
        const displayedImageHeight = bgImage.clientHeight;

        // Calculate the offset of the image within its container if object-fit: contain is used
        // and the image aspect ratio doesn't match the container aspect ratio.
        const imageAspectRatio = originalImageWidth / originalImageHeight;
        const containerAspectRatio = bgImage.parentElement.clientWidth / bgImage.parentElement.clientHeight;

        let imageOffsetX = 0;
        let imageOffsetY = 0;
        let effectiveDisplayWidth = displayedImageWidth;
        let effectiveDisplayHeight = displayedImageHeight;

        if (imageAspectRatio > containerAspectRatio) { // Image is wider or less tall than container
            effectiveDisplayHeight = displayedImageWidth / imageAspectRatio;
            imageOffsetY = (displayedImageHeight - effectiveDisplayHeight) / 2;
        } else { // Image is taller or less wide than container
            effectiveDisplayWidth = displayedImageHeight * imageAspectRatio;
            imageOffsetX = (displayedImageWidth - effectiveDisplayWidth) / 2;
        }

        // Adjust hotspot container to perfectly overlay the 'object-fit: contain' image
        hotspotContainer.style.width = `${effectiveDisplayWidth}px`;
        hotspotContainer.style.height = `${effectiveDisplayHeight}px`;
        hotspotContainer.style.left = `${bgImage.offsetLeft + imageOffsetX}px`;
        hotspotContainer.style.top = `${bgImage.offsetTop + imageOffsetY}px`;


        hotspotsConfig.forEach(config => {
            const hotspotElement = document.getElementById(config.id);
            if (hotspotElement) {
                // Calculate position and size based on the *effective displayed size* of the image
                const xPos = (config.x / 100) * effectiveDisplayWidth;
                const yPos = (config.y / 100) * effectiveDisplayHeight;
                const width = (config.width / 100) * effectiveDisplayWidth;
                const height = (config.height / 100) * effectiveDisplayHeight;

                hotspotElement.style.left = `${xPos}px`;
                hotspotElement.style.top = `${yPos}px`;
                hotspotElement.style.width = `${width}px`;
                hotspotElement.style.height = `${height}px`;
            }
        });
    }

    bgImage.onload = () => {
        // Capture the intrinsic (natural) dimensions of the loaded image
        // These are considered the "original" dimensions for percentage calculations.
        originalImageWidth = bgImage.naturalWidth;
        originalImageHeight = bgImage.naturalHeight;

        if (originalImageWidth === 0 || originalImageHeight === 0) {
            console.error("Error: Background image naturalWidth or naturalHeight is 0. Check image path and integrity.");
            // Fallback: try to use offsetWidth/Height if natural dimensions fail, though less reliable for unloaded images
            // originalImageWidth = bgImage.offsetWidth;
            // originalImageHeight = bgImage.offsetHeight;
            // if(originalImageWidth === 0 || originalImageHeight === 0){
            //     alert("Could not determine background image dimensions. Hotspots may not work correctly. Please ensure 'placeholder-background.jpg' exists and is a valid image.");
            //     return;
            // }
        }

        createHotspots(); // Create hotspots now that we have original dimensions
        // No need to call adjustHotspots() here as createHotspots calls it.
    };

    // Handle cases where the image might already be loaded (e.g., from cache)
    if (bgImage.complete && bgImage.naturalWidth > 0) {
      bgImage.onload(); // Manually trigger onload if already complete
    } else if (bgImage.complete && bgImage.naturalWidth === 0) {
        // Image is 'complete' but seems broken or not found
        console.error("Background image is marked complete by the browser, but has no dimensions. Check image path: " + bgImage.src);
        // alert("Background image (" + bgImage.src + ") could not be loaded properly. Hotspots may not work. Please check the image file and path.");
    }


    window.addEventListener('resize', adjustHotspots);

    // Initial call in case image is already loaded (e.g. from cache)
    // and onload doesn't fire reliably on all browsers for cached images.
    // The bgImage.onload handler is more robust.
    // adjustHotspots(); // This might be too early if original dimensions aren't set.
});
