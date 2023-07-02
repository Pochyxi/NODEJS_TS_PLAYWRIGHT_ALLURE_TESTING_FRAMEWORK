import {test} from '@playwright/test';
const {ActionExecutor} = require('../Utils/ActionExecutor.ts')


const testExecutor = new ActionExecutor(test, "./test-suites/ENOSIS_V_0_1_0.json")
testExecutor.runTests()







