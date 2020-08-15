/**
 * Unit testing post api with mocha
 */
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
var Post = require('../models/post.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Post', () => {
  /**
   *  GET /posts with count
   */
  describe('/GET users with restraints', () => {
    it('it should ', (done) => {
      chai.request(server)
        .get('/api/posts?where={"_id":"5cc69f7c856b670024ce56c7"}&select={"content":"1"}&sort={"account_id":"-1"}&skip=0&limit=0&count=true')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          done();
        });
    });
  });

  /**
   *  GET /posts without count
   */
  describe('/GET posts without count', () => {
    it('it should ', (done) => {
      chai.request(server)
        .get('/api/posts?where={"_id":"5cc69f7c856b670024ce56c7"}&select={"content":"1"}&sort={"account_id":"-1"}&skip=0&limit=0')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          done();
        });
    });
  });

  /**
   * POST /posts success
   */
  describe('/POST new posts', () => {
    it('it should success', (done) => {
      chai.request(server)
        .post('/api/posts?ship_id=0&ship_name=0&user_post=0&user_rating=0&content=0')
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.body.data);
          res.body.message.should.be.equal('Complete');
          done();
        });
    });
  });

  /**
   * POST /posts fail
   */
  describe('/POST new posts fail', () => {
    it('it should fail server error', (done) => {
      chai.request(server)
        .post('/api/posts?ship_id=0ost=0&user_rating=0&content=0')
        .end((err, res) => {
          res.should.have.status(500);
          console.log(res.body.data);
          res.body.message.should.be.equal('Server error');
          done();
        });
    });
  });

  /**
   * GET /posts/:_id success
   */
  describe('/GET posts', () => {
    it('it should success', (done) => {
      chai.request(server)
        .get('/api/posts/5cc69f7c856b670024ce56c7')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          done();
        });
    });
  });

  /**
   * GET /posts/:_id fail
   */
  describe('GET /posts/:_id fail', () => {
    it('it should success', (done) => {
      chai.request(server)
        .get('/api/posts/123')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('Not Found');
          done();
        });
    });
  });

  /**
   * PUT /posts/:_id success
   */
  describe('PUT /posts/:_id success', () => {
    it('it should success', (done) => {
      chai.request(server)
        .put('/api/posts/5cc69f7c856b670024ce56c7?user_rating=5&content=123')
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.body.data);
          res.body.message.should.be.equal('Complete');
          done();
        });
    });
  });

  /**
   * PUT /posts/:_id fail
   */
  describe('PUT /posts/:_id fail', () => {
    it('it should success', (done) => {
      chai.request(server)
        .put('/api/posts/1236b670024ce56c7?user_rating=5&content=123')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('Not Found');
          done();
        });
    });
  });

  /**
   * DELETE /posts/:_id fail
   */
  describe('DELETE /posts/:_id fail', () => {
    it('it should success', (done) => {
      chai.request(server)
        .delete('/api/posts/1236b670024ce56c7')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('Not Found');
          done();
        });
    });
  });
});