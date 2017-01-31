process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server.js');

chai.use(chaiHttp);

describe('POST /users', function() {
  it('should create a new user', function(done) {
    let user = {name:'Nick'}
    chai.request(server)
    .post('/users')
    .send(user)
    .end(function(err, res) {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    done();
    });
  });
});
