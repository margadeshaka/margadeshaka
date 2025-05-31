// Script to check if the Sudarshan Chakra model is valid and download a new one if needed
const fs = require('fs');
const path = require('path');
const https = require('https');

// Path to the model file
const modelPath = path.join(__dirname, '../public/models/sudarshan-chakra.glb');

// Function to check if the model file is valid
function checkModelFile() {
  console.log('Checking Sudarshan Chakra model file...');
  
  // Check if the file exists
  if (!fs.existsSync(modelPath)) {
    console.error('Error: Model file does not exist!');
    return false;
  }
  
  // Check if the file is empty or too small
  const stats = fs.statSync(modelPath);
  if (stats.size < 100) { // Arbitrary small size that would indicate a problem
    console.error('Error: Model file is too small or empty!');
    return false;
  }
  
  // Try to read the first few bytes to check if it's a valid GLB file
  // GLB files start with a magic number "glTF"
  try {
    const buffer = Buffer.alloc(4);
    const fd = fs.openSync(modelPath, 'r');
    fs.readSync(fd, buffer, 0, 4, 0);
    fs.closeSync(fd);
    
    const magicBytes = buffer.toString('ascii');
    if (magicBytes !== 'glTF') {
      console.error('Error: Not a valid GLB file! Magic bytes:', magicBytes);
      return false;
    }
    
    console.log('Model file appears to be a valid GLB file.');
    return true;
  } catch (error) {
    console.error('Error reading model file:', error.message);
    return false;
  }
}

// Function to backup the existing model file
function backupModelFile() {
  if (fs.existsSync(modelPath)) {
    const backupPath = `${modelPath}.backup-${Date.now()}`;
    fs.copyFileSync(modelPath, backupPath);
    console.log(`Backed up existing model to ${backupPath}`);
  }
}

// Function to download a new model file
function downloadNewModel(url) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading new model from ${url}...`);
    
    // Backup existing file
    backupModelFile();
    
    // Create write stream
    const file = fs.createWriteStream(modelPath);
    
    // Download the file
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download file, status code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('Download completed successfully!');
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(modelPath, () => {}); // Delete the file on error
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(modelPath, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Main function
async function main() {
  const isValid = checkModelFile();
  
  if (!isValid) {
    console.log('The model file is invalid or corrupted.');
    console.log('You have the following options:');
    console.log('1. Replace the file manually with a valid GLB file');
    console.log('2. Download a sample GLB file from a trusted source');
    console.log('3. Use the fallback rendering which is already implemented');
    
    // If you want to automatically download a replacement, uncomment the following lines
    // and provide a valid URL to a GLB file:
    /*
    try {
      const modelUrl = 'https://example.com/path/to/sudarshan-chakra.glb';
      await downloadNewModel(modelUrl);
      console.log('Please restart the application to use the new model.');
    } catch (error) {
      console.error('Failed to download new model:', error.message);
      console.log('Please replace the model file manually or use the fallback rendering.');
    }
    */
  } else {
    console.log('The model file appears to be valid.');
    console.log('If you are still experiencing issues, the problem might be with the model content or format.');
    console.log('Consider replacing it with a simpler model or using the fallback rendering.');
  }
}

// Run the main function
main().catch(console.error);