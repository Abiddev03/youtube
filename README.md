# YouTube iOS Automation Tests

This project includes automated tests for the YouTube iOS application, utilizing WebdriverIO, Appium, Page Object Model, and Cucumber.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- Appium Server
- Xcode (for iOS testing)
- iOS device or simulator

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd youtube-bdd-ios
```

2. Install dependencies:

```bash
npm install
```

The project uses the following key dependencies:

- webdriverio
- @wdio/cucumber-framework
- @wdio/local-runner
- appium-webdriver
- appium-xcuitest-driver

## Configuration

The project uses Appium capabilities defined in `appium.config.ts`. Ensure you have:

- A valid iOS device connected or simulator running
- Correct bundle ID (com.google.ios.youtube)
- Proper signing credentials (xcodeOrgId and xcodeSigningId)

## Running Tests

To run the tests:

1. Start Appium server:

```bash
appium
```

2. Run tests with Allure reporting:

```bash
# Run tests
npx wdio wdio.conf.ts

# Generate Allure report
npm run allure:generate

# Open Allure report in browser
npm run allure:open

# Run tests and open report in one command
npm run allure:report

# Clean up Allure reports
npm run allure:clean
```

## Test Features

The project includes BDD-style tests written in Cucumber:

- Search functionality
- Video filtering
- Duration-based filtering

## Project Structure

```
youtube-bdd-ios/
├── features/           # Cucumber feature files
├── src/
│   ├── screens/        # Page object model classes
│   └── steps/         # Step definitions
├── appium.config.ts   # Appium configuration
└── package.json       # Project dependencies
```

## Testing iOS App

The tests are configured to run against the YouTube iOS app using the following capabilities:

- Platform: iOS 18.5
- Device: iPhone (physical device)
- Automation: XCUITest
- Bundle ID: com.google.ios.youtube

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

## Contact

For questions or issues, please contact the project maintainer abiddev03@gmail.com
