import {test} from '@playwright/test';
const {ActionExecutor} = require('../Utils/ActionExecutor.ts')


const testExecutor = new ActionExecutor(test, "./test-suites/ENOSIS.json")
testExecutor.runTests()







