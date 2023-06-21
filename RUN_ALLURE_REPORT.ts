const {executeCommand} = require('./Utils/TestAndReport.ts')

executeCommand("npm run allure-report")
executeCommand("npx playwright show-trace")
