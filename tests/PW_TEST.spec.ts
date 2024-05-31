import {test} from '@playwright/test';
const {ActionExecutor} = require('../Utils/ActionExecutor.ts')
const {nomeProgetto} = require('../CONFIG.ts')

const testExecutor = new ActionExecutor(test, `./test-suites/${nomeProgetto}.json`)
testExecutor.runTests()







