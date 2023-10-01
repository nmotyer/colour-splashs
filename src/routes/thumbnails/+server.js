import { json } from '@sveltejs/kit';

// Assuming you don't need any slug transformation as in the StackOverflow post
// because you just want the filenames
function filenameFromPath(filePath) {
  return filePath.split('/').pop();
}

export async function GET() {
    // Use glob to dynamically import jpg files from the thumbs directory
    const modules = import.meta.glob('/src/static/images/thumbs/*.{jpg,jpeg,png,gif,svg,avif}');

    const filenamesPromises = [];

    for (let [filePath, resolver] of Object.entries(modules)) {
        const promise = resolver().then(() => filenameFromPath(filePath));
        filenamesPromises.push(promise);
    }

    const filenames = await Promise.all(filenamesPromises);

    return json(filenames)
  }