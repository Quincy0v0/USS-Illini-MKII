/**
 * Unit testing consumable api with mocha
 */
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
var Consumable = require('../models/consumable.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Consumable', () => {
  /**
   *  /GET consumables with constraints and count
   */
  describe('/GET users with restraints and count', () => {
    it('it should retuen just 1', (done) => {
      chai.request(server)
        .get('/api/consumables?where={"consumable_id":"4179128272"}&select={"consumable_id_str":"1"}&sort={"consumable_id":"-1"}&skip=0&limit=0&count=true')
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
   *  /GET consumables with constraints and not count
   */
  describe('/GET users with restraints but not count', () => {
    it('it should return the consumable_id_str', (done) => {
      chai.request(server)
        .get('/api/consumables?where={"consumable_id":"4179128272"}&select={"name":"1"}&sort={"consumable_id":"-1"}&skip=0&limit=0&count=false')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          res.body.data[0].name.should.be.equal('Royal Navy');
          done();
        });
    });
  });
});