import * as mocha from 'mocha';
import request from 'supertest';

const API : string = 'http://localhost:8082';

mocha.describe('GET /api/agents', () => {

    mocha.it('respond with json containing a list of all users', done => {
        request(API)
            .get('/api/agents/3gJdiCZNajh57AiGq9mm')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});

mocha.describe('GET:id /api/agents/:userID:id', () => {

    // all good
    mocha.it('respond with json containing a single agent', done => {
        request(API)
            .get('/api/agents/3gJdiCZNajh57AiGq9mm/001')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });

    // Agent not found 
    mocha.it('respond with json "msg: Agent with that ID not found in the database." when user does not exists', done => {
        request(API)
            .get('/api/agents/3gJdiCZNajh57AiGq9mm/058')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .expect({
                msg : 'Agent with that ID not found in the database.'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {

        request(API)
            .get('/api/agents/3gJdiCZNajh57AiGq9mm/004')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
                msg : 'No token'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    // No valid token
    mocha.it('reply with json "msg: Invalid token" when there is Invalid token', done => {

        request(API)
            .get('/api/agents/3gJdiCZNajh57AiGq9mm/004')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
                msg : 'Invalid token'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    // identification is not numeric
    mocha.it('reply with json "msg: The identification parameter must be numeric." when id param is not numeric', done => {

        request(API)
            .get('/api/agents/3gJdiCZNajh57AiGq9mm/05ff')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

});

mocha.describe('POST /api/agents', () => {

    let data = {
        identification : "000",
        name           : "testing",
        lastname       : "testing",
        email          : "test0@test.com",
        phone          : "88886666",
        userID         : "3gJdiCZNajh57AiGq9mm"
    };

    // Create new Agent
    mocha.it('respond with json containing new agent data', done => {

        request(API)
            .post('/api/agents')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .end(err => {
                if(err) return done(err);
                done();
            })

    });

    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {

        request(API)
            .post('/api/agents')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .send(data)
            .expect(401)
            .expect({
                msg : 'No token'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    // No valid token
    mocha.it('reply with json "msg: Invalid token" when there is Invalid token', done => {

        request(API)
            .post('/api/agents')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .send(data)
            .expect(401)
            .expect({
                msg : 'Invalid token'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    mocha.describe('Error message of the identification field', () => {

        // Identification is null
        mocha.it('replay with json errors message of the identification field null', done => {

            const newData = {
                name           : "testing",
                lastname       : "testing",
                email          : "test0@test.com",
                phone          : "88886666",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };
    
            request(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });

        // Identification is not numeric
        mocha.it('replay with json errors message of the identification field is not numeric', done => {

            const newData = {
                identification : "001sd",
                name           : "testing",
                lastname       : "testing",
                email          : "test0@test.com",
                phone          : "88886666",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };

            request(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

        // Identification is already in database
        mocha.it('replay with json errors message of the identification field when id is already in database', done => {

            const newData = {
                identification : "001",
                name           : "testing",
                lastname       : "testing",
                email          : "test0@test.com",
                phone          : "88886666",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };

            request(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });
    });

    mocha.describe('Error message of the name and lastname fields', () => {

        // name is null
        mocha.it('replay with json errors message of the name field null', done => {

            const newData = {
                identification : "085",
                lastname       : "testing",
                email          : "test0@test.com",
                phone          : "88886666",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };
    
            request(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });

        // lastname is null
        mocha.it('replay with json errors message of the lastname field is null', done => {

            const newData = {
                identification : "085",
                name           : "testing",
                email          : "test0@test.com",
                phone          : "88886666",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };

            request(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

    });

    mocha.describe('Error message of the email field', () => {

        // email is null
        mocha.it('replay with json errors message of the email field null', done => {

            const newData = {
                identification : "085",
                name           : "testing",
                lastname       : "testing",
                phone          : "88886666",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };
    
            request(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });

        // email is invalid
        mocha.it('replay with json errors message of the email field is invalid', done => {

            const newData = {
                identification : "085",
                name           : "testing",
                lastname       : "testing",
                email          : "test0testcom",
                phone          : "88886666",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };

            request(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

    });

    mocha.describe('Error message of the phone field', () => {

        // phone is null
        mocha.it('replay with json errors message of the phone field null', done => {

            const newData = {
                identification : "085",
                name           : "testing",
                lastname       : "testing",
                email          : "test0@test.com",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };
    
            request(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });

        // phone is invalid
        mocha.it('replay with json errors message of the phone field is invalid', done => {

            const newData = {
                identification : "085",
                name           : "testing",
                lastname       : "testing",
                email          : "test0@test.com",
                phone          : "88886666dad",
                userID         : "3gJdiCZNajh57AiGq9mm"
            };

            request(API)
                .post('/api/agents')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

    });

    mocha.describe('Error message of the userID field', () => {

        
        mocha.it('replay with json errors message of the userID field null', done => {

            const newData = {
                identification : "085",
                name           : "testing",
                lastname       : "testing",
                email          : "test0@test.com",
                phone          : "88884444"
            };

            request(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(newData)
                .expect(400)
                .expect({
                    "errors": [
                        {
                            "msg": "The user ID field is required.",
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

        mocha.it('replay with json errors message of the userID field invalid', done => {

            const newData = {
                identification : "085",
                name           : "testing",
                lastname       : "testing",
                email          : "test0@test.com",
                phone          : "88884444",
                userID         : "bad"
            };

            request(API)
                .post('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
                .expect('Content-Type', 'application/json; charset=utf-8')
                .send(newData)
                .expect(400)
                .expect({
                    "errors": [
                        {
                            "value": "bad",
                            "msg": "Error: The userID is not already in the database",
                            "param": "userID",
                            "location": "body"
                        }
                    ]
                })
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

    });

});

mocha.describe('PUT /api/agents:id', () => {

    let data = {
        email  : "test0@test.com",
    };

    // Update agent
    mocha.it('replay json with new data agent update', done => {

        request(API)
            .put('/api/agents/3gJdiCZNajh57AiGq9mm/000')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
                if(err) return done(err);
                done();
            })
    });

    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {

        request(API)
            .put('/api/agents/3gJdiCZNajh57AiGq9mm/000')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .send(data)
            .expect(401)
            .expect({
                msg : 'No token'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    // No valid token
    mocha.it('reply with json "msg: Invalid token" when there is Invalid token', done => {

        request(API)
            .put('/api/agents/3gJdiCZNajh57AiGq9mm/000')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .send(data)
            .expect(401)
            .expect({
                msg : 'Invalid token'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    mocha.describe('Error message of the identification param', () => {

        // Identification is null
        mocha.it('replay with json errors message of the identification param null', done => {
    
            request(API)
                .put('/api/agents/3gJdiCZNajh57AiGq9mm')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
                .expect('Content-Type', 'text/html; charset=utf-8')
                .send(data)
                .expect(404)
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });

        // Identification is not numeric
        mocha.it('replay with json errors message of the identification param is not numeric', done => {

            request(API)
                .put('/api/agents/3gJdiCZNajh57AiGq9mm/45sd')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

        // Identification is already in database
        mocha.it('replay with json errors message of the identification field when id is already in database', done => {

            request(API)
                .put('/api/agents/3gJdiCZNajh57AiGq9mm/088')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });
    });

});

mocha.describe('DELETE /api/agents:id', () => {

    // delete agent
    mocha.it('replay json with new data agent delete', done => {

        request(API)
            .delete('/api/agents/3gJdiCZNajh57AiGq9mm/000')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end(err => {
                if(err) return done(err);
                done();
            })
    });

    // // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {

        request(API)
            .delete('/api/agents/3gJdiCZNajh57AiGq9mm/017')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
                msg : 'No token'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    // No valid token
    mocha.it('reply with json "msg: Invalid token" when there is Invalid token', done => {

        request(API)
            .delete('/api/agents/3gJdiCZNajh57AiGq9mm/007')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
                msg : 'Invalid token'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    mocha.describe('Error message of the identification param', () => {

        // Identification is null
        mocha.it('replay with json errors message of the identification param null', done => {
    
            request(API)
                .delete('/api/agents')
                .set('Accept', 'application/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
                .expect('Content-Type', 'text/html; charset=utf-8')
                .expect(404)
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });

        // Identification is not numeric
        mocha.it('replay with json errors message of the identification param is not numeric', done => {

            request(API)
                .delete('/api/agents/3gJdiCZNajh57AiGq9mm/008jk')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

        // Identification is already in database
        mocha.it('replay with json errors message of the identification field when id is already in database', done => {

            request(API)
                .delete('/api/agents/3gJdiCZNajh57AiGq9mm/088')
                .set('Accept', 'applicacion/json')
                .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1Mzk3MTYsImV4cCI6MTYzNTU1NDExNn0.ER3bPAPNSkbwks-M_ljmBB0UcnanntBTKFrRl3GcdMo')
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });
    });

});