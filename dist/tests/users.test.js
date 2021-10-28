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
mocha.describe('GET /api/users', () => {
    mocha.it('respond with json containing a list of all users', done => {
        (0, supertest_1.default)(API)
            .get('/api/users?limit=10&from=1')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});
mocha.describe('GET:id /api/users/:id', () => {
    // all good
    mocha.it('respond with json containing a single user', done => {
        (0, supertest_1.default)(API)
            .get('/api/users/448')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzUzOTM4MTQsImV4cCI6MTYzNTQwODIxNH0.El4nGpNa4RiR2uVOnHEEdp8oY3P_SbJWRWvNtvZ7fZk')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
    // User not found 
    mocha.it('respond with json "msg: User with that ID not found in the database." when user does not exists', done => {
        (0, supertest_1.default)(API)
            .get('/api/users/058')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzUzOTM4MTQsImV4cCI6MTYzNTQwODIxNH0.El4nGpNa4RiR2uVOnHEEdp8oY3P_SbJWRWvNtvZ7fZk')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .expect({
            msg: 'User with that ID not found in the database.'
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {
        (0, supertest_1.default)(API)
            .get('/api/users/448')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
            msg: 'No token'
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // No valid token
    mocha.it('reply with json "msg: Invalid token" when there is Invalid token', done => {
        (0, supertest_1.default)(API)
            .get('/api/users/448')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzUzOTM4MTQsImV4cCI6MTYzNTQwODIxNH0.El4nGpNa4RiR2uVOnHEEdp8oY3P_SbJWRWvNtvZ7fZk123')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
            msg: 'Invalid token'
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // identification is not numeric
    mocha.it('reply with json "msg: The identification parameter must be numeric." when id param is not numeric', done => {
        (0, supertest_1.default)(API)
            .get('/api/users/05ff')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzUzOTM4MTQsImV4cCI6MTYzNTQwODIxNH0.El4nGpNa4RiR2uVOnHEEdp8oY3P_SbJWRWvNtvZ7fZk')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "value": "05ff",
                    "msg": "The identification parameter must be numeric.",
                    "param": "id",
                    "location": "params"
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
mocha.describe('POST /api/users', () => {
    let data = {
        "identification": "005",
        "name": "Test",
        "email": "test@test.com",
        "password": "123456"
    };
    // Create new Agent
    mocha.it('respond with json containing new user data', done => {
        (0, supertest_1.default)(API)
            .post('/api/users')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzUzOTM4MTQsImV4cCI6MTYzNTQwODIxNH0.El4nGpNa4RiR2uVOnHEEdp8oY3P_SbJWRWvNtvZ7fZk')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {
        (0, supertest_1.default)(API)
            .post('/api/agents')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .send(data)
            .expect(401)
            .expect({
            msg: 'No token'
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // No valid token
    mocha.it('reply with json "msg: Invalid token" when there is Invalid token', done => {
        (0, supertest_1.default)(API)
            .post('/api/agents')
            .set('Accept', 'application/json')
            .set('x-token', 'bad000eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4Mzc4MzIsImV4cCI6MTYzMzg1MjIzMn0.JduoFYLmgbwDQccBzKGfxrjDXNyVmXGzwHvghdsllWs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .send(data)
            .expect(401)
            .expect({
            msg: 'Invalid token'
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // TODO: VALIDATION FOR EACH FIELD
});
//# sourceMappingURL=users.test.js.map