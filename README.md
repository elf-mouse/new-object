# Universal Static Page Template with Responsive Hotspots

This template provides a configurable static HTML, CSS, and JavaScript setup for creating a webpage with a background image and interactive, responsive hotspots.

## Features

*   **Replaceable Background Image:** Easily change the main background image.
*   **JavaScript-driven Hotspots:** Define interactive areas (hotspots) on the image.
*   **Customizable Hotspots:** Each hotspot has configurable positioning, size, and a unique click-through URL.
*   **Responsive Design:** Hotspots dynamically resize and reposition in sync with the background image, adapting to different viewport sizes.

## File Structure

*   `index.html`: The main HTML file containing the page structure.
*   `style.css`: CSS styles for the page, background image, and hotspots.
*   `script.js`: JavaScript logic for hotspot definition, dynamic creation, and responsiveness.
*   `placeholder-background.jpg`: A placeholder image. **You must replace this with your own image.**

## Setup and Customization

1.  **Replace Background Image:**
    *   Place your desired background image file in the root directory of this project. For example, if your image is `my-awesome-background.png`.
    *   Open `index.html`.
    *   Find the `<img>` tag with the `id="bgImage"`:
        ```html
        <img src="placeholder-background.jpg" alt="Background Image" id="bgImage">
        ```
    *   Change the `src` attribute to your image file:
        ```html
        <img src="my-awesome-background.png" alt="Background Image" id="bgImage">
        ```

2.  **Define Hotspots (`script.js`):**
    *   Open `script.js`.
    *   Locate the `hotspotsConfig` array:
        ```javascript
        const hotspotsConfig = [
            {
                id: 'hotspot1', // Unique ID
                x: 10,          // % from left of original image
                y: 15,          // % from top of original image
                width: 20,      // % width of original image
                height: 10,     // % height of original image
                url: 'https://example.com/page1',
                title: 'Hotspot 1: Example Page 1' // Optional tooltip
            },
            // ... more hotspots
        ];
        ```

---
**Note on `designSpec` Constant:**

At the beginning of `script.js`, you'll find a `designSpec` constant:

```javascript
const designSpec = {
    width: 375,
    height: 667
};
```
This object holds reference dimensions, potentially from an initial design mockup (e.g., a mobile-first design canvas size). It's included primarily for **debugging reference** or if you need a fixed point of reference for calculating initial hotspot percentages before you have finalized your actual background image.

However, the core responsive logic of the hotspots (positioning and scaling) **relies on the `naturalWidth` and `naturalHeight` of the actual background image you load**, not on `designSpec`. The hotspot `x, y, width, height` percentages in `hotspotsConfig` should always be relative to your *actual* background image's dimensions for correct display.
---
    *   **Understanding Coordinates and Dimensions:**
        *   The `x`, `y`, `width`, and `height` values are **percentages** relative to the **original, natural dimensions** of your background image.
        *   For example, if your original image is `1000px` wide and `500px` tall:
            *   `x: 10` means the hotspot starts `100px` from the left edge of the original image (`10%` of `1000px`).
            *   `y: 15` means the hotspot starts `75px` from the top edge of the original image (`15%` of `500px`).
            *   `width: 20` means the hotspot is `200px` wide on the original image (`20%` of `1000px`).
            *   `height: 10` means the hotspot is `50px` high on the original image (`10%` of `500px`).
    *   **How to Get Percentage Values:**
        1.  Open your background image in an image editor (like GIMP, Photoshop, Paint.NET, or even a browser).
        2.  Determine the original pixel dimensions of your image (e.g., `1920px` wide by `1080px` high).
        3.  For each hotspot you want to create:
            *   Note the top-left X pixel coordinate.
            *   Note the top-left Y pixel coordinate.
            *   Note the desired pixel width.
            *   Note the desired pixel height.
        4.  Calculate the percentages:
            *   `x_percentage = (hotspot_X_pixels / original_image_width_pixels) * 100`
            *   `y_percentage = (hotspot_Y_pixels / original_image_height_pixels) * 100`
            *   `width_percentage = (hotspot_width_pixels / original_image_width_pixels) * 100`
            *   `height_percentage = (hotspot_height_pixels / original_image_height_pixels) * 100`
    *   **Modify `hotspotsConfig`:**
        *   Add, remove, or edit objects in the `hotspotsConfig` array to define your hotspots.
        *   `id`: Must be a unique string for each hotspot.
        *   `x`, `y`, `width`, `height`: Use the percentage values you calculated.
        *   `url`: The web address the hotspot should link to.
        *   `title`: (Optional) Text that will appear as a browser tooltip when hovering over the hotspot.

3.  **Styling Hotspots (`style.css`):**
    *   Open `style.css`.
    *   You can modify the `.hotspot` class to change the appearance of the hotspots (e.g., background color, border, opacity).
        ```css
        .hotspot {
            background-color: rgba(255, 0, 0, 0.3); /* Default: semi-transparent red */
            border: 1px solid rgba(255, 0, 0, 0.7);
            /* ... other styles ... */
        }
        .hotspot:hover {
            background-color: rgba(255, 0, 0, 0.5);
        }
        ```

## How it Works

The `script.js` file listens for the background image to load to get its original dimensions. It then dynamically creates hotspot elements (`<a>` tags) based on the `hotspotsConfig`. When the browser window is resized, the script recalculates the position and size of each hotspot based on the current displayed size of the background image, ensuring the hotspots remain accurately mapped. The CSS uses `object-fit: contain` for the background image, and the JavaScript is designed to correctly calculate hotspot placement even when the image is letterboxed or pillarboxed.

## Testing the Template

After you have configured your background image and hotspots:

1.  **Open `index.html` in your web browser.**
2.  **Initial Load & Configuration Check:**
    *   Verify your background image is displayed.
    *   Check that your hotspots appear at the locations you defined. If not, double-check your percentage calculations in `hotspotsConfig`.
    *   Look at your browser's developer console (usually F12) for any error messages.
3.  **Responsiveness Test:**
    *   Resize your browser window to various widths and heights (simulate desktop, tablet, and mobile views).
    *   Confirm that the hotspots scale and move proportionally with the background image, always staying in their correct relative positions.
4.  **Interactivity Test:**
    *   Hover over each hotspot. Does the optional `title` appear as a tooltip? Does any hover styling (from `style.css`) apply?
    *   Click on each hotspot. Does it navigate to the correct URL specified in `hotspotsConfig`?
5.  **Cross-Browser Check (Recommended):**
    *   Test the page in different web browsers (e.g., Chrome, Firefox, Safari, Edge) to ensure consistent behavior.

## Troubleshooting

*   **Hotspots Misaligned:**
    *   The most common issue is incorrect percentage values in `hotspotsConfig`. Ensure your calculations are based on the **original, natural dimensions** of your specific background image.
    *   Verify the `src` attribute of the `<img>` tag in `index.html` correctly points to your image.
*   **Image Not Showing:**
    *   Check the image path in `index.html`.
    *   Ensure the image file is in the correct location.
*   **Hotspots Not Clickable:**
    *   Ensure there are no JavaScript errors in the browser console.
    *   Check `style.css` to ensure hotspot elements (`.hotspot`) have `pointer-events: auto;` (which is the default in the provided CSS).

This template provides a solid foundation. Feel free to extend and adapt it to your specific needs!