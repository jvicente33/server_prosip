var express = require('express');
var cors = require('cors');
var path = require("path");
var bodyParser = require('body-parser');
var moment = require('moment');
var moment = require('moment-timezone');
var mongo = require("mongoose");
var request = require('request');
var async = require("async");
var pdfService = require('./services/pdf');

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

const port = process.env.PORT || 8085;

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/prosip';
//const MONGO_URL = 'mongodb://userprosip:prosip1234@ds163758.mlab.com:63758/prosip';


mongo.connect(MONGO_URL, function (err, response) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Connected to db prosip');
    }
});

/*
* Config Express
*/
var app = express()
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
            res.status(500).json({ msg: "error" });
        }
        else {
            res.json(result);
        }
    });
});

/*
* Created materiales muchos
*/
app.post('/tzonas/newall', function (req, res) {
    if (req.body) {

        let data = req.body
        for (let i in data) {

            let fields = data[i];

            TZonas.findOne({ _id: fields._id }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({ error: "error interno, inténtelo más tarde" });
                }
                else {
                    if (result) {
                        res.json({ msg: "zona ya existe" });
                    }
                    else {
                        TZonas.create(fields, function (err, rest) {
                            if (err) {
                                console.log(err);
                                res.json({ error: "error interno, inténtelo más tarde" });
                            }
                        });
                    }
                }
            });

        }

        res.json({ result: true });

    }
    else {
        res.json({ msg: "sin parametros" });
    }
});

/*
* Find t_precios por parameters
*/
app.get('/tprecios', function (req, res) {
    Materiales.find({}, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "error" });
        }
        else {
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
            res.status(500).json({ msg: "error" });
        }
        else {
            res.json(result);
        }
    });
});

app.post('/tatributos/all', function (req, res) {
    if (req.body) {

        let data = req.body
        for (let i in data) {

            let fields = data[i];

            TAtributos.findOne({ _id: fields._id }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({ error: "error interno, inténtelo más tarde" });
                }
                else {
                    if (result) {
                        res.json({ msg: "atributo ya existe" });
                    }
                    else {
                        TAtributos.create(fields, function (err, rest) {
                            if (err) {
                                console.log(err);
                                res.json({ error: "error interno, inténtelo más tarde" });
                            }
                        });
                    }
                }
            });

        }

        res.json({ result: true });

    }
    else {
        res.json({ msg: "sin parametros" });
    }
});

/*
* Find t_atributos por parameters
*/
app.post('/tnormas', function (req, res) {
    TNormas.find({}, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "error" });
        }
        else {
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
            res.status(500).json({ msg: "error interno, inténtelo más tarde" });
        }
        else {
            if (result) {
                res.json({ msg: "email ya existe" });
            }
            else {
                Usuarios.create(req.body, function (err, rest) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ msg: "error interno, inténtelo más tarde" });
                    }
                    else {
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
            res.status(500).json({ msg: "error" });
        }
        else {
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
            res.status(500).json({ msg: "error interno, inténtelo más tarde" });
        }
        else {
            if (result && result._id != req.body.id) {
                res.json({ msg: "email ya existe" });
            }
            else {
                console.log("update");
                Usuarios.updateOne({ _id: req.body.id }, req.body, function (err, resp) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ msg: "error" });
                    }
                    else {
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
            res.status(500).json({ msg: "error" });
        }
        else {
            res.json("eliminado");
        }
    });
});

/**
 * Login usuario
 */

app.post('/usuario/login', async (req, res) => {
    let data = req.body
    const user = await Usuarios.find({ email: data.email, password: data.password });
    res.json({
        usuario: user
    })
})

app.post('/sesion/start', async (req, res) => {
    const data = new Sesion(req.body);
    await data.save();
    res.json({
        res: true,
        status: "Sesion guardada",
        id: data._id
    });
})

app.put('/sesion/update/:id', async (req, res) => {
    await Sesion.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        res: true,
        status: "Sesion actualizada"
    });
})

app.get('/sesion/user/:email', async (req, res) => {
    const sesion = await Sesion.find({ email: req.params.email });
    res.json({
        data: sesion
    })
})

/*
* List clientes for datatables
*/
app.get('/clientes/datatable', function (req, res) {
    Clientes.find({}, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "error" });
        }
        else {
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
            res.status(500).json({ msg: "error interno, inténtelo más tarde" });
        }
        else {
            if (result) {
                res.json({ msg: "email ya existe" });
            }
            else {
                Clientes.create(req.body, function (err, rest) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ msg: "error interno, inténtelo más tarde" });
                    }
                    else {
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
            res.json({ error: "error interno, inténtelo más tarde" });
        }
        else {
            if (result && result._id != req.body.id) {
                res.json({ msg: "email ya existe" });
            }
            else {
                Clientes.updateOne({ _id: req.body.id }, req.body, function (err, resp) {
                    if (err) {
                        console.log(err);
                        res.json({ error: "error" });
                    }
                    else {
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
            res.status(500).json({ msg: "error" });
        }
        else {
            res.json("eliminado");
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
            res.status(500).json({ msg: "error" });
        }
        else {
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
            res.json({ error: "error" });
        }
        else {
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
                res.json({ error: "error interno, inténtelo más tarde" });
            }
            else {
                res.json({ result: rest });
            }
        });
    }
    else {
        res.json({ msg: "sin parametros" });
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
                res.json({ error: "error" });
            }
            else {
                res.json({ result: req.body });
            }
        });
    }
    else {
        res.json({ msg: "sin parametros" });
    }
});

