'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = globalTeardown;
const prisma_1 = require('../src/config/prisma');
async function globalTeardown() {
    await prisma_1.prisma.$disconnect();
    await prisma_1.pool.end();
}
//# sourceMappingURL=globalTeardown.js.map
