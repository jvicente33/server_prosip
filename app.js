var express = require('express');
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var moment = require('moment-timezone');
var mongo = require('mongoose');
var request = require('request');
var async = require('async');
var pdfService = require('./services/pdf');
const nodemailer = require('nodemailer')

/*
 * Modelos
 */
var TZonas = require('./models/TZonas');
var TPrecios = require('./models/TPrecios');
var TAtributos = require('./models/TAtributos');
var TNormas = require('./models/TNormas');
var Usuarios = require('./models/Usuarios');
var Clientes = require('./models/Clientes');
var Proveedores = require('./models/Proveedores');
var Proyectos = require('./models/Proyectos');
var Materiales = require('./models/Materiales');
var Ufs = require('./models/Ufs');
var Comunas = require('./models/Comunas');
var Kilometros = require('./models/Kilometros');
var Sesion = require('./models/Sesion');
var Cotizacion = require('./models/Cotizacion');

const port = process.env.PORT || 8085;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/prosip';
//const MONGO_URL = 'mongodb://userprosip:prosip1234@ds163758.mlab.com:63758/prosip';

mongo.connect(
  MONGO_URL,
  function (err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to db prosip');
    }
  }
);

/*
 * Config Express
 */
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * Find t_zonas por parameters
 */
app.get('/tzonas', function (req, res) {
  TZonas.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json(result);
    }
  });
});

/*
 * Created materiales muchos
 */
app.post('/tzonas/newall', function (req, res) {
  if (req.body) {
    let data = req.body;
    for (let i in data) {
      let fields = data[i];

      TZonas.findOne({ _id: fields._id }, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ error: 'error interno, inténtelo más tarde' });
        } else {
          if (result) {
            res.json({ msg: 'zona ya existe' });
          } else {
            TZonas.create(fields, function (err, rest) {
              if (err) {
                console.log(err);
                res.json({ error: 'error interno, inténtelo más tarde' });
              }
            });
          }
        }
      });
    }

    res.json({ result: true });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Find t_precios por parameters
 */
app.get('/tprecios', function (req, res) {
  Materiales.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json(result);
    }
  });
});

/*
 * Find t_atributos por parameters
 */
app.post('/tatributos', function (req, res) {
  TAtributos.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json(result);
    }
  });
});

app.post('/tatributos/all', function (req, res) {
  if (req.body) {
    let data = req.body;
    for (let i in data) {
      let fields = data[i];

      TAtributos.findOne({ _id: fields._id }, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ error: 'error interno, inténtelo más tarde' });
        } else {
          if (result) {
            res.json({ msg: 'atributo ya existe' });
          } else {
            TAtributos.create(fields, function (err, rest) {
              if (err) {
                console.log(err);
                res.json({ error: 'error interno, inténtelo más tarde' });
              }
            });
          }
        }
      });
    }

    res.json({ result: true });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Find t_atributos por parameters
 */
app.post('/tnormas', function (req, res) {
  TNormas.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json(result);
    }
  });
});

/*
 * Created usuario
 */
app.post('/usuarios/new', function (req, res) {
  Usuarios.findOne({ email: req.body.email }, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error interno, inténtelo más tarde' });
    } else {
      if (result) {
        res.json({ msg: 'email ya existe' });
      } else {
        Usuarios.create(req.body, function (err, rest) {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: 'error interno, inténtelo más tarde' });
          } else {
            res.json({ result: rest });
          }
        });
      }
    }
  });
});

/*
 * List usuarios for datatables
 */
app.get('/usuarios/datatable', function (req, res) {
  /* Send Post Parameters and limit skip pagination */
  // Usuarios.find()
  // //.select()
  // .limit(5)
  // .skip(0)
  // .sort({nombres: 'desc'})
  // .exec(function(err, result) {
  //     Usuarios.count().exec(function(err, count) {
  //         let resultDatatables={
  //             draw: req.body.draw,
  //             recordsTotal: count,
  //             recordsFiltered: result.length,
  //             data:result
  //         };
  //         res.json(resultDatatables);
  //     })
  // })

  Usuarios.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      let resultDatatables = {
        data: result
      };

      res.json(resultDatatables);
    }
  });
});

/*
 * Edit usuario
 */
app.post('/usuarios/edit', function (req, res) {
  Usuarios.findOne({ email: req.body.email }, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error interno, inténtelo más tarde' });
    } else {
      if (result && result._id != req.body.id) {
        res.json({ msg: 'email ya existe' });
      } else {
        console.log('update');
        Usuarios.updateOne({ _id: req.body.id }, req.body, function (err, resp) {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: 'error' });
          } else {
            res.json({ result: req.body });
          }
        });
      }
    }
  });
});

