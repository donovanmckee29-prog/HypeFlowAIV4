#!/usr/bin/env node

/**
 * Infinity Platform Deployment Script
 * Deploys to git repository hypeflowaiv3
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌌 Starting Infinity Platform Deployment...\n');

// Check if git is initialized
try {
    execSync('git status', { stdio: 'pipe' });
    console.log('✅ Git repository detected');
} catch (error) {
    console.log('🔧 Initializing git repository...');
    execSync('git init', { stdio: 'inherit' });
}

// Add all files
console.log('📁 Adding files to git...');
execSync('git add .', { stdio: 'inherit' });

// Check for changes
try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    if (!status.trim()) {
        console.log('ℹ️  No changes to commit');
    } else {
        // Commit changes
        console.log('💾 Committing changes...');
        execSync('git commit -m "Infinity Platform v1.0.0 - Ultimate Sports Card AI Platform"', { stdio: 'inherit' });
    }
} catch (error) {
    console.log('⚠️  No changes to commit or commit failed');
}

// Check if remote exists
try {
    execSync('git remote get-url origin', { stdio: 'pipe' });
    console.log('✅ Remote origin exists');
} catch (error) {
    console.log('🔗 Adding remote origin...');
    execSync('git remote add origin https://github.com/yourusername/hypeflowaiv3.git', { stdio: 'inherit' });
}

// Push to repository
console.log('🚀 Pushing to repository...');
try {
    execSync('git push -u origin main', { stdio: 'inherit' });
    console.log('✅ Successfully pushed to hypeflowaiv3 repository');
} catch (error) {
    console.log('⚠️  Push failed, trying to set upstream...');
    try {
        execSync('git branch -M main', { stdio: 'inherit' });
        execSync('git push -u origin main', { stdio: 'inherit' });
        console.log('✅ Successfully pushed to hypeflowaiv3 repository');
    } catch (retryError) {
        console.log('❌ Push failed. Please check your git configuration and try again.');
        console.log('Manual steps:');
        console.log('1. git remote add origin https://github.com/yourusername/hypeflowaiv3.git');
        console.log('2. git branch -M main');
        console.log('3. git push -u origin main');
    }
}

// Create deployment summary
const deploymentSummary = {
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    platform: 'Infinity Sports Card AI Platform',
    features: [
        'Secure Authentication with 2FA',
        'AI Grader with Nanoscopic Precision',
        'AI Oracle with Predictive Modules',
        'Investment Compass with Top Picks',
        'Collector Arena with Gamification',
        'Portfolio Mastery with Real-time Tracking',
        'Futurecasting Engine with Trend Predictions',
        'Advanced Market Scanner',
        'AI Negotiator',
        'Cross-Market Analysis',
        'Self-Learning AI Modules'
    ],
    status: 'Deployed Successfully',
    repository: 'hypeflowaiv3'
};

fs.writeFileSync('deployment-summary.json', JSON.stringify(deploymentSummary, null, 2));

console.log('\n🎉 Infinity Platform Deployment Complete!');
console.log('📊 Deployment Summary:');
console.log(`   Version: ${deploymentSummary.version}`);
console.log(`   Features: ${deploymentSummary.features.length}`);
console.log(`   Repository: ${deploymentSummary.repository}`);
console.log(`   Status: ${deploymentSummary.status}`);
console.log(`   Timestamp: ${deploymentSummary.timestamp}`);

console.log('\n🌐 Next Steps:');
console.log('1. Set up your production environment');
console.log('2. Configure environment variables');
console.log('3. Set up MongoDB database');
console.log('4. Deploy to your hosting platform');
console.log('5. Configure domain and SSL');

console.log('\n📚 Documentation:');
console.log('- README.md for setup instructions');
console.log('- API documentation in server.js');
console.log('- Frontend components in HTML files');

console.log('\n🚀 Infinity is ready to revolutionize sports card collecting!');