/*
* Delete proveedores
*/
app.post('/proveedores/delete', function (req, res) {
    Proveedores.deleteOne({ _id: req.body.id }, function (err) {
        if (err) {
            console.log(err);
            res.json({ error: "error" });
        }
        else {
            res.json("eliminado");
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
            res.status(500).json({ msg: "error" });
        }
        else {
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
            res.status(500).json({ msg: "error" });
        }
        else {
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
    let selectColumns = '_id nombre_proyecto descripcion nombre_usuario created_at';

    Proyectos.find({}, selectColumns, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "error" });
        }
        else {
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
            res.status(500).json({ msg: "error" });
        }
        else {
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
            res.status(500).json({ msg: "error" });
        }
        else {
            res.json(result);
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
                res.json({ error: "error" });
            }
            else {
                res.json({ result: req.body });
            }
        });
    }
    else {
        res.json({ msg: "sin parametros" });
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
                res.json({ error: "error" });
            }
            else {
                pdfService.getPdf(fields.object_cotizacion, function (err, result) {
                    if (err) {
                        console.log(err);
                        res.json({ error: "error" });
                    }
                    else {
                        res.json({ result: result });
                    }
                })
            }
        });
    }
    else {
        res.json({ msg: "sin parametros" });
    }
});

/*
* Delete proyecto
*/
app.post('/proyectos/delete', function (req, res) {
    Proyectos.deleteOne({ _id: req.body.id }, function (err) {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "error" });
        }
        else {
            res.json("eliminado");
        }
    });
});

/*
* getUf
*/
app.get('/uf', function (req, res) {
    let date = moment().tz("America/Santiago").format("YYYY-MM-DD");
    Ufs.findOne({ date: date }, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: "error" });
        }
        else {
            if (result) {
                res.json(parseFloat(result.uf));
            }
            else {
                request.get({ url: 'https://mindicador.cl/api', json: true }, function (e, r, result) {
                    Ufs.create({ uf: result.uf.valor, date: date }, function (err, resp) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ msg: "error" });
                        }
                        else {
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
            res.json({ error: "error" });
        }
        else {
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
            res.status(500).json({ msg: "error" });
        }
        else {
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
                res.json({ error: "error interno, inténtelo más tarde" });
            }
            else {
                if (result) {
                    res.json({ msg: "código ya existe" });
                }
                else {
                    Materiales.create(fields, function (err, rest) {
                        if (err) {
                            console.log(err);
                            res.json({ error: "error interno, inténtelo más tarde" });
                        }
                        else {
                            res.json({ result: rest });
                        }
                    });
                }
            }
        });
    }
    else {
        res.json({ msg: "sin parametros" });
    }
});

/*
* Created materiales muchos
*/
app.post('/materiales/newall', function (req, res) {
    if (req.body) {

        let data = req.body
        for (let i in data) {

            let fields = data[i];
            fields.codigo = fields.codigo.toUpperCase();

            Materiales.findOne({ codigo: fields.codigo }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.json({ error: "error interno, inténtelo más tarde" });
                }
                else {
                    if (result) {
                        res.json({ msg: "código ya existe" });
                    }
                    else {
                        Materiales.create(fields, function (err, rest) {
                            if (err) {
                                console.log(err);
                                res.json({ error: "error interno, inténtelo más tarde" });
                            }
                        });
                    }
                }
            });

        }
        res.json({ result: true });

    }
    else {
        res.json({ msg: "sin parametros" });
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
                res.json({ error: "error interno, inténtelo más tarde" });
            }
            else {

                if (result && result._id != fields.id) {
                    res.json({ msg: "código ya existe" });
                }
                else {
                    Materiales.updateOne({ _id: fields.id }, fields, function (err, resp) {
                        if (err) {
                            console.log(err);
                            res.json({ error: "error" });
                        }
                        else {
                            res.json({ result: req.body });
                        }
                    });
                }
            }
        });
    }
    else {
        res.json({ msg: "sin parametros" });
    }
});

/*
* Delete materiales
*/
app.post('/materiales/delete', function (req, res) {
    Materiales.deleteOne({ _id: req.body.id }, function (err) {
        if (err) {
            console.log(err);
            res.json({ error: "error" });
        }
        else {
            res.json({ result: "eliminado" });
        }
    });
});

/*
* Busqueda de proveedores que coincidan con código de producto
*/
app.post('/materiales/search', function (req, res) {
    Proveedores.find({ productos: { $elemMatch: { codigo: req.body.codigo } } }, function (err, result) {
        if (err) {
            console.log(err);
            res.json({ error: "error" });
        }
        else {
            res.json({ result: result });
        }
    });
});

/*
* list comunas
*/
app.get('/comunas', function (req, res) {
    Comunas.find({}, function (err, result) {
        if (err) {
            console.log(err);
            res.json({ error: "error" });
        }
        else {
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
            res.json({ error: "error" });
        }
        else {
            res.json({ result: result });
        }
    });
});

/*
* Run Server
*/
app.listen(port, function () {
    console.log('Example app listening on port 8085!')
})
