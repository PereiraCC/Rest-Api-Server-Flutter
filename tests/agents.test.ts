import * as mocha from 'mocha';
import request from 'supertest';

const API : string = 'http://localhost:8082';

mocha.describe('GET /api/agents', () => {

    mocha.it('respond with json containing a list of all users', done => {
        request(API)
            .get('/api/agents')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});

mocha.describe('GET:id /api/agents/:id', () => {

    // TODO: No valid token, No token, identification is not numeric, 

    mocha.it('respond with json containing a single agent', done => {
        request(API)
            .get('/api/agents/004')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4Mzc4MzIsImV4cCI6MTYzMzg1MjIzMn0.JduoFYLmgbwDQccBzKGfxrjDXNyVmXGzwHvghdsllWs')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });

    mocha.it('respond with json "msg: Agent with that ID not found in the database." when user does not exists', done => {
        request(API)
            .get('/api/agents/058')
            .set('Accept', 'application/json')
            .set('x-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMDIiLCJpYXQiOjE2MzM4Mzc4MzIsImV4cCI6MTYzMzg1MjIzMn0.JduoFYLmgbwDQccBzKGfxrjDXNyVmXGzwHvghdsllWs')
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
});
