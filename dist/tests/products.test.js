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
mocha.describe('GET /api/products/:userID', () => {
    mocha.it('respond with json containing a list of all products', done => {
        (0, supertest_1.default)(API)
            .get('/api/products/3gJdiCZNajh57AiGq9mm')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});
mocha.describe('GET /api/products/:userID:id', () => {
    // all good
    mocha.it('respond with json containing a single product', done => {
        (0, supertest_1.default)(API)
            .get('/api/products/3gJdiCZNajh57AiGq9mm/352')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
    // Agent not found 
    mocha.it('Product not found', done => {
        (0, supertest_1.default)(API)
            .get('/api/products/3gJdiCZNajh57AiGq9mm/058')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .expect({
            msg: 'Product with that ID not found in the database.'
        })
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // No token
    mocha.it('No token', done => {
        (0, supertest_1.default)(API)
            .get('/api/products/3gJdiCZNajh57AiGq9mm/004')
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
    mocha.it('Invalid token', done => {
        (0, supertest_1.default)(API)
            .get('/api/products/3gJdiCZNajh57AiGq9mm/352')
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
    mocha.it('The identification parameter must be numeric.', done => {
        (0, supertest_1.default)(API)
            .get('/api/products/3gJdiCZNajh57AiGq9mm/05ff')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
mocha.describe('POST /api/products', () => {
    let data = {
        code: "968",
        title: "test",
        price: 100,
        available: true,
        userID: "3gJdiCZNajh57AiGq9mm"
    };
    // Create new Product
    mocha.it('Create new Product', done => {
        (0, supertest_1.default)(API)
            .post('/api/products')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
    mocha.it('No token', done => {
        (0, supertest_1.default)(API)
            .post('/api/products')
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
    mocha.it('Invalid token', done => {
        (0, supertest_1.default)(API)
            .post('/api/products')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
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
    mocha.describe('Validation Code field', () => {
        mocha.it('code is required', done => {
            let data = {
                title: "test",
                price: 100,
                available: true,
                userID: "3gJdiCZNajh57AiGq9mm"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The code field is required.",
                        "param": "code",
                        "location": "body"
                    },
                    {
                        "msg": "The code field must be numeric",
                        "param": "code",
                        "location": "body"
                    },
                    {
                        "msg": "Function Query.where() called with invalid data. Unsupported field value: undefined",
                        "param": "code",
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
        mocha.it('code must be numeric', done => {
            let data = {
                code: "045df",
                title: "test",
                price: 100,
                available: true,
                userID: "3gJdiCZNajh57AiGq9mm"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "045df",
                        "msg": "The code field must be numeric",
                        "param": "code",
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
        mocha.it('code exists', done => {
            let data = {
                code: "352",
                title: "test",
                price: 100,
                available: true,
                userID: "3gJdiCZNajh57AiGq9mm"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "352",
                        "msg": "Error: The identification is already in the database",
                        "param": "code",
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
    mocha.describe('Validation title and price fields', () => {
        mocha.it('title is required', done => {
            let data = {
                code: "069",
                price: 100,
                available: true,
                userID: "3gJdiCZNajh57AiGq9mm"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The title field is required.",
                        "param": "title",
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
        mocha.it('price is required', done => {
            let data = {
                code: "069",
                title: "test",
                available: true,
                userID: "3gJdiCZNajh57AiGq9mm"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The price field is required.",
                        "param": "price",
                        "location": "body"
                    },
                    {
                        "msg": "The price field must be numeric",
                        "param": "price",
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
        mocha.it('price must be numeric', done => {
            let data = {
                code: "069",
                title: "test",
                price: "100fg",
                available: true,
                userID: "3gJdiCZNajh57AiGq9mm"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "100fg",
                        "msg": "The price field must be numeric",
                        "param": "price",
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
    mocha.describe('Validation available field', () => {
        mocha.it('available is required', done => {
            let data = {
                code: "069",
                title: "test",
                price: "100",
                userID: "3gJdiCZNajh57AiGq9mm"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The available field is required.",
                        "param": "available",
                        "location": "body"
                    },
                    {
                        "msg": "The available field is invalid.",
                        "param": "available",
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
        mocha.it('available is invalid', done => {
            let data = {
                code: "069",
                title: "test",
                price: "100",
                available: "false456",
                userID: "3gJdiCZNajh57AiGq9mm"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "false456",
                        "msg": "The available field is invalid.",
                        "param": "available",
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
    mocha.describe('Validation userID field', () => {
        mocha.it('userID is required', done => {
            let data = {
                code: "069",
                title: "test",
                price: 100,
                available: true,
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "msg": "The userID field is required.",
                        "param": "userID",
                        "location": "body"
                    },
                    {
                        "msg": "Error: The userID is not already in the database",
                        "param": "userID",
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
        mocha.it('userID exists', done => {
            let data = {
                code: "069",
                title: "test",
                price: 100,
                available: true,
                userID: "3gJdiCZNajh57AiGq9mm123456"
            };
            (0, supertest_1.default)(API)
                .post('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(data)
                .expect(400)
                .expect({
                "errors": [
                    {
                        "value": "3gJdiCZNajh57AiGq9mm123456",
                        "msg": "Error: The userID is not already in the database",
                        "param": "userID",
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
mocha.describe('PUT /api/products/:userID:id', () => {
    let data = {
        title: "test0",
    };
    // Update agent
    mocha.it('update product', done => {
        (0, supertest_1.default)(API)
            .put('/api/products/3gJdiCZNajh57AiGq9mm/968')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
    mocha.it('No token', done => {
        (0, supertest_1.default)(API)
            .put('/api/products/3gJdiCZNajh57AiGq9mm/968')
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
    mocha.it('Invalid token', done => {
        (0, supertest_1.default)(API)
            .put('/api/agents/3gJdiCZNajh57AiGq9mm/968')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
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
        mocha.it('Identification is null', done => {
            (0, supertest_1.default)(API)
                .put('/api/products/3gJdiCZNajh57AiGq9mm')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
        mocha.it('Identification is not numeric', done => {
            (0, supertest_1.default)(API)
                .put('/api/products/3gJdiCZNajh57AiGq9mm/45sd')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
        mocha.it('Identification is not already in database', done => {
            (0, supertest_1.default)(API)
                .put('/api/products/3gJdiCZNajh57AiGq9mm/088')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
mocha.describe('DELETE /api/products/:userID:id', () => {
    mocha.it('delete product', done => {
        (0, supertest_1.default)(API)
            .delete('/api/products/3gJdiCZNajh57AiGq9mm/968')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
            if (err)
                return done(err);
            done();
        });
    });
    // No token
    mocha.it('No token', done => {
        (0, supertest_1.default)(API)
            .delete('/api/products/3gJdiCZNajh57AiGq9mm/017')
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
    mocha.it('No valid token', done => {
        (0, supertest_1.default)(API)
            .delete('/api/products/3gJdiCZNajh57AiGq9mm/007')
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
    mocha.describe('Error message of the identification param', () => {
        // Identification is null
        mocha.it('replay with json errors message of the identification param null', done => {
            (0, supertest_1.default)(API)
                .delete('/api/products')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
                .delete('/api/products/3gJdiCZNajh57AiGq9mm/008jk')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
                .delete('/api/products/3gJdiCZNajh57AiGq9mm/088')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU2MzIwMzQsImV4cCI6MTYzNTY0NjQzNH0.0QeJVdoLyE0VQTcwFvblFkth8P9Z7o8pqgfYkEbdpn4')
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
//# sourceMappingURL=products.test.js.map