/*
 * Delete usuario
 */
app.post('/usuarios/delete', function (req, res) {
  Usuarios.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json('eliminado');
    }
  });
});

/**
 * Login usuario
 */

app.post('/usuario/login', async (req, res) => {
  let data = req.body;
  const user = await Usuarios.find({
    email: data.email,
    password: data.password
  });
  res.json({
    usuario: user
  });
});

app.get('/usuario/email/:email', async (req, res) => {
  let email = req.params.email;
  const user = await Usuarios.find({ email });
  res.json({
    usuario: user
  });
});

app.post('/sesion/start', async (req, res) => {
  const data = new Sesion(req.body);
  await data.save();
  res.json({
    res: true,
    status: 'Sesion guardada',
    id: data._id
  });
});

app.put('/sesion/update/:id', async (req, res) => {
  await Sesion.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    res: true,
    status: 'Sesion actualizada'
  });
});

app.get('/sesion/user/:email', async (req, res) => {
  const sesion = await Sesion.find({ email: req.params.email });

  let aux = [];

  for (let i in sesion) {
    let proa = {};

    proa.authDash = sesion[i].authDash;
    proa.authCubicador = sesion[i].authCubicador;
    proa.saveProject = sesion[i].saveProject;
    proa._id = sesion[i]._id;
    proa.email = sesion[i].email;
    proa.cargo = sesion[i].cargo;
    proa.updatedAt = sesion[i].updatedAt;

    let dateaux = sesion[i].dateStart; //--
    let datenaux = sesion[i].dateEnd; //--

    let date = new Date(dateaux);
    let daten = new Date(datenaux);

    proa.timeStart = dateaux.toString().substring(16, 24);
    proa.dateStart = `${
      date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
      }-${
      date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
      }-${date.getFullYear()}`;

    let aa = new Date('1995-08-02').toString();
    if (daten.toString() != aa) {
      proa.timeEnd = datenaux.toString().substring(16, 24);
      proa.dateEnd = `${
        daten.getDate() > 9 ? daten.getDate() : `0${daten.getDate()}`
        }-${
        daten.getMonth() + 1 > 9
          ? daten.getMonth() + 1
          : `0${daten.getMonth() + 1}`
        }-${daten.getFullYear()}`;
    } else {
      proa.dateEnd = '--';
      proa.timeEnd = '--';
    }

    aux.push(proa);
  }

  res.json({
    data: aux
  });
});

/*
 * List clientes for datatables
 */
app.get('/clientes/datatable', function (req, res) {
  Clientes.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      let resultDatatables = {
        data: result
      };

      res.json(resultDatatables);
    }
  });
});

/*
 * Created clientes
 */
app.post('/clientes/new', function (req, res) {
  Clientes.findOne({ email: req.body.email }, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error interno, inténtelo más tarde' });
    } else {
      if (result) {
        res.json({ msg: 'email ya existe' });
      } else {
        Clientes.create(req.body, function (err, rest) {
          if (err) {
            console.log(err);
            res.status(500).json({ msg: 'error interno, inténtelo más tarde' });
          } else {
            res.json({ result: rest });
          }
        });
      }
    }
  });
});

/*
 * Edit clientes
 */
app.post('/clientes/edit', function (req, res) {
  Clientes.findOne({ email: req.body.email }, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ error: 'error interno, inténtelo más tarde' });
    } else {
      if (result && result._id != req.body.id) {
        res.json({ msg: 'email ya existe' });
      } else {
        Clientes.updateOne({ _id: req.body.id }, req.body, function (err, resp) {
          if (err) {
            console.log(err);
            res.json({ error: 'error' });
          } else {
            res.json({ result: req.body });
          }
        });
      }
    }
  });
});

/*
 * Delete clientes
 */
app.post('/clientes/delete', function (req, res) {
  Clientes.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json('eliminado');
    }
  });
});

/*
 * List proveedores for datatables
 */
app.get('/proveedores/datatable', function (req, res) {
  Proveedores.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      let resultDatatables = {
        data: result
      };

      res.json(resultDatatables);
    }
  });
});

/*
 * search proyectos por _id
 */
app.post('/proveedores/search', function (req, res) {
  Proveedores.findOne({ _id: req.body.id }, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ error: 'error' });
    } else {
      res.json({ result: result });
    }
  });
});

/*
 * Created proveedores
 */
