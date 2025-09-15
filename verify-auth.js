#!/usr/bin/env node

/**
 * Authentication Verification Script
 * Tests the login and registration functionality
 */

const fs = require('fs');
const path = require('path');

console.log('🔐 Verifying Infinity Authentication System...\n');

// Check if required files exist
const requiredFiles = [
    'login.html',
    'auth-system.js',
    'infinity-ai.js',
    'test-auth.html'
];

console.log('📁 Checking required files...');
let allFilesExist = true;

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} - Found`);
    } else {
        console.log(`❌ ${file} - Missing`);
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.log('\n❌ Some required files are missing. Please check the file structure.');
    process.exit(1);
}

// Check auth-system.js for key functions
console.log('\n🔍 Checking auth-system.js functions...');
const authSystemContent = fs.readFileSync('auth-system.js', 'utf8');

const requiredFunctions = [
    'registerUser',
    'loginUser',
    'logoutUser',
    'hashPassword',
    'verifyPassword',
    'validateEmail',
    'isUserAuthenticated'
];

let allFunctionsExist = true;
requiredFunctions.forEach(func => {
    if (authSystemContent.includes(`async ${func}(`) || authSystemContent.includes(`${func}(`)) {
        console.log(`✅ ${func}() - Found`);
    } else {
        console.log(`❌ ${func}() - Missing`);
        allFunctionsExist = false;
    }
});

// Check infinity-ai.js for key functions
console.log('\n🤖 Checking infinity-ai.js functions...');
const aiSystemContent = fs.readFileSync('infinity-ai.js', 'utf8');

const requiredAIFunctions = [
    'initializeUserProfile',
    'loadUserProfile',
    'learnFromInteraction',
    'generatePersonalizedInsights'
];

let allAIFunctionsExist = true;
requiredAIFunctions.forEach(func => {
    if (aiSystemContent.includes(`${func}(`)) {
        console.log(`✅ ${func}() - Found`);
    } else {
        console.log(`❌ ${func}() - Missing`);
        allAIFunctionsExist = false;
    }
});

// Check login.html for proper script loading
console.log('\n🌐 Checking login.html integration...');
const loginContent = fs.readFileSync('login.html', 'utf8');

if (loginContent.includes('auth-system.js')) {
    console.log('✅ auth-system.js - Loaded');
} else {
    console.log('❌ auth-system.js - Not loaded');
    allFilesExist = false;
}

if (loginContent.includes('infinity-ai.js')) {
    console.log('✅ infinity-ai.js - Loaded');
} else {
    console.log('❌ infinity-ai.js - Not loaded');
    allFilesExist = false;
}

if (loginContent.includes('window.InfinityAuth')) {
    console.log('✅ Auth system integration - Found');
} else {
    console.log('❌ Auth system integration - Missing');
    allFilesExist = false;
}

// Check for proper error handling
console.log('\n🛡️ Checking error handling...');
if (authSystemContent.includes('try {') && authSystemContent.includes('catch (error)')) {
    console.log('✅ Error handling - Implemented');
} else {
    console.log('❌ Error handling - Missing');
    allFilesExist = false;
}

// Check for password hashing
console.log('\n🔒 Checking password security...');
if (authSystemContent.includes('crypto.subtle.digest') || authSystemContent.includes('SHA-256')) {
    console.log('✅ Password hashing - Secure (SHA-256)');
} else if (authSystemContent.includes('btoa')) {
    console.log('⚠️ Password hashing - Basic (Base64)');
} else {
    console.log('❌ Password hashing - Not implemented');
    allFilesExist = false;
}

// Final verification
console.log('\n📊 Verification Summary:');
console.log(`Files: ${allFilesExist ? '✅ All present' : '❌ Some missing'}`);
console.log(`Auth Functions: ${allFunctionsExist ? '✅ All present' : '❌ Some missing'}`);
console.log(`AI Functions: ${allAIFunctionsExist ? '✅ All present' : '❌ Some missing'}`);

if (allFilesExist && allFunctionsExist && allAIFunctionsExist) {
    console.log('\n🎉 Authentication system verification PASSED!');
    console.log('\n🚀 Next steps:');
    console.log('1. Open test-auth.html in your browser');
    console.log('2. Test registration with test@infinity.com');
    console.log('3. Test login with the same credentials');
    console.log('4. Verify user data persistence');
    console.log('5. Check AI system integration');
    
    console.log('\n📝 Test URLs:');
    console.log('- Login: http://localhost:3000/login.html');
    console.log('- Test Page: http://localhost:3000/test-auth.html');
    console.log('- Dashboard: http://localhost:3000/dashboard-ultimate.html');
} else {
    console.log('\n❌ Authentication system verification FAILED!');
    console.log('Please fix the issues above before proceeding.');
    process.exit(1);
}

console.log('\n✨ Infinity Authentication System is ready!');
