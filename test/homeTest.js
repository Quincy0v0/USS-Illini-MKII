process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Home', () => {
  /**
   *  GET /posts with count
   */
  describe('/GET /', () => {
    it('it should success', (done) => {
      chai.request(server)
        .get('/api/')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('My connection string is Queeny');
          done();
        });
    });
  });
});