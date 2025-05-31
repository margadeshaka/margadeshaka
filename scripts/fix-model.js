// Script to fix or replace the corrupted Sudarshan Chakra model file
const fs = require('fs');
const path = require('path');
const https = require('https');

// Path to the model file
const modelPath = path.join(__dirname, '../public/models/sudarshan-chakra.glb');

// URL to a sample GLB file (this is a placeholder - replace with an actual URL to a valid GLB file)
// For example, you could use a sample model from the Three.js examples or a public model repository
const sampleModelUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb';

// Function to backup the existing model file
function backupModelFile() {
  if (fs.existsSync(modelPath)) {
    const backupPath = `${modelPath}.backup-${Date.now()}`;
    fs.copyFileSync(modelPath, backupPath);
    console.log(`Backed up existing model to ${backupPath}`);
    return backupPath;
  }
  return null;
}

// Function to download a new model file
function downloadNewModel(url) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading new model from ${url}...`);
    
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

// Function to create a simple placeholder GLB file
// This is a very basic approach - in a real scenario, you'd want to use a proper 3D modeling tool
function createPlaceholderModel() {
  console.log('Creating a placeholder model file...');
  
  // This is a minimal valid GLB file structure
  // It's not a proper Sudarshan Chakra, just a placeholder to demonstrate the concept
  // In a real scenario, you would use a proper 3D modeling tool to create the model
  
  // For now, we'll just download the sample model as a placeholder
  return downloadNewModel(sampleModelUrl);
}

// Main function
async function main() {
  try {
    console.log('Starting model fix process...');
    
    // Backup the existing file
    const backupPath = backupModelFile();
    console.log(backupPath ? 'Backup created.' : 'No existing file to backup.');
    
    // Ask the user what they want to do
    console.log('\nPlease choose an option:');
    console.log('1. Download a sample model (this is just a placeholder, not a proper Sudarshan Chakra)');
    console.log('2. Create a simple placeholder model');
    console.log('3. Restore from backup (if available)');
    console.log('4. Exit without making changes');
    
    // In a real interactive script, you would get user input here
    // For this example, we'll just proceed with option 1
    const choice = 1;
    
    switch (choice) {
      case 1:
        await downloadNewModel(sampleModelUrl);
        console.log('Sample model downloaded successfully.');
        break;
      case 2:
        await createPlaceholderModel();
        console.log('Placeholder model created successfully.');
        break;
      case 3:
        if (backupPath) {
          fs.copyFileSync(backupPath, modelPath);
          console.log('Model restored from backup.');
        } else {
          console.log('No backup available to restore from.');
        }
        break;
      case 4:
        console.log('Exiting without making changes.');
        break;
      default:
        console.log('Invalid choice. Exiting without making changes.');
    }
    
    console.log('\nModel fix process completed.');
    console.log('Please restart the application and test the model loading.');
  } catch (error) {
    console.error('Error fixing model:', error.message);
  }
}

// Run the main function
main().catch(console.error);