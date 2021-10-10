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

