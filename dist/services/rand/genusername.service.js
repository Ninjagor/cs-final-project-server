"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsername = void 0;
const unique_names_generator_1 = require("unique-names-generator");
function generateUsername() {
    const customConfig = {
        dictionaries: [unique_names_generator_1.adjectives, unique_names_generator_1.animals],
        separator: '-',
        length: 2,
    };
    return (0, unique_names_generator_1.uniqueNamesGenerator)(customConfig);
}
exports.generateUsername = generateUsername;
//# sourceMappingURL=genusername.service.js.map