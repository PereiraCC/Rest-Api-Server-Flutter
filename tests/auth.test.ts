import * as mocha from 'mocha';
import request from 'supertest';

const API : string = 'http://localhost:8082';

mocha.describe('Login', () => {

    let data = {
        "email" : "carlos@test.com",
        "password" : "123456"
    };

    mocha.it('Login successed', done => {

        request(API)
            .post('/api/auth/login')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end( err => {
                if(err) return done(err);
                done();
            });
    });

    mocha.it('without email', done => {

        let newData = {
            "password" : "123456"
        };
    

        request(API)
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
            .end( err => {
                if(err) return done(err);
                done();
            });

    });

    mocha.it('without password', done => {

        let newData = {
            "email" : "carlos@test.com"
        };
    

        request(API)
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
            .end( err => {
                if(err) return done(err);
                done();
            });

    });

    mocha.it('lenght password', done => {

        let newData = {
            "email" : "carlos@test.com",
            "password" : "123"
        };
    

        request(API)
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
            .end( err => {
                if(err) return done(err);
                done();
            });

    });

});

mocha.describe('Validation JWT', () => {

    mocha.it('valid JWT', done => {

        let data = {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzU1NDQ0NzQsImV4cCI6MTYzNTU1ODg3NH0.4mqs3OyiceE9bSsDCRBuf3kNCrJc9bYax_WOvycuDv0'
        };

        request(API)
            .post('/api/auth/validJWT')
            .set('Accept', 'application/json')
            .send(data)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect({
                "ok": true
            })
            .end( err => {
                if(err) return done(err);
                done();
            });

    });

    mocha.it('invalid JWT', done => {

        let data = {
            token: 'bad'
        };

        request(API)
            .post('/api/auth/validJWT')
            .set('Accept', 'application/json')
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

});