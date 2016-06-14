/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var models = require('../api/index');

var Thing = models.Thing;
var User = models.User;
var contacto = models.Contacto;

Thing.sync()
  .then(() => {
    return Thing.destroy({ where: {} });
  })
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    }]);
  });

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    }])
    .then(() => {
      console.log('');
    });
  });


contacto.sync()
  .then(() => contacto.destroy({ where: {} }))
  .then(() => {
    contacto.bulkCreate([{
      id:1,
      tipocontacto:2,
      nombre:'Iasd',
      apellidos:'Sevilla Furones',
      telefono:'123456789',
      email: 'asd@gmail.com',
      direccion: 'a',
      observaciones: 'asd',
      tipo1: 'modelo de zara',
      tipo2: 170
    },
      {
        id:2,
        tipocontacto:1,
        nombre:'Imadfgl',
        apellidos:'Sevilla Furones',
        telefono:'123456789',
        email: 'asd@gmail.com',
        direccion: 'a',
        observaciones: 'asd',
        tipo1: 'modelo de drdb',
        tipo2: 192
      }])
      .then(() => {
        console.log('finished populating users');
      });
  });

