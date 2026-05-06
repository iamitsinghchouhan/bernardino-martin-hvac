# Service Images Directory

This directory should contain heating specialty images referenced in the services page.

## Required Images

The following images should be placed in this directory:

1. **gas-furnace.jpg** - Gas Furnace Repair service image (300x200 minimum)
2. **electric-furnace.jpg** - Electric Furnace Repair service image (300x200 minimum)
3. **floor-furnace.jpg** - Floor Furnace Services image (300x200 minimum)
4. **wall-furnace.jpg** - Wall Furnace Services image (300x200 minimum)
5. **furnace-replacement.jpg** - Furnace Replacement service image (300x200 minimum)

## Fallback Behavior

If any image is missing, the heating specialties section will display:
- A gradient background (purple-to-pink)
- An emoji icon for the service
- The service name text
- This ensures the page doesn't break even without images

## Image Specifications

- **Format**: JPEG or PNG
- **Minimum Size**: 300x200 pixels
- **Recommended Size**: 600x400 pixels (for 2x resolution)
- **File Size**: Optimize to < 100KB each
- **Aspect Ratio**: 3:2 (landscape format)

## Testing

After adding images:
1. Start dev server: `npm run dev:client`
2. Navigate to: http://localhost:5000/services
3. Click on "HVAC & Heating" category
4. The heating specialties section should show the images
5. Check browser console for any loading errors

## Production Deployment

When deploying:
1. Ensure images are in the same directory path
2. Server will serve from `/images/services/gas-furnace.jpg` etc.
3. Run `npm run build` to include images in the build
