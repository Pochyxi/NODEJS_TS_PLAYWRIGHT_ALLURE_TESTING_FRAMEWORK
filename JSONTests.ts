const {JSONScribe} = require("./Utils/JSONScribe.ts")

const enosisOBJ = new JSONScribe("test-suites/ENOSIS.json");

console.log(enosisOBJ.getProjectName())
console.log(enosisOBJ.getProjectVersion())
console.log(enosisOBJ.getAllCapTests("login"))



