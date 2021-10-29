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
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
    // User not found 
    mocha.it('respond with json "msg: User with that ID not found in the database." when user does not exists', done => {
        (0, supertest_1.default)(API)
            .get('/api/users/058')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
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
            .set('x-token', 'bad')
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
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
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
    // Create new Users
    mocha.it('respond with json containing new user data', done => {
        (0, supertest_1.default)(API)
            .post('/api/users')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.describe('Validation of identification field', () => {
        mocha.it('without identification', done => {
            let data = {
                "name": "Test",
                "email": "test@test.com",
                "password": "123456"
            };
            (0, supertest_1.default)(API)
                .post('/api/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The identification field is required.",
                        "param": "identification",
                        "location": "body"
                    },
                    {
                        "msg": "The identification field must be numeric",
                        "param": "identification",
                        "location": "body"
                    },
                    {
                        "msg": "Function Query.where() called with invalid data. Unsupported field value: undefined",
                        "param": "identification",
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
        mocha.it('identification is not numeric', done => {
            let data = {
                "identification": "car",
                "name": "Test",
                "email": "test@test.com",
                "password": "123456"
            };
            (0, supertest_1.default)(API)
                .post('/api/users')
                .set('Accept', 'application/json')
                .send(data)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "car",
                        "msg": "The identification field must be numeric",
                        "param": "identification",
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
        mocha.it('identification exists', done => {
            let data = {
                "identification": "102",
                "name": "Test",
                "email": "test@test.com",
                "password": "123456"
            };
            (0, supertest_1.default)(API)
                .post('/api/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "102",
                        "msg": "Error: The identification is already in the database",
                        "param": "identification",
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
    mocha.describe('Validation of name field', () => {
        mocha.it('without name', done => {
            let data = {
                "identification": "048",
                "email": "test@test.com",
                "password": "123456"
            };
            (0, supertest_1.default)(API)
                .post('/api/users')
                .set('Accept', 'application/json')
                .send(data)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The name field is required.",
                        "param": "name",
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
    mocha.describe('Validation of email field', () => {
        mocha.it('without email', done => {
            let data = {
                "identification": "048",
                "name": "test",
                "password": "123456"
            };
            (0, supertest_1.default)(API)
                .post('/api/users')
                .set('Accept', 'application/json')
                .send(data)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The email field is required.",
                        "param": "email",
                        "location": "body"
                    },
                    {
                        "msg": "The email field is invalid.",
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
        mocha.it('Invalid email', done => {
            let data = {
                "identification": "048",
                "name": "test",
                "email": "testcom",
                "password": "123456"
            };
            (0, supertest_1.default)(API)
                .post('/api/users')
                .set('Accept', 'application/json')
                .send(data)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "testcom",
                        "msg": "The email field is invalid.",
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
    });
    mocha.describe('Validation of password field', () => {
        mocha.it('without password', done => {
            let data = {
                "identification": "048",
                "name": "test",
                "email": "test@test.com"
            };
            (0, supertest_1.default)(API)
                .post('/api/users')
                .set('Accept', 'application/json')
                .send(data)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The password field is required.",
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
            let data = {
                "identification": "048",
                "name": "test",
                "email": "test@test.com",
                "password": "123"
            };
            (0, supertest_1.default)(API)
                .post('/api/users')
                .set('Accept', 'application/json')
                .send(data)
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
});
mocha.describe('PUT /api/users', () => {
    let data = {
        "name": "test5"
    };
    mocha.it('update user', done => {
        (0, supertest_1.default)(API)
            .put('/api/users/005')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('No token', done => {
        (0, supertest_1.default)(API)
            .put('/api/users/005')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
            "msg": "No token"
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('Invalid token', done => {
        (0, supertest_1.default)(API)
            .put('/api/users/005')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
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
    mocha.it('identification is not numeric', done => {
        (0, supertest_1.default)(API)
            .put('/api/users/005f')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "value": "005f",
                    "msg": "The identification parameter must be numeric.",
                    "param": "id",
                    "location": "params"
                },
                {
                    "value": "005f",
                    "msg": "Error: The identification is not already in the database",
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
    mocha.it('identification not found', done => {
        (0, supertest_1.default)(API)
            .put('/api/users/088')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "value": "088",
                    "msg": "Error: The identification is not already in the database",
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
mocha.describe('DELETE /api/users', () => {
    mocha.it('delete user', done => {
        (0, supertest_1.default)(API)
            .delete('/api/users/005')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('No token', done => {
        (0, supertest_1.default)(API)
            .delete('/api/users/005')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
            "msg": "No token"
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    mocha.it('Invalid token', done => {
        (0, supertest_1.default)(API)
            .delete('/api/users/005')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
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
    mocha.it('identification is not numeric', done => {
        (0, supertest_1.default)(API)
            .delete('/api/users/005f')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "value": "005f",
                    "msg": "The identification parameter must be numeric.",
                    "param": "id",
                    "location": "params"
                },
                {
                    "value": "005f",
                    "msg": "Error: The identification is not already in the database",
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
    mocha.it('identification not found', done => {
        (0, supertest_1.default)(API)
            .delete('/api/users/088')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(400)
            .expect({
            "errors": [
                {
                    "value": "088",
                    "msg": "Error: The identification is not already in the database",
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
//# sourceMappingURL=users.test.js.map