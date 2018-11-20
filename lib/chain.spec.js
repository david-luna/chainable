"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("./chain");
describe('chain', function () {
    beforeEach(function () {
    });
    afterEach(function () {
    });
    describe('DOM Elements', function () {
        it('should work with standar HTMLElement methods', function (done) {
            // Prepare
            var elem = document.createElement('div');
            var data = {
                id: 'elem-id',
                name: 'elem-name',
                style: 'background: red'
            };
            // Execute
            var result = chain_1.chain(elem);
            for (var a in data) {
                result = result.setAttribute(a, data[a]);
            }
            // Expect
            for (var a in data) {
                expect(elem.getAttribute(a)).toBe(data[a]);
            }
            done();
        });
        it('should work with HTMLElement properties', function (done) {
            // Prepare
            var elem = document.createElement('div');
            var data = {
                id: 'elem-id',
                dir: 'rtl',
                accessKey: 'e',
                className: 'elem-class',
                innerHTML: '<p>hello</p>',
            };
            // Execute
            var result = chain_1.chain(elem);
            for (var a in data) {
                result = result[a](data[a]);
            }
            // Expect
            for (var a in data) {
                expect(elem[a]).toBe(data[a]);
            }
            done();
        });
    });
    describe('Storage APIs', function () {
        it('should work with localStorage', function (done) {
            // Prepare
            var data = {
                localkey1: 'value1',
                localkey2: 'value2',
                localkey3: 'value3',
                localkey4: 'value4',
            };
            // Execute
            var result = chain_1.chain(localStorage);
            for (var a in data) {
                result = result.setItem(a, data[a]);
            }
            // Expect
            for (var a in data) {
                expect(localStorage.getItem(a)).toBe(data[a]);
            }
            done();
        });
        it('should work with sessionStorage', function (done) {
            // Prepare
            var data = {
                sessionkey1: 'value1',
                sessionkey2: 'value2',
                sessionkey3: 'value3',
                sessionkey4: 'value4',
            };
            // Execute
            var result = chain_1.chain(sessionStorage);
            for (var a in data) {
                result = result.setItem(a, data[a]);
            }
            // Expect
            for (var a in data) {
                expect(sessionStorage.getItem(a)).toBe(data[a]);
            }
            done();
        });
    });
});
//# sourceMappingURL=chain.spec.js.map