# Facebook AI Testing Runner Script

Write-Host "🤖 Facebook AI Testing Suite" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check if required packages are installed
Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow

if (!(Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Check for .env file
if (!(Test-Path ".env")) {
    Write-Host "⚠️  .env file not found. Creating template..." -ForegroundColor Yellow
    $envContent = @"
GEMINI_API_KEY=your_api_key_here
HEADLESS=false
"@
    $envContent | Out-File -FilePath ".env" -Encoding utf8
    
    Write-Host "Please update .env file with your Gemini API key" -ForegroundColor Red
    exit 1
}

# Menu for test selection
Write-Host "`n🧪 Select test to run:" -ForegroundColor Green
Write-Host "1. Basic Facebook Tests"
Write-Host "2. Advanced Facebook Tests" 
Write-Host "3. AI Demo Tests"
Write-Host "4. All Facebook Tests"
Write-Host "5. Generate AI Test"
Write-Host "6. Run with Healing"
Write-Host "7. Generate HTML Report"

$choice = Read-Host "`nEnter your choice (1-7)"

switch ($choice) {
    "1" {
        Write-Host "🚀 Running Basic Facebook Tests..." -ForegroundColor Green
        npx codeceptjs run facebook_test.js --verbose
    }
    "2" {
        Write-Host "🚀 Running Advanced Facebook Tests..." -ForegroundColor Green
        npx codeceptjs run facebook_advanced_test.js --verbose
    }
    "3" {
        Write-Host "🚀 Running AI Demo Tests..." -ForegroundColor Green
        npx codeceptjs run facebook_ai_demo_test.js --verbose
    }
    "4" {
        Write-Host "🚀 Running All Facebook Tests..." -ForegroundColor Green
        npx codeceptjs run facebook*test.js --verbose
    }
    "5" {
        $prompt = Read-Host "Enter test description for AI generation"
        Write-Host "🤖 Generating AI test..." -ForegroundColor Green
        npx codeceptjs ai "$prompt"
    }
    "6" {
        Write-Host "🚀 Running Tests with Healing..." -ForegroundColor Green
        npx codeceptjs run facebook_test.js --heal --verbose
    }
    "7" {
        Write-Host "📊 Generating HTML Report..." -ForegroundColor Green
        if (!(Test-Path "reports")) {
            New-Item -ItemType Directory -Path "reports"
        }
        npx codeceptjs run facebook_test.js --reporter html --output ./reports
        Write-Host "Report generated in ./reports directory" -ForegroundColor Green
    }
    default {
        Write-Host "Invalid choice. Exiting..." -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n✅ Test execution completed!" -ForegroundColor Green
Write-Host "Check the output directory for screenshots and logs." -ForegroundColor Yellow
