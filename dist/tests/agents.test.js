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
    // all good
    mocha.it('respond with json containing a single agent', done => {
        (0, supertest_1.default)(API)
            .get('/api/agents/004')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
    // Agent not found 
    mocha.it('respond with json "msg: Agent with that ID not found in the database." when user does not exists', done => {
        (0, supertest_1.default)(API)
            .get('/api/agents/058')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
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
    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {
        (0, supertest_1.default)(API)
            .get('/api/agents/004')
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
            .get('/api/agents/004')
            .set('Accept', 'application/json')
            .set('x-token', 'bad000eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4Mzc4MzIsImV4cCI6MTYzMzg1MjIzMn0.JduoFYLmgbwDQccBzKGfxrjDXNyVmXGzwHvghdsllWs')
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
            .get('/api/agents/05ff')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
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
mocha.describe('POST /api/agents', () => {
    let data = {
        identification: "000",
        name: "testing",
        lastname: "testing",
        email: "test0@test.com",
        phone: "88886666"
    };
    // Create new Agent
    mocha.it('respond with json containing new agent data', done => {
        (0, supertest_1.default)(API)
            .post('/api/agents')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
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
    mocha.describe('Error message of the identification field', () => {
        // Identification is null
        mocha.it('replay with json errors message of the identification field null', done => {
            const newData = {
                name: "testing",
                lastname: "testing",
                email: "test0@test.com",
                phone: "88886666"
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(newData)
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
        // Identification is not numeric
        mocha.it('replay with json errors message of the identification field is not numeric', done => {
            const newData = {
                identification: "001sd",
                name: "testing",
                lastname: "testing",
                email: "test0@test.com",
                phone: "88886666"
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .send(newData)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "001sd",
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
        // Identification is already in database
        mocha.it('replay with json errors message of the identification field when id is already in database', done => {
            const newData = {
                identification: "001",
                name: "testing",
                lastname: "testing",
                email: "test0@test.com",
                phone: "88886666"
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .send(newData)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "001",
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
    mocha.describe('Error message of the name and lastname fields', () => {
        // name is null
        mocha.it('replay with json errors message of the name field null', done => {
            const newData = {
                identification: "085",
                lastname: "testing",
                email: "test0@test.com",
                phone: "88886666"
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(newData)
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
        // lastname is null
        mocha.it('replay with json errors message of the lastname field is null', done => {
            const newData = {
                identification: "085",
                name: "testing",
                email: "test0@test.com",
                phone: "88886666"
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .send(newData)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The last name field is required.",
                        "param": "lastname",
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
    mocha.describe('Error message of the email field', () => {
        // email is null
        mocha.it('replay with json errors message of the email field null', done => {
            const newData = {
                identification: "085",
                name: "testing",
                lastname: "testing",
                phone: "88886666"
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(newData)
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
        // email is invalid
        mocha.it('replay with json errors message of the email field is invalid', done => {
            const newData = {
                identification: "085",
                name: "testing",
                lastname: "testing",
                email: "test0testcom",
                phone: "88886666"
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .send(newData)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "test0testcom",
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
    mocha.describe('Error message of the phone field', () => {
        // phone is null
        mocha.it('replay with json errors message of the phone field null', done => {
            const newData = {
                identification: "085",
                name: "testing",
                lastname: "testing",
                email: "test0@test.com",
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(newData)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The phone field is required.",
                        "param": "phone",
                        "location": "body"
                    },
                    {
                        "msg": "The phone field must be numeric",
                        "param": "phone",
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
        // phone is invalid
        mocha.it('replay with json errors message of the phone field is invalid', done => {
            const newData = {
                identification: "085",
                name: "testing",
                lastname: "testing",
                email: "test0@test.com",
                phone: "88886666dad"
            };
            (0, supertest_1.default)(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .send(newData)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "88886666dad",
                        "msg": "The phone field must be numeric",
                        "param": "phone",
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
mocha.describe('PUT /api/agents:id', () => {
    let data = {
        email: "test0@test.com",
    };
    // Update agent
    mocha.it('replay json with new data agent update', done => {
        (0, supertest_1.default)(API)
            .put('/api/agents/004')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {
        (0, supertest_1.default)(API)
            .put('/api/agents/004')
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
            .put('/api/agents/004')
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
    mocha.describe('Error message of the identification param', () => {
        // Identification is null
        mocha.it('replay with json errors message of the identification param null', done => {
            (0, supertest_1.default)(API)
                .put('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .expect('Content-Type', 'text/html; charset=utf-8')
                .send(data)
                .expect(404)
                .end(err => {
                if (err)
                    return done(err);
                done();
            });
        });
        // Identification is not numeric
        mocha.it('replay with json errors message of the identification param is not numeric', done => {
            (0, supertest_1.default)(API)
                .put('/api/agents/45sd')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "45sd",
                        "msg": "The identification parameter must be numeric.",
                        "param": "id",
                        "location": "params"
                    },
                    {
                        "value": "45sd",
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
        // Identification is already in database
        mocha.it('replay with json errors message of the identification field when id is already in database', done => {
            (0, supertest_1.default)(API)
                .put('/api/agents/088')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .send(data)
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
});
mocha.describe('DELETE /api/agents:id', () => {
    // delete agent
    mocha.it('replay json with new data agent delete', done => {
        (0, supertest_1.default)(API)
            .delete('/api/agents/007')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {
        (0, supertest_1.default)(API)
            .delete('/api/agents/007')
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
            .delete('/api/agents/007')
            .set('Accept', 'application/json')
            .set('x-token', 'bad000eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4Mzc4MzIsImV4cCI6MTYzMzg1MjIzMn0.JduoFYLmgbwDQccBzKGfxrjDXNyVmXGzwHvghdsllWs')
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
    mocha.describe('Error message of the identification param', () => {
        // Identification is null
        mocha.it('replay with json errors message of the identification param null', done => {
            (0, supertest_1.default)(API)
                .delete('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .expect('Content-Type', 'text/html; charset=utf-8')
                .expect(404)
                .end(err => {
                if (err)
                    return done(err);
                done();
            });
        });
        // Identification is not numeric
        mocha.it('replay with json errors message of the identification param is not numeric', done => {
            (0, supertest_1.default)(API)
                .delete('/api/agents/008jk')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "008jk",
                        "msg": "The identification parameter must be numeric.",
                        "param": "id",
                        "location": "params"
                    },
                    {
                        "value": "008jk",
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
        // Identification is already in database
        mocha.it('replay with json errors message of the identification field when id is already in database', done => {
            (0, supertest_1.default)(API)
                .delete('/api/agents/088')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4ODQ1ODUsImV4cCI6MTYzMzg5ODk4NX0.0TTbCysEaAMhOa65Rp-zxQeVPY9ZRgCLihRpp6062hI')
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
});
//# sourceMappingURL=agents.test.js.map