#!/bin/bash

# Infinity Singularity Build Script
echo "🌌 Building Infinity - The Singularity of Sports Card Intelligence..."

# Create public directory if it doesn't exist
mkdir -p public

# Copy main files
cp public/index.html public/index.html
cp public/infinity-singularity.html public/infinity-singularity.html

# Create a simple index.html redirect for root
cat > index.html << 'INNER_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infinity - The Singularity of Sports Card Intelligence</title>
    <meta http-equiv="refresh" content="0; url=public/index.html">
</head>
<body>
    <div style="text-align: center; margin-top: 50px; font-family: Arial, sans-serif;">
        <h1>🌌 Loading Infinity...</h1>
        <p>Redirecting to the singularity of sports card intelligence...</p>
        <p><a href="public/index.html">Click here if not redirected automatically</a></p>
    </div>
</body>
</html>
INNER_EOF

echo "✅ Infinity build complete!"
echo "🚀 Ready for Vercel deployment!"
