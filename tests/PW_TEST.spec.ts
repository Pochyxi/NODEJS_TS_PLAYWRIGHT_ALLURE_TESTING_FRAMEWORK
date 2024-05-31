import {test} from '@playwright/test';

const {ActionExecutor} = require('../Utils/ActionExecutor.ts')
const {
    nomeProgetto,
    altezzaFinestraInPixels,
    larghezzaFinestraInPixels,
    attesaPrimaDelFallimentoInSecondi
} = require('../CONFIG.ts')

const testExecutor = new ActionExecutor(
    test, `./test-suites/${nomeProgetto}.json`,
    larghezzaFinestraInPixels,
    altezzaFinestraInPixels,
    attesaPrimaDelFallimentoInSecondi
)

testExecutor.runTests()







