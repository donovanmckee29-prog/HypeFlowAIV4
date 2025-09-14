#!/bin/bash

# Build script for HypeFlow AI Pro V3
echo "🚀 Building HypeFlow AI Pro V3..."

# Create public directory if it doesn't exist
mkdir -p public

# Copy main files to public directory
cp index.html public/

# Copy any other static assets if they exist
if [ -f "style.css" ]; then
    cp style.css public/
fi

if [ -f "script.js" ]; then
    cp script.js public/
fi

echo "✅ Build complete! Files copied to public directory:"
ls -la public/

echo "🎯 Ready for Vercel deployment!"
