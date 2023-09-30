export const floodfill = function floodfill(rgba, width, height, x, y, color){
    // Floodfill an RGBA image array of a given width and height
    // starting at (x, y) with a color.

    const startTime = Date.now();
    const maxDuration = 150; // Maximum duration of 800 ms
    
    var visited = new Uint8Array(width * height);
    var queue = new Int32Array(2 * width * height);

    // Only non-black pixels can be visited
    for (var i = 0; i < width * height; i++){
        var r = rgba[i * 4 + 0];
        var g = rgba[i * 4 + 1];
        var b = rgba[i * 4 + 2];
        var a = rgba[i * 4 + 3];

        var isBlack = a > 100 && r + g + b == 0;

        visited[i] = isBlack;
    }
    
    // Add initial pixel to queue
    var n = 0;
    queue[n++] = x;
    queue[n++] = y;
    
    // Mark initial pixel as visited
    var i = x + y * width;
    visited[i] = 1;
    rgba[i * 4 + 0] = color[0];
    rgba[i * 4 + 1] = color[1];
    rgba[i * 4 + 2] = color[2];
    rgba[i * 4 + 3] = 255;

    // While we have not processed all pixels yet
    while (n > 0){
      if (Date.now() - startTime > maxDuration) {
            console.warn('Flood fill operation timed out');
            break;
        }
        // Pop pixel from queue
        var y = queue[--n];
        var x = queue[--n];

        // Scan to the left
        var x1 = x;
        while (x1 > 0 && !visited[x1 - 1 + y * width]) x1--;

        // Scan to the right
        var x2 = x;
        while (x2 < width - 1 && !visited[x2 + 1 + y * width]) x2++;

        // Mark all pixels in scan line as visited
        for (var x = x1; x <= x2; x++){
            var i = x + y * width
            visited[i] = 1;
            rgba[i * 4 + 0] = color[0];
            rgba[i * 4 + 1] = color[1];
            rgba[i * 4 + 2] = color[2];
            rgba[i * 4 + 3] = 255;
        }

        // Add pixels above scan line to queue
        if (y + 1 < height){
            for (var x = x1; x <= x2; x++){
                var i = x + (y + 1) * width;
                if (!visited[i]){
                    visited[i] = 1;
                    queue[n++] = x;
                    queue[n++] = y + 1;
                }
            }
        }

        // Add pixels below scan line to queue
        if (y > 0){
            for (var x = x1; x <= x2; x++){
                var i = x + (y - 1) * width;
                if (!visited[i]){
                    visited[i] = 1;
                    queue[n++] = x;
                    queue[n++] = y - 1;
                }
            }
        }
    }
}