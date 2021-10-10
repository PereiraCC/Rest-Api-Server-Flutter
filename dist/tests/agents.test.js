"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha = __importStar(require("mocha"));
const supertest_1 = __importDefault(require("supertest"));
const API = 'http://localhost:8082';
mocha.describe('GET /api/agents', () => {
    mocha.it('respond with json containing a list of all users', done => {
        (0, supertest_1.default)(API)
            .get('/api/agents')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});
mocha.describe('GET:id /api/agents/:id', () => {
    // TODO: No valid token, No token, identification is not numeric, 
    mocha.it('respond with json containing a single agent', done => {
        (0, supertest_1.default)(API)
            .get('/api/agents/004')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4Mzc4MzIsImV4cCI6MTYzMzg1MjIzMn0.JduoFYLmgbwDQccBzKGfxrjDXNyVmXGzwHvghdsllWs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
    mocha.it('respond with json "msg: Agent with that ID not found in the database." when user does not exists', done => {
        (0, supertest_1.default)(API)
            .get('/api/agents/058')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4Mzc4MzIsImV4cCI6MTYzMzg1MjIzMn0.JduoFYLmgbwDQccBzKGfxrjDXNyVmXGzwHvghdsllWs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .expect({
            msg: 'Agent with that ID not found in the database.'
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
});
mocha.describe('POST /api/agents', () => {
    // TODO: No token, Invalid token, validation each field
    const data = {
        identification: "000",
        name: "testing",
        lastname: "testing",
        email: "test0@test.com",
        phone: "88886666"
    };
    mocha.it('respond with json containing new agent data', done => {
        (0, supertest_1.default)(API)
            .post('/api/agents')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4Mzc4MzIsImV4cCI6MTYzMzg1MjIzMn0.JduoFYLmgbwDQccBzKGfxrjDXNyVmXGzwHvghdsllWs')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
});
//# sourceMappingURL=agents.test.js.map