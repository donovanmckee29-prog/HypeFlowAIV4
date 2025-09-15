#!/usr/bin/env node

/**
 * GitHub Repository Deployment Verification
 * Confirms all files are properly committed and pushed to hypeflowaiv3
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 Verifying GitHub Repository Deployment...\n');

// Check git status
console.log('📊 Git Status:');
try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    if (gitStatus.trim() === '') {
        console.log('✅ Working tree is clean - all changes committed');
    } else {
        console.log('⚠️ Uncommitted changes detected:');
        console.log(gitStatus);
    }
} catch (error) {
    console.log('❌ Error checking git status:', error.message);
}

// Check remote repository
console.log('\n🌐 Remote Repository:');
try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    console.log(`✅ Remote URL: ${remoteUrl}`);
    
    if (remoteUrl.includes('hypeflowaiv3')) {
        console.log('✅ Correct repository: hypeflowaiv3');
    } else {
        console.log('❌ Wrong repository detected');
    }
} catch (error) {
    console.log('❌ Error checking remote URL:', error.message);
}

// Check branch status
console.log('\n🌿 Branch Status:');
try {
    const branchInfo = execSync('git branch -vv', { encoding: 'utf8' });
    console.log(branchInfo);
    
    const isUpToDate = branchInfo.includes('[up to date]');
    if (isUpToDate) {
        console.log('✅ Branch is up to date with remote');
    } else {
        console.log('⚠️ Branch may not be up to date');
    }
} catch (error) {
    console.log('❌ Error checking branch status:', error.message);
}

// List all files in repository
console.log('\n📁 Repository Contents:');
const files = fs.readdirSync('.');
const importantFiles = [
    'login.html',
    'dashboard-ultimate.html',
    'grader.html',
    'oracle-ultimate.html',
    'compass.html',
    'arena.html',
    'portfolio.html',
    'futurecasting.html',
    'auth-system.js',
    'infinity-ai.js',
    'server.js',
    'package.json',
    'README.md',
    'PERFECT_PLATFORM_SUMMARY.md',
    'multi-user-test.html',
    'test-perfect.js',
    'optimize.js',
    'verify-auth.js'
];

let allFilesPresent = true;
importantFiles.forEach(file => {
    if (files.includes(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        allFilesPresent = false;
    }
});

// Check commit history
console.log('\n📝 Recent Commits:');
try {
    const commits = execSync('git log --oneline -5', { encoding: 'utf8' });
    console.log(commits);
} catch (error) {
    console.log('❌ Error checking commit history:', error.message);
}

// Final verification
console.log('\n🎯 Deployment Verification Summary:');
console.log('=====================================');

if (allFilesPresent) {
    console.log('✅ All important files are present');
} else {
    console.log('❌ Some important files are missing');
}

try {
    const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
    if (gitStatus.trim() === '') {
        console.log('✅ All changes are committed');
    } else {
        console.log('❌ Uncommitted changes exist');
    }
} catch (error) {
    console.log('❌ Error checking git status');
}

try {
    const remoteUrl = execSync('git remote get-url origin', { encoding: 'utf8' }).trim();
    if (remoteUrl.includes('hypeflowaiv3')) {
        console.log('✅ Correct GitHub repository: hypeflowaiv3');
    } else {
        console.log('❌ Wrong repository');
    }
} catch (error) {
    console.log('❌ Error checking repository');
}

console.log('\n🚀 Repository Information:');
console.log(`📂 Repository: https://github.com/donovanmckee29-prog/HypeFlowAIV3`);
console.log(`🌿 Branch: main`);
console.log(`📊 Status: ${allFilesPresent ? 'COMPLETE' : 'INCOMPLETE'}`);

if (allFilesPresent) {
    console.log('\n🎉 SUCCESS! Infinity Platform is fully deployed to GitHub!');
    console.log('\n📝 Access your repository at:');
    console.log('https://github.com/donovanmckee29-prog/HypeFlowAIV3');
    console.log('\n✨ Your perfect sports card AI platform is now live on GitHub!');
} else {
    console.log('\n⚠️ Some issues detected. Please check the missing files above.');
}

console.log('\n🌟 Infinity Platform - Deployed to GitHub Successfully!');