app.post('/proveedores/new', function (req, res) {
  if (req.body) {
    let fields = req.body;
    fields.productos = JSON.parse(req.body.productos);

    Proveedores.create(fields, function (err, rest) {
      if (err) {
        console.log(err);
        res.json({ error: 'error interno, inténtelo más tarde' });
      } else {
        res.json({ result: rest });
      }
    });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Edit proveedores
 */
app.post('/proveedores/edit', function (req, res) {
  if (req.body) {
    let fields = req.body;
    fields.productos = JSON.parse(req.body.productos);

    Proveedores.updateOne({ _id: req.body.id }, fields, function (err, resp) {
      if (err) {
        console.log(err);
        res.json({ error: 'error' });
      } else {
        res.json({ result: req.body });
      }
    });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Delete proveedores
 */
app.post('/proveedores/delete', function (req, res) {
  Proveedores.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.log(err);
      res.json({ error: 'error' });
    } else {
      res.json('eliminado');
    }
  });
});

/*
 * search proyectos por _id
 */
app.post('/proyectos/search', function (req, res) {
  Proyectos.findOne({ _id: req.body.id }, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json(result);
    }
  });
});

/*
 * List proyectos for datatables
 */
app.get('/proyectos/list', function (req, res) {
  Proyectos.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      let resultDatatables = {
        data: result
      };
      res.json(resultDatatables);
    }
  });
});

/*
 * List proyectos for datatables
 */
app.get('/proyectos/datatable', function (req, res) {
  /* Personalizamos las columnas devueltas */
  let selectColumns =
    '_id nombre_proyecto descripcion m2 version nombre_usuario created_at';

  Proyectos.find({}, selectColumns, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      let resultDatatables = {
        data: result
      };
      res.json(resultDatatables);
    }
  });
});

/*
 * Created proyecto
 */
app.post('/proyectos/new', function (req, res) {
  let fields = req.body;
  fields.object_form = JSON.parse(req.body.object_form);
  fields.object_result = JSON.parse(req.body.object_result);

  Proyectos.create(fields, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json(result);
    }
  });
});

/*
 * Edit proyecto
 */
app.post('/proyectos/edit', function (req, res) {
  let fields = req.body;
  fields.object_form = JSON.parse(req.body.object_form);
  fields.object_result = JSON.parse(req.body.object_result);

  Proyectos.updateOne({ _id: req.body.id }, fields, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      console.log(result)
      res.json({
        _id: req.body.id
      });
    }
  });
});

/*
 * Edit configuracion cotizacion
 */
app.post('/proyectos/edit/cotizacion', function (req, res) {
  if (req.body) {
    let fields = req.body;
    fields.object_despacho = JSON.parse(req.body.object_despacho);
    fields.object_instalacion = JSON.parse(req.body.object_instalacion);
    fields.object_cotizacion = JSON.parse(req.body.object_cotizacion);

    Proyectos.updateOne({ _id: req.body.id }, fields, function (err, resp) {
      if (err) {
        console.log(err);
        res.json({ error: 'error' });
      } else {
        res.json({ result: req.body });
      }
    });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Edit configuracion cotizacion y descargar pdf
 */
app.post('/proyectos/edit/cotizacionpdf', function (req, res) {
  if (req.body) {
    let fields = req.body;
    fields.object_despacho = JSON.parse(req.body.object_despacho);
    fields.object_instalacion = JSON.parse(req.body.object_instalacion);
    fields.object_cotizacion = JSON.parse(req.body.object_cotizacion);

    Proyectos.updateOne({ _id: req.body.id }, fields, function (err, resp) {
      if (err) {
        console.log(err);
        res.json({ error: 'error' });
      } else {
        pdfService.getPdf(fields.object_cotizacion, function (err, result) {
          if (err) {
            console.log(err);
            res.json({ error: 'error' });
          } else {
            res.json({ result: result });
          }
        });
      }
    });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Delete proyecto
 */
app.post('/proyectos/delete', function (req, res) {
  Proyectos.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      res.json('eliminado');
    }
  });
});

/*
 * getUf
 */
app.get('/uf', function (req, res) {
  let date = moment()
    .tz('America/Santiago')
    .format('YYYY-MM-DD');
  Ufs.findOne({ date: date }, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      if (result) {
        res.json(parseFloat(result.uf));
      } else {
        request.get({ url: 'https://mindicador.cl/api', json: true }, function (
          e,
          r,
          result
        ) {
          Ufs.create({ uf: result.uf.valor, date: date }, function (err, resp) {
            if (err) {
              console.log(err);
              res.status(500).json({ msg: 'error' });
            } else {
              res.json(result.uf.valor);
            }
          });
        });
      }
    }
  });
});

/*
 * Find t_atributos por parameters
 */
app.post('/materiales/list', function (req, res) {
  Materiales.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ error: 'error' });
    } else {
      res.json({ result: result });
    }
  });
});

/*
 * List materiales for datatables
 */
