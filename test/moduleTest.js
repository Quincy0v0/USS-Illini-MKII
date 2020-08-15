/**
 * Unit testing module api with mocha
 */
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
var Module = require('../models/module.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Module', () => {
  /**
   *  /GET modules with constraints and count
   */
  describe('/GET users with restraints and count', () => {
    it('it should retuen just 1', (done) => {
      chai.request(server)
        .get('/api/modules?where={"module_id":"3269865168"}&select={"module_id_str":"1"}&sort={"module_id":"-1"}&skip=0&limit=0&count=true')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          res.body.data.should.be.equal(1);
          done();
        });
    });
  });

  /**
   *  /GET modules with constraints and not count
   */
  describe('/GET users with restraints but not count', () => {
    it('it should return the module_id_str', (done) => {
      chai.request(server)
        .get('/api/modules?where={"module_id":"3269865168"}&select={"module_id_str":"1"}&sort={"module_id":"-1"}&skip=0&limit=0&count=false')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          res.body.data[0].module_id_str.should.be.equal('PJUT977');
          done();
        });
    });
  });
});