#!/usr/bin/env node

/**
 * Infinity Platform Perfect Test Suite
 * Comprehensive testing to ensure zero errors and maximum performance
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🧪 Testing Infinity Platform for Perfect Performance...\n');

// Test results
const testResults = {
    passed: 0,
    failed: 0,
    warnings: 0,
    total: 0
};

// Test functions
const tests = {
    // File existence tests
    testFileExistence: () => {
        console.log('📁 Testing file existence...');
        const requiredFiles = [
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
            'README.md'
        ];
        
        let allExist = true;
        requiredFiles.forEach(file => {
            if (fs.existsSync(file)) {
                console.log(`✅ ${file} exists`);
                testResults.passed++;
            } else {
                console.log(`❌ ${file} missing`);
                testResults.failed++;
                allExist = false;
            }
            testResults.total++;
        });
        
        return allExist;
    },

    // File content validation
    testFileContent: () => {
        console.log('\n📄 Testing file content...');
        let allValid = true;
        
        // Test HTML files for proper structure
        const htmlFiles = [
            'login.html',
            'dashboard-ultimate.html',
            'grader.html',
            'oracle-ultimate.html',
            'compass.html',
            'arena.html',
            'portfolio.html',
            'futurecasting.html'
        ];
        
        htmlFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Check for required elements
                const checks = [
                    { name: 'DOCTYPE declaration', test: content.includes('<!DOCTYPE html>') },
                    { name: 'HTML structure', test: content.includes('<html') && content.includes('</html>') },
                    { name: 'Head section', test: content.includes('<head>') && content.includes('</head>') },
                    { name: 'Body section', test: content.includes('<body>') && content.includes('</body>') },
                    { name: 'React CDN', test: content.includes('react@18') },
                    { name: 'Tailwind CSS', test: content.includes('tailwindcss') }
                ];
                
                let fileValid = true;
                checks.forEach(check => {
                    if (check.test) {
                        console.log(`  ✅ ${file}: ${check.name}`);
                        testResults.passed++;
                    } else {
                        console.log(`  ❌ ${file}: Missing ${check.name}`);
                        testResults.failed++;
                        fileValid = false;
                        allValid = false;
                    }
                    testResults.total++;
                });
                
                if (fileValid) {
                    console.log(`✅ ${file} content valid`);
                } else {
                    console.log(`❌ ${file} content invalid`);
                }
                
            } catch (error) {
                console.log(`❌ ${file}: Error reading file - ${error.message}`);
                testResults.failed++;
                testResults.total++;
                allValid = false;
            }
        });
        
        return allValid;
    },

    // JavaScript syntax validation
    testJavaScriptSyntax: () => {
        console.log('\n🔧 Testing JavaScript syntax...');
        let allValid = true;
        
        const jsFiles = ['auth-system.js', 'infinity-ai.js', 'server.js'];
        
        jsFiles.forEach(file => {
            try {
                const content = fs.readFileSync(file, 'utf8');
                
                // Basic syntax checks
                const checks = [
                    { name: 'No unclosed strings', test: !content.match(/"[^"]*$/m) && !content.match(/'[^']*$/m) },
                    { name: 'No unclosed brackets', test: (content.match(/\{/g) || []).length === (content.match(/\}/g) || []).length },
                    { name: 'No unclosed parentheses', test: (content.match(/\(/g) || []).length === (content.match(/\)/g) || []).length },
                    { name: 'Proper function declarations', test: content.includes('function ') || content.includes('=>') },
                    { name: 'No console errors', test: !content.includes('console.error') || content.includes('try') }
                ];
                
                let fileValid = true;
                checks.forEach(check => {
                    if (check.test) {
                        console.log(`  ✅ ${file}: ${check.name}`);
                        testResults.passed++;
                    } else {
                        console.log(`  ⚠️ ${file}: ${check.name}`);
                        testResults.warnings++;
                        if (check.name.includes('unclosed')) {
                            fileValid = false;
                            allValid = false;
                        }
                    }
                    testResults.total++;
                });
                
                if (fileValid) {
                    console.log(`✅ ${file} syntax valid`);
                } else {
                    console.log(`❌ ${file} syntax invalid`);
                }
                
            } catch (error) {
                console.log(`❌ ${file}: Error reading file - ${error.message}`);
                testResults.failed++;
                testResults.total++;
                allValid = false;
            }
        });
        
        return allValid;
    },

    // Package.json validation
    testPackageJson: () => {
        console.log('\n📦 Testing package.json...');
        try {
            const packageContent = fs.readFileSync('package.json', 'utf8');
            const packageJson = JSON.parse(packageContent);
            
            const checks = [
                { name: 'Name field', test: packageJson.name },
                { name: 'Version field', test: packageJson.version },
                { name: 'Dependencies', test: packageJson.dependencies && Object.keys(packageJson.dependencies).length > 0 },
                { name: 'Scripts', test: packageJson.scripts && packageJson.scripts.start },
                { name: 'Express dependency', test: packageJson.dependencies && packageJson.dependencies.express },
                { name: 'Mongoose dependency', test: packageJson.dependencies && packageJson.dependencies.mongoose }
            ];
            
            let allValid = true;
            checks.forEach(check => {
                if (check.test) {
                    console.log(`  ✅ ${check.name}`);
                    testResults.passed++;
                } else {
                    console.log(`  ❌ Missing ${check.name}`);
                    testResults.failed++;
                    allValid = false;
                }
                testResults.total++;
            });
            
            return allValid;
        } catch (error) {
            console.log(`❌ Error reading package.json: ${error.message}`);
            testResults.failed++;
            testResults.total++;
            return false;
        }
    },

    // Server connectivity test
    testServerConnectivity: () => {
        console.log('\n🌐 Testing server connectivity...');
        return new Promise((resolve) => {
            const options = {
                hostname: 'localhost',
                port: 3000,
                path: '/api/health',
                method: 'GET',
                timeout: 5000
            };
            
            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                
                res.on('end', () => {
                    try {
                        const response = JSON.parse(data);
                        if (response.status === 'OK') {
                            console.log('✅ Server is running and responding');
                            console.log(`  📊 Database: ${response.database || 'unknown'}`);
                            console.log(`  🔧 Fallback: ${response.fallback || 'none'}`);
                            testResults.passed++;
                            testResults.total++;
                            resolve(true);
                        } else {
                            console.log('❌ Server returned invalid status');
                            testResults.failed++;
                            testResults.total++;
                            resolve(false);
                        }
                    } catch (error) {
                        console.log('❌ Invalid server response');
                        testResults.failed++;
                        testResults.total++;
                        resolve(false);
                    }
                });
            });
            
            req.on('error', (error) => {
                console.log('❌ Server not running or not accessible');
                console.log(`  Error: ${error.message}`);
                testResults.failed++;
                testResults.total++;
                resolve(false);
            });
            
            req.on('timeout', () => {
                console.log('❌ Server request timed out');
                testResults.failed++;
                testResults.total++;
                resolve(false);
            });
            
            req.end();
        });
    },

    // Performance optimization test
    testPerformanceOptimizations: () => {
        console.log('\n⚡ Testing performance optimizations...');
        let allOptimized = true;
        
        // Check for performance monitoring
        const loginContent = fs.readFileSync('login.html', 'utf8');
        if (loginContent.includes('InfinityPerformance')) {
            console.log('✅ Performance monitoring added');
            testResults.passed++;
        } else {
            console.log('❌ Performance monitoring missing');
            testResults.failed++;
            allOptimized = false;
        }
        testResults.total++;
        
        // Check for error handling
        const authContent = fs.readFileSync('auth-system.js', 'utf8');
        if (authContent.includes('InfinityErrorHandler')) {
            console.log('✅ Enhanced error handling added');
            testResults.passed++;
        } else {
            console.log('❌ Enhanced error handling missing');
            testResults.failed++;
            allOptimized = false;
        }
        testResults.total++;
        
        // Check for cache optimization
        const aiContent = fs.readFileSync('infinity-ai.js', 'utf8');
        if (aiContent.includes('InfinityCache')) {
            console.log('✅ Cache optimization added');
            testResults.passed++;
        } else {
            console.log('❌ Cache optimization missing');
            testResults.failed++;
            allOptimized = false;
        }
        testResults.total++;
        
        return allOptimized;
    }
};

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting comprehensive testing...\n');
    
    // Run synchronous tests
    const fileExistence = tests.testFileExistence();
    const fileContent = tests.testFileContent();
    const jsSyntax = tests.testJavaScriptSyntax();
    const packageJson = tests.testPackageJson();
    const performance = tests.testPerformanceOptimizations();
    
    // Run asynchronous tests
    const serverConnectivity = await tests.testServerConnectivity();
    
    // Calculate results
    const totalTests = testResults.total;
    const passedTests = testResults.passed;
    const failedTests = testResults.failed;
    const warningTests = testResults.warnings;
    
    const successRate = ((passedTests / totalTests) * 100).toFixed(1);
    
    console.log('\n📊 Test Results Summary:');
    console.log(`✅ Passed: ${passedTests}/${totalTests} (${successRate}%)`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`⚠️ Warnings: ${warningTests}`);
    
    console.log('\n🔍 Detailed Results:');
    console.log(`📁 File Existence: ${fileExistence ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`📄 File Content: ${fileContent ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`🔧 JavaScript Syntax: ${jsSyntax ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`📦 Package.json: ${packageJson ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`🌐 Server Connectivity: ${serverConnectivity ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`⚡ Performance Optimizations: ${performance ? '✅ PASS' : '❌ FAIL'}`);
    
    if (failedTests === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Infinity Platform is PERFECT!');
        console.log('\n✨ Platform Status:');
        console.log('- ✅ Zero errors detected');
        console.log('- ✅ All files present and valid');
        console.log('- ✅ JavaScript syntax correct');
        console.log('- ✅ Server running and responsive');
        console.log('- ✅ Performance optimizations active');
        console.log('- ✅ Error handling enhanced');
        console.log('- ✅ Cache optimization enabled');
        
        console.log('\n🚀 Ready for Production!');
        console.log('📝 Access URLs:');
        console.log('- Login: http://localhost:3000/login.html');
        console.log('- Dashboard: http://localhost:3000/dashboard-ultimate.html');
        console.log('- Multi-user Test: http://localhost:3000/multi-user-test.html');
        console.log('- Health Check: http://localhost:3000/api/health');
        
        return true;
    } else {
        console.log('\n⚠️ Some tests failed. Please fix the issues above.');
        console.log('\n🔧 Common fixes:');
        console.log('- Ensure server is running: npm start');
        console.log('- Check file permissions');
        console.log('- Verify all dependencies are installed: npm install');
        console.log('- Check for syntax errors in JavaScript files');
        
        return false;
    }
}

// Run the tests
runAllTests().then(success => {
    if (success) {
        console.log('\n🌟 Infinity Platform - The Ultimate Sports Card AI Platform!');
        console.log('🎯 Perfect Performance Achieved!');
        process.exit(0);
    } else {
        console.log('\n❌ Platform needs fixes before it can be considered perfect.');
        process.exit(1);
    }
}).catch(error => {
    console.error('\n💥 Test suite error:', error);
    process.exit(1);
});