app.get('/materiales/datatable', function (req, res) {
  Materiales.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.status(500).json({ msg: 'error' });
    } else {
      let resultDatatables = {
        data: result
      };

      res.json(resultDatatables);
    }
  });
});

/*
 * Created materiales
 */
app.post('/materiales/new', function (req, res) {
  if (req.body) {
    let fields = req.body;
    fields.codigo = fields.codigo.toUpperCase();

    Materiales.findOne({ codigo: fields.codigo }, function (err, result) {
      if (err) {
        console.log(err);
        res.json({ error: 'error interno, inténtelo más tarde' });
      } else {
        if (result) {
          res.json({ msg: 'código ya existe' });
        } else {
          Materiales.create(fields, function (err, rest) {
            if (err) {
              console.log(err);
              res.json({ error: 'error interno, inténtelo más tarde' });
            } else {
              res.json({ result: rest });
            }
          });
        }
      }
    });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Created materiales muchos
 */
app.post('/materiales/newall', function (req, res) {
  if (req.body) {
    let data = req.body;
    for (let i in data) {
      let fields = data[i];
      fields.codigo = fields.codigo.toUpperCase();

      Materiales.findOne({ codigo: fields.codigo }, function (err, result) {
        if (err) {
          console.log(err);
          res.json({ error: 'error interno, inténtelo más tarde' });
        } else {
          if (result) {
            res.json({ msg: 'código ya existe' });
          } else {
            Materiales.create(fields, function (err, rest) {
              if (err) {
                console.log(err);
                res.json({ error: 'error interno, inténtelo más tarde' });
              }
            });
          }
        }
      });
    }
    res.json({ result: true });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Edit materiales
 */
app.post('/materiales/edit', function (req, res) {
  if (req.body) {
    let fields = req.body;
    fields.codigo = fields.codigo.toUpperCase();
    console.log(fields);

    Materiales.findOne({ codigo: fields.codigo }, function (err, result) {
      if (err) {
        console.log(err);
        res.json({ error: 'error interno, inténtelo más tarde' });
      } else {
        if (result && result._id != fields.id) {
          res.json({ msg: 'código ya existe' });
        } else {
          Materiales.updateOne({ _id: fields.id }, fields, function (err, resp) {
            if (err) {
              console.log(err);
              res.json({ error: 'error' });
            } else {
              res.json({ result: req.body });
            }
          });
        }
      }
    });
  } else {
    res.json({ msg: 'sin parametros' });
  }
});

/*
 * Delete materiales
 */
app.post('/materiales/delete', function (req, res) {
  Materiales.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.log(err);
      res.json({ error: 'error' });
    } else {
      res.json({ result: 'eliminado' });
    }
  });
});

/*
 * Busqueda de proveedores que coincidan con código de producto
 */
app.post('/materiales/search', function (req, res) {
  Proveedores.find(
    { productos: { $elemMatch: { codigo: req.body.codigo } } },
    function (err, result) {
      if (err) {
        console.log(err);
        res.json({ error: 'error' });
      } else {
        res.json({ result: result });
      }
    }
  );
});

/*
 * list comunas
 */
app.get('/comunas', function (req, res) {
  Comunas.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ error: 'error' });
    } else {
      res.json({ result: result });
    }
  });
});

/*
 * list kilometros
 */
app.get('/kilometros', function (req, res) {
  Kilometros.find({}, function (err, result) {
    if (err) {
      console.log(err);
      res.json({ error: 'error' });
    } else {
      res.json({ result: result });
    }
  });
});

app.get('/generate/proyecto/:id', async function (req, res) {
  try {
    let proyecto = await Cotizacion.find({idproyecto: req.params.id})
    await res.redirect(`/generate/cotizacion/${proyecto[0].cotizacion}`);
  } catch (error) {
    console.log(error)
    res.status(404).json({
      res: false,
      message: error
    })
  }
})

