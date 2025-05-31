# Troubleshooting Sudarshan Chakra Model Loading Issues

If you're experiencing issues with the Sudarshan Chakra 3D model not loading correctly, this guide will help you diagnose and fix the problem.

## Common Error: "Could not load /models/sudarshan-chakra.glb: Unexpected end of JSON input"

This error typically indicates that the GLB file is corrupted or improperly formatted. Here's how to fix it:

## Option 1: Use the Test Page

We've created a special test page that helps diagnose and fix model loading issues:

1. Navigate to `/test-model.html` in your browser
2. The page will attempt to load the model and show any errors
3. Click the "Check Model File" button to run diagnostics on the file
4. If the file is corrupted, click the "Fix Model File" button to replace it with a working model
5. After fixing, click "Reload Model" to verify the model loads correctly

## Option 2: Use the Scripts Directly

If you prefer to use the command line:

1. Open a terminal in the project root directory
2. Run `node scripts/check-model.js` to diagnose the model file
3. Run `node scripts/fix-model.js` to replace the corrupted model file

## Option 3: Manual Replacement

If the above options don't work, you can manually replace the model file:

1. Find a valid GLB file to use as a replacement (you can use a simple cube or sphere model if needed)
2. Rename it to `sudarshan-chakra.glb`
3. Place it in the `/public/models/` directory, replacing the existing file

## Fallback Rendering

The application includes a fallback rendering that will be displayed if the model fails to load. This ensures that users will still see a representation of the Sudarshan Chakra even if the 3D model file is missing or corrupted.

## Creating a Custom Model

For the best experience, consider creating a custom Sudarshan Chakra model:

1. Use Blender or another 3D modeling tool to create a model based on the descriptions in Hindu scriptures
2. Export the model in GLB format
3. Place it in the `/public/models/` directory as `sudarshan-chakra.glb`

See the README.md file in the models directory for more details on model requirements.

## Still Having Issues?

If you're still experiencing problems after trying these solutions:

1. Check the browser console for more detailed error messages
2. Ensure your browser supports WebGL and 3D rendering
3. Try a different browser to rule out browser-specific issues
4. Check that the model file size is reasonable (under 5MB is recommended)