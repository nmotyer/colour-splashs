import fs from 'fs';
import path from 'path';
import { json } from '@sveltejs/kit';

export async function GET(req) {
  // Define the path to the thumbnails directory
  const thumbsDir = path.resolve('static/images/thumbs');

  // Read the directory for jpg files
  const filenames = fs.readdirSync(thumbsDir).filter(file => file.endsWith('.jpg'));

  // Return the list of filenames in a Response object
  return json(filenames)

}