app.get('/generate/cotizacion/:id', async function (req, res) {
  const fs = require('fs');

  //Cotizacion
  let cotizacion = null;
  try {
    console.log('Buscando cotizacion');
    cotizacion = await Cotizacion.findOne({ cotizacion: req.params.id });
    console.log(cotizacion);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      res: false,
      message: error
    })
  }

  //Materiales
  let materiales = null;
  try {
    console.log('Buscando materiales');
    materiales = await Materiales.find();
    if (materiales) console.log('materiales encontrados');
  } catch (error) {
    console.log(error);
    res.status(401).json({
      res: false,
      message: error
    })
  }

  let content = `
  let cliente = '${cotizacion.cliente}';
  document.getElementById('cliente_app').innerHTML = cliente;
  let empresa = '${cotizacion.empresa}';
  document.getElementById('cliente_empresa_app').innerHTML = empresa;
  let email = '${cotizacion.email}';
  document.getElementById('cliente_email_app').innerHTML = email;
  let uf = '$ ${cotizacion.uf}';
  document.getElementById('uf_app').innerHTML = uf;
  let fecha = '${cotizacion.fecha}';
  document.getElementById('fecha_app').innerHTML = fecha;
  let nro = '${cotizacion.cotizacion}';
  document.getElementById('nro_app').innerHTML = nro;
  let nombre = '${cotizacion.nombre_proyecto}';
  document.getElementById('nombre_app').innerHTML = nombre;
  let version = '${cotizacion.version}';
  document.getElementById('version_app').innerHTML = version;
  let ubicacion = '${cotizacion.ubicacion}';
  document.getElementById('ubicacion_app').innerHTML = ubicacion;
  let zona = 'Zona ${cotizacion.zona}';
  document.getElementById('zona_app').innerHTML = zona;
  let m2 = '${cotizacion.m2}';
  document.getElementById('m2_app').innerHTML = m2;

  let sip_app = '$ ${cotizacion.total_sip}';
  document.getElementById('sip_app').innerHTML = sip_app;
  let ufm2sip_app = '${cotizacion.ufm2sip} UF/M2';
  document.getElementById('ufm2sip_app').innerHTML = ufm2sip_app;

  let elecomp_app = '$ ${cotizacion.total_comp}';
  document.getElementById('elecomp_app').innerHTML = elecomp_app;
  let ufm2comp_app = '${cotizacion.ufm2comp} UF/M2';
  document.getElementById('ufm2comp_app').innerHTML = ufm2comp_app;

  let neto_app = '$ ${cotizacion.total_neto}';
  document.getElementById('neto_app').innerHTML = neto_app;
  let ufm2neto_app = '${cotizacion.ufm2neto} UF/M2';
  document.getElementById('ufm2neto_app').innerHTML = ufm2neto_app;

  let iva_app = '$ ${cotizacion.iva}';
  document.getElementById('iva_app').innerHTML = iva_app;

  let tociva_app = '$ ${cotizacion.totalciva}';
  document.getElementById('tociva_app').innerHTML = tociva_app;
  let ufm2civa_app = '${cotizacion.ufm2civa} UF/M2';
  document.getElementById('ufm2civa_app').innerHTML = ufm2civa_app;
  `;

  let p90 = false
  let p114 = false
  let p162 = false
  let p210 = false

  let c3 = false
  let c4 = false
  let c6 = false

  let t6 = false
  let t8 = false
  let t14 = false

  let tu8 = false
  let tu10 = false

  for (i in cotizacion.items) {

    for (j in materiales) {
      if (materiales[j].nombre.localeCompare(cotizacion.items[i].nombre) === 0) {

        if (cotizacion.items[i].cant != 0) {

          if (cotizacion.items[i].nombre == 'Panel 90' && p90 == false) {

            content += `let panel90_app = '<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>'
                document.getElementById('panel90_app').innerHTML = panel90_app;
                `;
            p90 = true
          }

          if (cotizacion.items[i].nombre == 'Panel 114' && p114 == false) {

            content += `let panel114_app = '<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>'
                document.getElementById('panel114_app').innerHTML = panel114_app;
                `;
            p114 = true
          }

          if (cotizacion.items[i].nombre == 'Panel 162' && p162 == false) {

            content += `let panel162_app = '<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>'
                document.getElementById('panel162_app').innerHTML = panel162_app;
                `;
            p162 = true
          }

          if (cotizacion.items[i].nombre == 'Panel 210' && p210 == false) {

            content += `let panel210_app = '<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>'
                document.getElementById('panel210_app').innerHTML = panel210_app;
                `;
            p210 = true
          }

          if (cotizacion.items[i].nombre == `2x3'' cep` && c3 == false) {
            content += `let cep2x3_app = "<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>"
                document.getElementById('cep2x3_app').innerHTML = cep2x3_app;
                `;
            c3 = true
          }
          if (cotizacion.items[i].nombre == `2x4'' cep` && c4 == false) {
            content += `let cep2x4_app = "<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>"
                document.getElementById('cep2x4_app').innerHTML = cep2x4_app;
                `;
            c4 = true
          }
          if (cotizacion.items[i].nombre == `2x6'' cep` && c6 == false) {
            content += `let cep2x6_app = "<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>"
                document.getElementById('cep2x6_app').innerHTML = cep2x6_app;
                `;
            c6 = true
          }

          if (cotizacion.items[i].nombre == `Torn 6x1 5/8''` && t6 == false) {
            content += `let torn6x1_app = "<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>"
                document.getElementById('torn6x1_app').innerHTML = torn6x1_app;
                `;
            t6 = true
          }
          if (cotizacion.items[i].nombre == `Torn 8x3''` && t8 == false) {
            content += `let torn8x3_app = "<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>"
                document.getElementById('torn8x3_app').innerHTML = torn8x3_app;
                `;
            t8 = true
          }
          if (cotizacion.items[i].nombre == `Turbo 14x5 1/2''` && t14 == false) {
            content += `let turbo14x5_app = "<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>"
                document.getElementById('turbo14x5_app').innerHTML = turbo14x5_app;
                `;
            t14 = true
          }
          if (cotizacion.items[i].nombre == `Turbo 8''` && tu8 == false) {
            content += `let turbo8_app = "<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>"
                document.getElementById('turbo8_app').innerHTML = turbo8_app;
                `;
            tu8 = true
          }
          if (cotizacion.items[i].nombre == `Turbo 10''` && tu10 == false) {
            content += `let turbo10_app = "<tr> <td></td> <td>${cotizacion.items[i].nombre}</td> <td>${cotizacion.items[i].cant}</td> <td>$ ${cotizacion.items[i].unit}</td> <td>$ ${cotizacion.items[i].subtotal}</td> <td></td> <td></td> </tr>"
                document.getElementById('turbo10_app').innerHTML = turbo10_app;
                `;
            tu10 = true
          }

        }

      }
    }

  }

  await fs.writeFile('./template/js/main.js', content, err => {
    if (err) {
      console.error(err);
      res.status(401).json({
        res: false,
        message: err
      })
    }
    console.log('Good!');
  });

  await res.redirect('/presupuesto');
});

