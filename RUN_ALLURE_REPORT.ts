const {executeCommand} = require('./Utils/TestAndReport.ts')

executeCommand("npx allure open")
executeCommand("npx playwright show-trace")
