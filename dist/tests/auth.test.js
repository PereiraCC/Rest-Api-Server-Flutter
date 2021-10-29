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
mocha.describe('Login', () => {
    let data = {
        "email": "carlos@test.com",
        "password": "123456"
    };
    mocha.it('Login successed', done => {
        (0, supertest_1.default)(API)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('without email', done => {
        let newData = {
            "password": "123456"
        };
        (0, supertest_1.default)(API)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .send(newData)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "msg": "The email is required",
                    "param": "email",
                    "location": "body"
                }
            ]
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('without password', done => {
        let newData = {
            "email": "carlos@test.com"
        };
        (0, supertest_1.default)(API)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .send(newData)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "msg": "The password is required",
                    "param": "password",
                    "location": "body"
                },
                {
                    "msg": "Cannot read property 'length' of undefined",
                    "param": "password",
                    "location": "body"
                }
            ]
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('lenght password', done => {
        let newData = {
            "email": "carlos@test.com",
            "password": "123"
        };
        (0, supertest_1.default)(API)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .send(newData)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "value": "123",
                    "msg": "Error: Password must be longer than 6 characters",
                    "param": "password",
                    "location": "body"
                }
            ]
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
});
mocha.describe('Validation JWT', () => {
    mocha.it('valid JWT', done => {
        let data = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1NDQ0NzQsImV4cCI6MTYzNTU1ODg3NH0.4mqs3OyiceE9bSsDCRBuf3kNCrJc9bYax_WOvycuDv0'
        };
        (0, supertest_1.default)(API)
            .post('/api/auth/validJWT')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect({
            "ok": true
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('invalid JWT', done => {
        let data = {
            token: 'bad'
        };
        (0, supertest_1.default)(API)
            .post('/api/auth/validJWT')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
            "msg": "Invalid token"
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
});
//# sourceMappingURL=auth.test.js.map