app.use('/presupuesto', express.static(__dirname + '/template'));

function round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

async function sendEmail(email, namecotz, idcotz, isEdit, ubicacion, nameclient) {

  let account = await nodemailer.createTestAccount();

  /**
  * @param idcliente 720457448691-8ijujf2f4h2covdupk7fg9psqmfm3fq6.apps.googleusercontent.com
  * @param idsecret D0lF2_uLsKcGfSFh3Ua4bR1r
  * @param accessToken ya29.GlunBgfHPCqsp9eqy1bO7_gjfVsNE4vShcJuMGqTAcv185z2rRcLaALP90peOcA0AWIP4cYWypFEToFbvaMuA3ctiYQiRU8GPmKaqRPARCHVZQEwpHZ_U5-oDd5v
  * @param refreshToken 1/Si156a-Ncsvq4NAHt4ZJPd1YpxOTz2phN66u-9QZcXg
  */

  // create reusable transporter object using the default SMTP transport
  /*let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      //user: 'cubicador@prosip.cl',
      //pass: 'Felicida00'
      user: 'jvectronic@gmail.com',
      pass: '49166752'
    }
  });*/

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'cubicador@prosip.cl',
      clientId: '720457448691-8ijujf2f4h2covdupk7fg9psqmfm3fq6.apps.googleusercontent.com',
      clientSecret: 'D0lF2_uLsKcGfSFh3Ua4bR1r',
      refreshToken: '1/Si156a-Ncsvq4NAHt4ZJPd1YpxOTz2phN66u-9QZcXg',
      accessToken: 'ya29.GlunBgfHPCqsp9eqy1bO7_gjfVsNE4vShcJuMGqTAcv185z2rRcLaALP90peOcA0AWIP4cYWypFEToFbvaMuA3ctiYQiRU8GPmKaqRPARCHVZQEwpHZ_U5-oDd5v',
      expires: 1484314697598
    }
  });

  let subj = null

  if (!isEdit) {
    subj = `Cotización - ${namecotz} ✔`
  } else {
    subj = `Cotización Editada - ${namecotz} ✔`
  }


  let temphtml = `
     <p>Hola ${nameclient}, </p>
     <p>En el siguiente enlace >> <a href="https://api.prosip.cl/generate/cotizacion/${idcotz}">PDF</a> << encontrarás el
     Presupuesto PROSIP Nº ${idcotz}, correspondiente al proyecto "${namecotz}", ubicado en ${ubicacion}.</p>
     <p>Para completar tu pedido cotiza <a href="https://www.prosip.cl/w.despacho.html">DESPACHO</a> y compra directo en nuestra <a href="https://www.prosip.cl/tienda">TIENDA</a>.<br>
     Con PROSIP, este proyecto estará instalado en pocos días. Cotiza <a href="https://www.prosip.cl/w.instalacion.html">INSTALACIÓN</a> aquí.</p>

     <p>Presupuesto generado automáticamente por CUBICADOR PROSIP, no garantiza volumen optimizado de Paneles ni incluye planos de montaje. 
     Para Pack de paneles a medida y/o contratar Instalación Prosip, debes anticipar el Diseño del proyecto, a partir de este se re cubica el material. Puedes generar hasta un 10% de ahorro en base a una estructura eficiente y a una correcta optimización del SIP. </p>
     <hr>
     <p><strong>DISEÑO DE ESTRUCTURA<strong></p>
     <p>Diseño de Estructura SIP. Valor desde 0,2 UF/m2</p>
     <p>Diseño Estructural Completo. Memoria Fundaciones, SIP, Techumbre, Estructuras adicionales. Valor desde 0,4 UF/m2</p>
     <p>Para compra de materiales y despacho Ingresa a nuestra <a href="https://www.prosip.cl/tienda">TIENDA</a> o comunicate con nostros a ventas@prosip.cl</p>
     <p>Para más informacion y contratacion de servicios envíanos un correo a ventas@prosip.cl</p>
     <br>
     <p>Un cordial saludo,</p>
     <p>Equipo Plataforma PROSIP <br>
     569 5687 3083 <br>
     www.prosip.cl</p>
    `

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Mailer Prosip 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: subj, // Subject line
    //text: "Hello world?",
    html: temphtml,
    //html: `Click en el siguiente enlace para mostrar el PDF --> <a href="http://localhost:8085/generate/cotizacion/${idcotz}">¡GO!</a>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return nodemailer.getTestMessageUrl(info);
}

