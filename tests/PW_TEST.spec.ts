import {test} from '@playwright/test';
const {ActionExecutor} = require('../Utils/ActionExecutor.ts')


const testExecutor = new ActionExecutor(test, "./test-suites/PochyxiGitHub.json")
testExecutor.runTests()







