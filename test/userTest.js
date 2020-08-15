/**
 * Unit testing user api with mocha
 */
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
var User = require('../models/user.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  /**
   *  GET /users
   */
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          done();
        });
    });
  });

  /**
   *  Get /users with constraints
   */
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/users?where={"name":"cha"}&select={"name":"1"}&sort={"account_id":"-1"}&skip=0&limit=0&count=true')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          done();
        });
    });
  });

  /**
   *  Put /users with constraints
   */
  describe('/PUT users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .put('/api/users?where={"name":"cha"}&select={"name":"1"}&sort={"account_id":"-1"}&skip=0&limit=0&count=true&avator="https://cdn.vox-cdn.com/thumbor/ctZ6WW-UTBZuXSSq0BIxLS3r0AI=/0x0:3840x2160/1820x1213/filters:focal(2125x553:2739x1167):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65638220/Death_Stranding_Sam_Porter_Bridges.13.jpg"&name=cha&password=123')
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.body.data);
          res.body.message.should.be.equal('Complete');
          done();
        });
    });
  });

  /**
   *  Put /users with constraints failed
   */
  describe('/PUT users failed', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .put('/api/users?where={"name":"chaeve"}&select={"name":"1"}&sort={"account_id":"-1"}&skip=0&limit=0&avator="https://cdn.vox-cdn.com/thumbor/ctZ6WW-UTBZuXSSq0BIxLS3r0AI=/0x0:3840x2160/1820x1213/filters:focal(2125x553:2739x1167):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65638220/Death_Stranding_Sam_Porter_Bridges.13.jpg"&name=cha&password=123')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('No such user or too much user');
          done();
        });
    });
  });

  /**
   *  Get /users with constraints (without count)
   */
  describe('/GET users', () => {
    it('it should GET all the users', (done) => {
      chai.request(server)
        .get('/api/users?where={"name":"cha"}&select={"name":"1"}&sort={"account_id":"-1"}&skip=0&limit=0')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          res.body.data[0]._id.should.be.equal('5dca98112b9570002417b830');
          res.body.data[0].name.should.be.equal('cha');
          done();
        });
    });
  });
  
  /**
   * Get /users/:_id success
   */
  describe('GET /users/:_id success', () => {
    it('it should get user cha', (done) => {
      chai.request(server)
        .get('/api/users/5dca98112b9570002417b830')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('OK');
          res.body.data.name.should.be.equal('cha');
          done();
        });
    });
  });

  /**
   * Get /users/:_id failed
   */
  describe('GET /users/:_id failed', () => {
    it('it should get nothing', (done) => {
      chai.request(server)
        .get('/api/users/123')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('Not Found');
          done();
        });
    });
  });

  /**
   * Put /users/:_id success
   */
  describe('PUT /users/:_id success', () => {
    it('it should success', (done) => {
      chai.request(server)
        .put('/api/users/5dca98112b9570002417b830?name=cha1&password=123&avator=https://cdn.vox-cdn.com/thumbor/ctZ6WW-UTBZuXSSq0BIxLS3r0AI=/0x0:3840x2160/1820x1213/filters:focal(2125x553:2739x1167):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65638220/Death_Stranding_Sam_Porter_Bridges.13.jpg')
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.body);
          res.body.message.should.be.equal('Complete');
          res.body.data.name.should.be.equal('cha1');
          done();
        });
    });
  });

  /**
   * Put /users/:_id failed No such user
   */
  describe('PUT /users/:_id failed No such user', () => {
    it('it should fail with No such user', (done) => {
      chai.request(server)
        .put('/api/users/123?name=cha1&password=123&avator=https://cdn.vox-cdn.com/thumbor/ctZ6WW-UTBZuXSSq0BIxLS3r0AI=/0x0:3840x2160/1820x1213/filters:focal(2125x553:2739x1167):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/65638220/Death_Stranding_Sam_Porter_Bridges.13.jpg')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body);
          res.body.message.should.be.equal('Not Found');
          done();
        });
    });
  });

  /**
   * Put /users/:_id (restore)
   */
  describe('PUT /users/:_id restore', () => {
    it('it should restore name to cha', (done) => {
      chai.request(server)
        .put('/api/users/5dca98112b9570002417b830?name=cha')
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.body.data);
          res.body.message.should.be.equal('Complete');
          res.body.data.name.should.be.equal('cha');
          done();
        });
    });
  });

  /**
   * Post /users/login success
   */
  describe('POST /users/login success', () => {
    it('it should login success', (done) => {
      chai.request(server)
        .post('/api/users/login?name=cha&password=123')
        .end((err, res) => {
          res.should.have.status(200);
          console.log(res.body.data);
          res.body.message.should.be.equal('Successful login');
          res.body.data.name.should.be.equal('cha');
          done();
        });
    });
  });

  /**
   * Post /users/login Username does not exist
   */
  describe('POST /users/login failed (Username does not exist)', () => {
    it('it should login failed', (done) => {
      chai.request(server)
        .post('/api/users/login?name=whatever&password=123')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('Username does not exist');
          done();
        });
    });
  });

  /**
   * Post /users/login falied Incorrect password
   */
  describe('POST /users/login failed (Incorrect password)', () => {
    it('it should login failed', (done) => {
      chai.request(server)
        .post('/api/users/login?name=cha&password=456')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('Incorrect password');
          done();
        });
    });
  });

  /**
   * Post /users/register success
   */
  describe('POST /users/register success', () => {
    it('it should register successfully', (done) => {
      chai.request(server)
        .post('/api/users/register?name=testRegister&password=123')
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.body.data);
          res.body.message.should.be.equal('Complete');
          res.body.data.name.should.be.equal('testRegister');
          done();
        });
    });
  });

  User.findOneAndRemove({"name":"testRegister"}, (err) => {
    console.log(err)
  });

  /**
   * Post /users/register failed Try a differnt name
   */
  describe('POST /users/register failed Try a differnt name', () => {
    it('it should fail register (Try a differnt name)', (done) => {
      chai.request(server)
        .post('/api/users/register?name=cha&password=123')
        .end((err, res) => {
          res.should.have.status(500);
          console.log(res.body.data);
          res.body.message.should.be.equal('Try a differnt name');
          done();
        });
    });
  });

  /**
   * Post /users/change_password success
   */
  describe('POST /users/change_password success', () => {
    it('it should change password successfully', (done) => {
      chai.request(server)
        .post('/api/users/change_password?name=cha&old_password=123&new_password=123')
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.body.data);
          res.body.message.should.be.equal('Successfully changed');
          res.body.data.name.should.be.equal('cha');
          done();
        });
    });
  });

  /**
   * Post /users/change_password fail No such user
   */
  describe('POST /users/change_password success', () => {
    it('it should change password fail No such user', (done) => {
      chai.request(server)
        .post('/api/users/change_password?name=cha1&old_password=123&new_password=123')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('No such user');
          done();
        });
    });
  });

  /**
   * Post /users/change_password fail Incorrect password
   */
  describe('POST /users/change_password fail Incorrect password', () => {
    it('it should change password fail Incorrect password', (done) => {
      chai.request(server)
        .post('/api/users/change_password?name=cha&old_password=456&new_password=123')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('Incorrect password');
          done();
        });
    });
  });

  /**
   * Post /users/bind_player success
   */
  describe('Post /users/bind_player success', () => {
    it('it should bind successfully', (done) => {
      chai.request(server)
        .post('/api/users/bind_player?name=cha&account_id=123')
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.body.data);
          res.body.message.should.be.equal('Successfully bound');
          done();
        });
    });
  });


  /**
   * Post /users/bind_player fail Account already binded
   */
  describe('Post /users/bind_player fail Account already binded', () => {
    it('it should bind fail Account already binded', (done) => {
      chai.request(server)
        .post('/api/users/bind_player?name=cha&account_id=123')
        .end((err, res) => {
          res.should.have.status(404);
          console.log(res.body.data);
          res.body.message.should.be.equal('Account already binded');
          done();
        });
    });
  });

  describe('Post /users/bind_player success', () => {
    it('it should bind successfully', (done) => {
      chai.request(server)
        .post('/api/users/bind_player?name=cha&account_id=1')
        .end((err, res) => {
          done();
        });
    });
  });
});