app.put('/proyecto/status/:id/:status', async (req, res) => {
  Proyectos.updateOne({ _id: req.params.id }, {
    status: req.params.status
  }, function (err, resp) {
    if (err) {
      console.log(err);
      res.json({ error: 'error' });
    }
    console.log('Actualizado con exito');
    res.json({
      res: true,
      message: 'Status actualizado'
    })
  });
})

app.post('/cotizacion/new/:idproject', async (req, res) => {
  let data = req.body;
  let dateCl = moment()
    .tz('America/Santiago')
    .format('YYYY-MM-DD');
  let date = new Date();
  let isEdit = false

  console.log(`Recibiendo en body`);
  console.log(data);

  //Proyecto en cotizacion
  let proyecto = null;
  let proyectoid = null
  try {
    console.log('Buscando proyecto');
    proyecto = await Cotizacion.findOne({ idproyecto: req.params.idproject });
    if (proyecto) {
      console.log('Cotizacion encontrada')
      isEdit = true
    } else {
      console.log('Cotizacion no encontrada')
    }
    proyecto = req.params.idproject
  } catch (error) {
    console.log(error);
    res.status(401).json({
      res: false,
      message: error
    })
  }

  //Cliente
  let cliente = null;
  let clienteEmpresa = ''
  let clienteNombre = ''
  try {
    console.log('Buscando cliente');
    cliente = await Clientes.findById(data.project.cliente);
    clienteNombre = cliente.nombre_contacto
    clienteEmpresa = cliente.empresa
    if (!cliente) {
      console.log('Cliente externo no encontrado')
      console.log('Buscando cliente interno')
      cliente = await Usuarios.findById(data.project.cliente);
      clienteNombre = cliente.nombres
      clienteEmpresa = 'n/a'
      if (!cliente) {
        res.status(401).json({
          res: false,
          message: 'Cliente no encontrado'
        })
      }
    }
    console.log(cliente);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      res: false,
      message: error
    })
  }

  //Materiales
  let materiales = null;
  try {
    console.log('Buscando materiales');
    materiales = await Materiales.find();
    if (materiales) console.log('materiales encontrados');
    if (!materiales) {
      res.status(401).json({
        res: false,
        message: 'Materiales no encontrados'
      })
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      res: false,
      message: error
    })
  }

  await request.get(
    { url: 'https://mindicador.cl/api', json: true },
    async (error, r, result) => {
      if (error) {
        console.log(error);
        res.json({
          res: false,
          message: 'Error interno'
        });
      }

      console.log('Buscando valor de UF');
      console.log(`UF >>> ${result.uf.valor}`);

      let cotizacion = {
        idproyecto: proyecto,
        cotizacion: date.getTime(),
        cliente: clienteNombre,
        email: cliente.email,
        empresa: clienteEmpresa,
        uf: parseInt(result.uf.valor),
        fecha: dateCl.toString(),
        nombre_proyecto: data.project.nombre_proyecto,
        version: data.project.version,
        ubicacion: data.project.ubicacion,
        zona: data.zona,
        m2: parseInt(data.project.m2),
        items: [],
        total_sip: 0,
        ufm2sip: 0,
        total_comp: 0,
        ufm2comp: 0,
        total_neto: 0,
        ufm2neto: 0,
        iva: 0,
        totalciva: 0,
        ufm2civa: 0
      };
      let items = data.namecant;

      console.log('Organizando items');
      for (i in items) {
        let isTrue = false;
        let op = false;
        let index = null;

        for (j in cotizacion.items) {
          if (items[i].name.localeCompare(cotizacion.items[j].nombre) === 0) {
            if (op === false) {
              isTrue = true;
              index = j;
              op = true;
            }
          }
        }

        console.log(`Index --> ${index}`);

        if (isTrue === true) {
          console.log(`Index --> ${isTrue}`);

          let nombre = items[i].name;
          let cant = items[i].cant;
          let unit = await materiales.find(k => k.nombre == nombre).promedio;
          let subtotal = cant * unit;
          console.log('Flujo nro. 1');
          console.log(`${nombre}`);
          //console.log(`${nombre}|${cant}|${unit}|${subtotal}`);
          cotizacion.items[index].cant = cotizacion.items[index].cant + cant;
          cotizacion.items[index].subtotal =
            cotizacion.items[index].subtotal + subtotal;

          console.log(cotizacion.items[index]);
        } else if (isTrue === false) {
          let nombre = items[i].name;
          let cant = items[i].cant;
          let unit = await materiales.find(k => k.nombre == nombre).promedio;
          let subtotal = cant * unit;
          let aux = {
            nombre,
            cant,
            unit,
            subtotal
          };
          console.log('Flujo nro. 2');
          console.log(nombre)
          //console.log(aux);
          cotizacion.items.push(aux);
        }

        console.log();
        console.log();
        console.log();
        console.log();
      }



      for (i in cotizacion.items) {

        for (j in materiales) {
          if (materiales[j].nombre.localeCompare(cotizacion.items[i].nombre) === 0) {
            if (materiales[j].elemento == 'Panel') {
              cotizacion.total_sip = cotizacion.total_sip + cotizacion.items[i].subtotal
            }
            if (materiales[j].elemento == 'Fijacion') {
              cotizacion.total_comp = cotizacion.total_comp + cotizacion.items[i].subtotal
            }
            if (materiales[j].elemento == 'Madera') {
              cotizacion.total_comp = cotizacion.total_comp + cotizacion.items[i].subtotal
            }
          }
        }

      }

      cotizacion.ufm2sip = cotizacion.total_sip / cotizacion.uf / cotizacion.m2;
      cotizacion.ufm2comp = cotizacion.total_comp / cotizacion.uf / cotizacion.m2;
      cotizacion.total_neto = cotizacion.total_sip + cotizacion.total_comp
      cotizacion.ufm2neto = cotizacion.ufm2sip + cotizacion.ufm2comp
      cotizacion.iva = cotizacion.total_neto * 0.19
      cotizacion.totalciva = cotizacion.total_neto + cotizacion.iva
      cotizacion.ufm2civa = cotizacion.totalciva / cotizacion.uf / cotizacion.m2

      cotizacion.ufm2sip = round(cotizacion.ufm2sip, 2)
      cotizacion.ufm2comp = round(cotizacion.ufm2comp, 2)
      cotizacion.total_neto = round(cotizacion.total_neto, 2)
      cotizacion.ufm2neto = round(cotizacion.ufm2neto, 2)
      cotizacion.iva = round(cotizacion.iva, 2)
      cotizacion.totalciva = round(cotizacion.totalciva, 2)
      cotizacion.ufm2civa = round(cotizacion.ufm2civa, 2)

      //console.log(cotizacion.items)
      const cot = new Cotizacion(cotizacion);
      try {
        if (isEdit) {
          //let upcot = await Cotizacion.updateOne({idproyecto: proyecto}, cotizacion)
          console.log('idcotizacion', proyecto)
          Cotizacion.updateOne({ idproyecto: proyecto }, cotizacion, function (err, resp) {
            if (err) {
              console.log(err);
              res.json({ error: 'error' });
            }
            console.log('Actualizado con exito');
          });
        } else {
          await cot.save();
          console.log('Guardado con exito');
        }

        let resemail = null
        try {
          resemail = await sendEmail(cotizacion.email, cotizacion.nombre_proyecto, cotizacion.cotizacion, isEdit, cotizacion.ubicacion, cotizacion.cliente)
        } catch (error) {
          console.log(error)
          res.status(401).json({
            res: false,
            message: error
          })
        }
        res.json({
          message: 'Cotizacion guardada',
          email: resemail,
          res: true
        });
      } catch (error) {
        console.log(error);
        res.json({
          message: 'No se guardo',
          res: false
        });
      }
    }
  );
});

/*
 * Run Server
 */
app.listen(port, function () {
  console.log('Example app listening on port 8085!');
});
