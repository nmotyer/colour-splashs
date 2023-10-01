import { json } from '@sveltejs/kit';

export async function GET(req) {
  // Define the path to the thumbnails directory
  //const thumbsDir = path.resolve('static/images/thumbs');

  // Read the directory for jpg files
  const filenames = [
    'binary_image.jpg',
    'processed_image.jpg',
    'swimming-guy.png'
  ]

  // Return the list of filenames in a Response object
  return json(filenames)

}