/**
 * Unit testing ship api with mocha
 */
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
var Post = require('../models/ship.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Ship', () => {
  /**
   *  /GET ships with constraints and count
   */
  describe('/GET ships with restraints and count', () => {
    it('it should retuen just 1', (done) => {
      chai.request(server)
        .get('/api/ships?where={"ship_id":"3542005744"}&select={"ship_id_str":"1"}&sort={"ship_id":"-1"}&skip=0&limit=0&count=true')
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
   *  /GET ships with constraints and without count
   */
  describe('/GET ships with restraints but not count', () => {
    it('it should return the ship_id_str', (done) => {
      chai.request(server)
        .get('/api/ships?where={"ship_id":"3542005744"}&select={"ship_id_str":"1"}&sort={"ship_id":"-1"}&skip=0&limit=0&count=false')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          res.body.data[0].ship_id_str.should.be.equal('PASC718');
          done();
        });
    });
  });
});