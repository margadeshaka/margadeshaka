import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    // Path to the check-model.js script
    const scriptPath = path.join(process.cwd(), 'scripts', 'check-model.js');
    
    // Check if the script exists
    if (!fs.existsSync(scriptPath)) {
      return NextResponse.json(
        { error: 'Check model script not found' },
        { status: 404 }
      );
    }
    
    // Execute the script
    const output = await new Promise<string>((resolve, reject) => {
      exec(`node ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout || stderr);
      });
    });
    
    // Return the output
    return NextResponse.json({ output });
  } catch (error) {
    console.error('Error checking model:', error);
    return NextResponse.json(
      { error: 'Failed to check model file', details: error.message },
      { status: 500 }
    );
  }
}