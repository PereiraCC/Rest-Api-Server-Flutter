import * as mocha from 'mocha';
import request from 'supertest';

const API : string = 'http://localhost:8082';

mocha.describe('GET /api/users', () => {

    mocha.it('respond with json containing a list of all users' , done => {
        request(API)
            .get('/api/users?limit=10&from=1')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);

    });

});

mocha.describe('GET:id /api/users/:id', () => {

    // all good
    mocha.it('respond with json containing a single user', done => {
        request(API)
            .get('/api/users/448')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });

    // User not found 
    mocha.it('respond with json "msg: User with that ID not found in the database." when user does not exists', done => {
        request(API)
            .get('/api/users/058')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(404)
            .expect({
                msg : 'User with that ID not found in the database.'
            })
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    // No token
    mocha.it('reply with json "msg: No token" when there is no token', done => {

        request(API)
            .get('/api/users/448')
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
            .get('/api/users/448')
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
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

});

mocha.describe('POST /api/users', () => {

    let data = {
        "identification" : "005",
        "name"           : "Test",
        "email"          : "test@test.com",
        "password"       : "123456"
    };

    // Create new Users
    mocha.it('respond with json containing new user data', done => {

        request(API)
            .post('/api/users')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(201)
            .end(err => {
                if(err) return done(err);
                done();
            })
    });

    mocha.describe('Validation of identification field', () => {

        mocha.it('without identification', done => {
    
            let data =  {
                "name"           : "Test",
                "email"          : "test@test.com",
                "password"       : "123456"
            };

            request(API)
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
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });

        mocha.it('identification is not numeric', done => {

            let data = {
                "identification" : "car",
                "name"           : "Test",
                "email"          : "test@test.com",
                "password"       : "123456"

            };

            request(API)
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
                .end( err => {
                    if(err) return done(err);
                    done();
                });

        });

        mocha.it('identification exists', done => {
    
            let data =  {
                "identification" : "102",
                "name"           : "Test",
                "email"          : "test@test.com",
                "password"       : "123456"
            };

            request(API)
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
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });

    });

    mocha.describe('Validation of name field', () => {

        mocha.it('without name', done => {

            let data = {
                "identification" : "048",
                "email"          : "test@test.com",
                "password"       : "123456"
            }

            request(API)
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
                .end( err => {
                    if(err) return done(err);
                    done();
                });
        });
    });

    mocha.describe('Validation of email field' , () => {

        mocha.it('without email', done => {

            let data = {
                "identification" : "048",
                "name"           : "test",
                "password"       : "123456"
            };

            request(API)
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

        mocha.it('Invalid email', done => {

            let data = {
                "identification" : "048",
                "name"           : "test",
                "email"          : "testcom",
                "password"       : "123456"
            };

            request(API)
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

    });

    mocha.describe('Validation of password field', () => {

        mocha.it('without password', done => {

            let data = {
                "identification" : "048",
                "name"           : "test",
                "email"          : "test@test.com"
            };

            request(API)
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

        mocha.it('lenght password', done => {

            let data = {
                "identification" : "048",
                "name"           : "test",
                "email"          : "test@test.com",
                "password"       : "123"
            };

            request(API)
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
                .end( err => {
                    if(err) return done(err);
                    done();
                })
        });

    });
});

mocha.describe('PUT /api/users', () => {

    let data = {
        "name" : "test5"
    }

    mocha.it('update user', done => {

        request(API)
            .put('/api/users/005')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    mocha.it('No token', done => {

        request(API)
            .put('/api/users/005')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
                "msg": "No token"
            })
            .end( err => {
                if(err) return done(err);
                done();
            }); 
    });

    mocha.it('Invalid token', done => {

        request(API)
            .put('/api/users/005')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
                "msg": "Invalid token"
            })
            .end( err => {
                if(err) return done(err);
                done();
            }); 
    });

    mocha.it('identification is not numeric', done => {

        request(API)
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
            .end( err => {
                if(err) return done(err);
                done();
            });

    });

    mocha.it('identification not found', done => {

        request(API)
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
            .end( err => {
                if(err) return done(err);
                done();
            });

    });
});

mocha.describe('DELETE /api/users', () => {

    mocha.it('delete user', done => {

        request(API)
            .delete('/api/users/005')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1MjM1MDcsImV4cCI6MTYzNTUzNzkwN30.fWxWr6cmhBSof0W4QxNRwHNCnoAWBZ0-wWFoC-0iTYI')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    mocha.it('No token', done => {

        request(API)
            .delete('/api/users/005')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
                "msg": "No token"
            })
            .end( err => {
                if(err) return done(err);
                done();
            }); 
    });

    mocha.it('Invalid token', done => {

        request(API)
            .delete('/api/users/005')
            .set('Accept', 'application/json')
            .set('x-token', 'bad')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(401)
            .expect({
                "msg": "Invalid token"
            })
            .end( err => {
                if(err) return done(err);
                done();
            }); 
    });

    mocha.it('identification is not numeric', done => {

        request(API)
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
            .end( err => {
                if(err) return done(err);
                done();
            });

    });

    mocha.it('identification not found', done => {

        request(API)
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
            .end( err => {
                if(err) return done(err);
                done();
            });

    });

});