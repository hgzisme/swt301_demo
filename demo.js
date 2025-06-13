#!/usr/bin/env node

/**
 * Amazon AI Testing Demo Script
 * This script helps you run different AI testing scenarios for Amazon
 */

const { exec } = require('child_process');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m'
};

function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

function showBanner() {
    console.log(colorize('\n🤖 Amazon AI Testing Suite', 'cyan'));
    console.log(colorize('═'.repeat(50), 'blue'));
    console.log('Welcome to the AI-powered Amazon testing environment!\n');
}

function showMenu() {
    console.log(colorize('Available Test Scenarios:', 'bright'));
    console.log('');
    console.log(colorize('1.', 'yellow'), 'AI-Powered Search Tests');
    console.log(colorize('2.', 'yellow'), 'Smart Cart Management Tests');
    console.log(colorize('3.', 'yellow'), 'Comprehensive AI Testing');
    console.log(colorize('4.', 'yellow'), 'Performance & Compatibility Tests');
    console.log(colorize('5.', 'yellow'), 'All Amazon Tests (Sequential)');
    console.log(colorize('6.', 'yellow'), 'Quick Demo (Headless)');
    console.log(colorize('7.', 'yellow'), 'Configuration Check');
    console.log(colorize('8.', 'yellow'), 'Exit');
    console.log('');
}

function runCommand(command, description) {
    return new Promise((resolve, reject) => {
        console.log(colorize(`\n🚀 ${description}`, 'green'));
        console.log(colorize(`Command: ${command}`, 'blue'));
        console.log(colorize('─'.repeat(50), 'blue'));

        const process = exec(command, { cwd: __dirname });

        process.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        process.stderr.on('data', (data) => {
            console.error(colorize(data.toString(), 'red'));
        });

        process.on('close', (code) => {
            if (code === 0) {
                console.log(colorize(`\n✅ ${description} completed successfully!`, 'green'));
                resolve();
            } else {
                console.log(colorize(`\n❌ ${description} failed with exit code ${code}`, 'red'));
                reject(new Error(`Process exited with code ${code}`));
            }
        });
    });
}

async function checkConfiguration() {
    console.log(colorize('\n🔍 Checking Configuration...', 'cyan'));

    try {
        // Check if .env file exists
        const fs = require('fs');
        if (fs.existsSync('.env')) {
            console.log(colorize('✅ .env file found', 'green'));

            const envContent = fs.readFileSync('.env', 'utf8');
            if (envContent.includes('GEMINI_API_KEY=your_gemini_api_key_here')) {
                console.log(colorize('⚠️  Please update your GEMINI_API_KEY in .env file', 'yellow'));
            } else if (envContent.includes('GEMINI_API_KEY=')) {
                console.log(colorize('✅ GEMINI_API_KEY is configured', 'green'));
            } else {
                console.log(colorize('❌ GEMINI_API_KEY not found in .env', 'red'));
            }
        } else {
            console.log(colorize('⚠️  .env file not found. Copy .env.example to .env', 'yellow'));
        }

        // Check dependencies
        if (fs.existsSync('node_modules')) {
            console.log(colorize('✅ Dependencies installed', 'green'));
        } else {
            console.log(colorize('❌ Dependencies not installed. Run: npm install', 'red'));
        }

        console.log(colorize('\n📖 Setup Instructions:', 'bright'));
        console.log('1. Copy .env.example to .env');
        console.log('2. Get API key from: https://aistudio.google.com/app/apikey');
        console.log('3. Update GEMINI_API_KEY in .env file');
        console.log('4. Run: npm install');

    } catch (error) {
        console.error(colorize(`Error checking configuration: ${error.message}`, 'red'));
    }
}

async function handleUserChoice(choice) {
    try {
        switch (choice) {
            case '1':
                await runCommand(
                    'npx codeceptjs run tests/amazon_search_test.js --steps',
                    'AI-Powered Search Tests'
                );
                break;

            case '2':
                await runCommand(
                    'npx codeceptjs run tests/amazon_cart_test.js --steps',
                    'Smart Cart Management Tests'
                );
                break;

            case '3':
                await runCommand(
                    'npx codeceptjs run ai_amazon_comprehensive_test.js --steps',
                    'Comprehensive AI Testing'
                );
                break;

            case '4':
                await runCommand(
                    'npx codeceptjs run ai_amazon_comprehensive_test.js --steps --grep "performance|compatibility"',
                    'Performance & Compatibility Tests'
                );
                break;

            case '5':
                console.log(colorize('\n🚀 Running All Amazon Tests Sequentially...', 'cyan'));
                await runCommand(
                    'npx codeceptjs run tests/amazon_search_test.js --steps',
                    'Search Tests'
                );
                await runCommand(
                    'npx codeceptjs run tests/amazon_cart_test.js --steps',
                    'Cart Tests'
                );
                await runCommand(
                    'npx codeceptjs run ai_amazon_comprehensive_test.js --steps',
                    'Comprehensive Tests'
                );
                break;

            case '6':
                await runCommand(
                    'set HEADLESS=true && npx codeceptjs run tests/amazon_search_test.js --steps --grep "AI-powered search for electronics"',
                    'Quick Demo (Headless)'
                );
                break;

            case '7':
                await checkConfiguration();
                break;

            case '8':
                console.log(colorize('\n👋 Thanks for using Amazon AI Testing Suite!', 'cyan'));
                process.exit(0);
                break;

            default:
                console.log(colorize('❌ Invalid choice. Please select 1-8.', 'red'));
        }
    } catch (error) {
        console.error(colorize(`\n❌ Error: ${error.message}`, 'red'));
        console.log(colorize('\n💡 Troubleshooting Tips:', 'yellow'));
        console.log('- Ensure your API key is correctly configured');
        console.log('- Check your internet connection');
        console.log('- Verify Amazon.com is accessible');
        console.log('- Try running: npm install');
    }
}

async function main() {
    showBanner();

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function promptUser() {
        showMenu();
        rl.question(colorize('Select an option (1-8): ', 'bright'), async (answer) => {
            await handleUserChoice(answer.trim());

            if (answer.trim() !== '8') {
                console.log(colorize('\n' + '═'.repeat(50), 'blue'));
                promptUser();
            } else {
                rl.close();
            }
        });
    }

    promptUser();
}

// Handle CTRL+C gracefully
process.on('SIGINT', () => {
    console.log(colorize('\n\n👋 Testing interrupted. Goodbye!', 'yellow'));
    process.exit(0);
});

// Start the demo
main().catch(error => {
    console.error(colorize(`Fatal error: ${error.message}`, 'red'));
    process.exit(1);
});
