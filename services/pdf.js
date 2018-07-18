/**
*
* @autor Danilo Vasquez
* @description Módulo contenedor de herramientas
*/

var path = require("path");
var moment = require('moment');
//then you create a PdfPrinter object
var proyectoService = require('./proyectos');
var PdfPrinter = require('pdfmake');

var fonts = {
    Roboto: {
        normal: path.join(__dirname, '../', 'assets', '/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../', 'assets', '/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../', 'assets', '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../', 'assets', '/fonts/Roboto-Italic.ttf')
    }
};

var printer = new PdfPrinter(fonts);

var module;

module.exports = {
  getPdf: function (json,callback)
  {
      var arrContent = [];
      /* START : ADD IMAGE */
      arrContent.push({image: proyectoService.getBase64(),width: 100,style: 'styleLogo'});
      /* END : ADD IMAGE */

      /* START : INFO ARQUITECTO */
      arrContent.push({text: 'Josefa Barros - Arquitecto - +569 56873083', style: 'cardUser'});
      arrContent.push({text: 'jbarros@prosip.cl', style: 'cardUser'});
      arrContent.push({text: 'www.prosip.cl', style: 'cardUser'});
      /* END : INFO ARQUITECTO */

      arrContent.push({text: '__________________________________________________________________________________________________________________', style: "separator"});

      /* START : INFO CLIENTE/PROYECTO */
      arrContent.push({
          style: 'bodyTable',
          table: {
              headerRows: 0,
              dontBreakRows: true,
              widths: [75, 146,1,80,147],
              body: [
                  [
                      {text: 'Cliente', style: 'tableHeader', colSpan: 2, alignment: 'left',border: [false, false, false, true]},
                      {text: '',border: [false, false, false, false]},
                      {text: '',border: [false, false, false, false]},
                      {text: 'Proyecto',colSpan: 2, style: 'tableHeader', alignment: 'left',border: [false, false, false, true]},
                      {text: '',border: [false, false, false, false]}
                  ],
                  [
                      {text: 'Rut:', style: 'subheader',border: [false, false, false, false]},
                      {text: formateaRut(json.rutCliente), style: 'contentBody',border: [false, false, false, false]},
                      {text: '',border: [false, false, false, false]},
                      {text: 'Cotización:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.ncotizacion, style: 'contentBody',border: [false, false, false, false]},
                  ],
                  [
                      {text: 'Nombre Cliente:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.nombreCliente, style: 'contentBody',border: [false, false, false, false]},
                      {text: '',border: [false, false, false, false]},
                      {text: 'Nombre Proyecto:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.inputNombreProyecto, style: 'contentBody',border: [false, false, false, false]}
                  ],
                  [
                      {text: 'Mail contacto:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.mailContacto, style: 'contentBody',border: [false, false, false, false]},
                      {text: '',border: [false, false, false, false]},
                      {text: 'Modelo:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.modelo, style: 'contentBody',border: [false, false, false, false]}
                  ],
                  [
                      {text: 'Empresa:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.empresa, style: 'contentBody',border: [false, false, false, false]},
                      {text: '',border: [false, false, false, false]},
                      {text: 'Versión:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.version, style: 'contentBody',border: [false, false, false, false]}
                  ],
                  [
                      {text: 'Fecha:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.fecha, style: 'contentBody',border: [false, false, false, false]},
                      {text: '',border: [false, false, false, false]},
                      {text: 'm2:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.inputM2, style: 'contentBody',border: [false, false, false, false]}
                  ],
                  [
                      {text: 'UF del día:', style: 'subheader',border: [false, false, false, false]},
                      {text: '$ ' + currencyFormatDE(json.uf), style: 'contentBody',border: [false, false, false, false]},
                      {text: '',border: [false, false, false, false]},
                      {text: 'Ubicación:', style: 'subheader',border: [false, false, false, false]},
                      {text: json.ubicacion, style: 'contentBody',border: [false, false, false, false]}
                  ]
              ]
          },
          layout: 'lightHorizontalLines'
      });
      /* END : INFO CLIENTE/PROYECTO */

      arrContent.push({text: '__________________________________________________________________________________________________________________', style: "separator"});

      /* START : INFO MATERIALES */
      arrContent.push({
          style: 'tableExample',
          table: {
              widths: [300,5,200],
              body: [
                  [
                      {text: 'PACK PANELES SIP', style: 'tableHeader', alignment: 'center',border: [true, true, true, true]},
                      {text: ''},
                      {text: 'ESTUDIO Y DISEÑO DE ESTRUCTURA', style: 'tableHeader',alignment: 'center',border: [true, true, true, true]}
                  ],
                  [
                      [
                          {
                              text: '',
                              margin: [0, 10,0,0]
                          },
                          {

                              table: {
                                  widths: ["*","*","*","*"],
                                  //heights: function (row) {
                                  //	return (row + 1) * 15;
                                  //},
                                  body: [
                                      [
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#54b03d',
                                              alignment: 'center',
                                              text:
                                              [
                                                  {text: '\nMuros \n Exteriores', style:'titleBox',color:"white"}
                                              ]

                                          },
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#54b03d',
                                              alignment: 'center',
                                              text:
                                              [
                                                  {text: '\nMuros \n Interiores', style:'titleBox',color:"white"}
                                              ]

                                          },
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#fb9a00',
                                              alignment: 'center',
                                              text:
                                              [
                                                  {text: '\nLosas', style:'titleBox',color:"white"}
                                              ]

                                          },
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#40a0f2',
                                              alignment: 'center',
                                              text:
                                              [
                                                  {text: '\nTechos', style:'titleBox',color:"white"}
                                              ]

                                          },
                                      ],
                                      [
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#54b03d',
                                              alignment: 'center',
                                              text:
                                              [
                                                  {text: 'SIP ' + json.nombrePanelMurosExte,bold: true, fontSize: 10,color:"white"}

                                              ]

                                          },
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#54b03d',
                                              alignment: 'center',
                                              text:
                                              [
                                                  {text: 'SIP ' + json.nombrePanelMurosInt,bold: true, fontSize: 10,color:"white"}
                                              ]

                                          },
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#fb9a00',
                                              alignment: 'center',
                                              text:
                                              [
                                                  {text: 'SIP ' + json.nombrePanelLosas,bold: true, fontSize: 10,color:"white"}
                                              ]

                                          },
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#40a0f2',
                                              alignment: 'center',
                                              text:
                                              [
                                                  {text: 'SIP ' + json.nombrePanelTechos,bold: true, fontSize: 10,color:"white"}
                                              ]

                                          },
                                      ]
                                  ]
                              },
                              layout: {
                                  paddingTop: function(i, node) { return 5; },
                                  paddingBottom: function(i, node) { return 10; }
                              }
                          },
                          {
                              text: '',
                              margin: [0, 10,0,0]
                          },
                          {
                              style: 'bodyTable',
                              table: {
                                  headerRows: 0,
                                  dontBreakRows: true,
                                  widths: [160,50,62],
                                  body: [
                                      [
                                          {text: 'TOTAL ESTIMADO : ' + json.totalPaneles + ' PANELES SIP', style: 'subheader'},
                                          {text: 'VALOR:', style: 'subheader',alignment: 'right'},
                                          {text: '$ ' + currencyFormatDE(json.valorTotalPaneles), style: 'contentBody',alignment: 'right', bold:true},
                                      ],
                                      [
                                          {text:'',colSpan: 2},
                                          {},
                                          {text: json.valorTotalPanelesUF + ' uf/m2', style: 'contentBody',alignment: 'right',bold:false}
                                      ],
                                      [
                                          {text: 'MATERIALES COMPLEMENTARIOS PACK', colSpan: 3, alignment: 'left',style: 'subheader'}
                                      ],
                                      [
                                          {text: 'Maderas Pino seco cepillado ' + json.maderaMuros+ '", ' + json.maderaLosas+ '", ' + json.maderaTechos+ '"', colSpan: 3, alignment: 'left'}
                                      ],
                                      [
                                          {text: 'Uniones entre paneles y fijaciones mecánicas', colSpan: 3, alignment: 'left'}
                                      ],
                                      [
                                          {text: json.m3flete, colSpan: 3, alignment: 'left',style: 'subheader'}
                                      ],
                                      [
                                          {text: json.camionFlete, colSpan: 3, alignment: 'left',style: 'subheader'}
                                      ],
                                      [
                                          {text: 'Costo Flete: $ ' + currencyFormatDE(json.valorFlete), colSpan: 3, alignment: 'left',style: 'subheader'}
                                      ],
                                      [
                                          {text: 'VALOR MATERIALES/FLETE:', style: 'subheader',colSpan: 2 ,alignment: 'right'},
                                          {},
                                          {text: '$ ' + currencyFormatDE(json.sumValorTotalMateriales), style: 'contentBody',alignment: 'right',bold:true}
                                      ],
                                      [
                                          {text:'',colSpan: 2},
                                          {},
                                          {text: json.sumValorTotalMaterialesUF + ' uf/m2', style: 'contentBody',alignment: 'right',bold:false}
                                      ],
                                      [
                                          {text: 'TOTAL PACK PUESTO EN OBRA:', style: 'subheader',colSpan: 2 ,alignment: 'right'},
                                          {},
                                          {text: '$ ' + currencyFormatDE(json.sumValorTotalMaterialesPaneles), style: 'contentBody',alignment: 'right',bold:true}
                                      ],
                                      [
                                          {text:'',colSpan: 2},
                                          {},
                                          {text: json.sumValorTotalMaterialesPanelesUF + ' uf/m2', style: 'contentBody',alignment: 'right',bold:false}
                                      ],
                                      [
                                          {text:'\n',colSpan: 3},
                                          {},
                                          {}
                                      ],
                                      [
                                          {text: 'TIEMPO DE MONTAJE: ' + json.tiempoMontaje, style: 'subheader',colSpan: 3 ,alignment: 'left',fillColor: '#eeeeee'},
                                          {},
                                          {}
                                      ]
                                  ]
                              },
                              layout: 'noBorders'
                          }

                      ],
                      {},
                      [
                          {
                              style: 'bodyTable',
                              table: {
                                  headerRows: 0,
                                  dontBreakRows: true,
                                  widths: [120,60],
                                  heights: [70, 20, 20],
                                  body: [
                                      [
                                          {text: json.txtDiseno, colSpan: 2},
                                          {}
                                      ],
                                      [
                                          {text: 'VALOR:', style: 'subheader',alignment: 'right'},
                                          {text: '$ ' + currencyFormatDE(json.costoDiseno), style: 'contentBody',alignment: 'right',bold:true}
                                      ],
                                      [
                                          {text:''},
                                          {text: json.costoDisenoUF + ' uf/m2', style: 'contentBody',alignment: 'right',bold:false}
                                      ]
                                  ]
                              },
                              layout: 'noBorders'
                          },
                          {
                              style: 'bodyTable',
                              table: {
                                  headerRows: 0,
                                  dontBreakRows: true,
                                  widths: [120,60],
                                  heights: [20, 70, 20,20],
                                  body: [
                                      [
                                          {text: 'INSTALACIÓN',colSpan: 2, style: 'tableHeader',alignment: 'center',border: [true, true, true, true]},
                                          {}
                                      ],
                                      [
                                          {text: json.txtInstalacion, colSpan: 2,border: [false, false, false, false]},
                                          {text:'',border: [false, false, false, false]}
                                      ],
                                      [
                                          {text: 'VALOR:', style: 'subheader',alignment: 'right',border: [false, false, false, false]},
                                          {text: '$ ' + currencyFormatDE(json.costoInstalacion), style: 'contentBody',alignment: 'right',bold:true,border: [false, false, false, false]}
                                      ],
                                      [
                                          {text:'',border: [false, false, false, false]},
                                          {text: json.costoInstalacionUF + ' uf/m2', style: 'contentBody',alignment: 'right',bold:false,border: [false, false, false, false]}
                                      ]
                                  ]
                              },
                              layout: 'lightHorizontalLines'
                          },
                          {
                              style: 'bodyTable',
                              table: {
                                  headerRows: 0,
                                  dontBreakRows: true,
                                  widths: [90,90],
                                  body: [
                                      [
                                          {
                                              border: [false, false, false, false],
                                              fillColor: '#009688',
                                              text: 'VALOR PACK PUESTO EN OBRA',color:"white",colSpan: 2, style: 'tableHeader',alignment: 'center'},
                                              {}
                                          ],
                                          [
                                              {
                                                  border: [false, false, false, false],
                                                  fillColor: '#009688',
                                                  text: 'TOTAL NETO:', bold:true,color:"white",fontSize:12,alignment: 'right'
                                              },
                                              {
                                                  border: [false, false, false, false],
                                                  fillColor: '#009688',
                                                  text: '$ ' + currencyFormatDE(json.costoTotalProyecto), bold:true,color:"white", fontSize:12,alignment: 'right',bold:true
                                              }
                                          ],
                                          [
                                              {
                                                  border: [false, false, false, false],
                                                  fillColor: '#009688',
                                                  text:''
                                              },
                                              {
                                                  border: [false, false, false, false],
                                                  fillColor: '#009688',
                                                  text: json.costoTotalProyectoUF + ' uf/m2', bold:true, color:"white",style: 'contentBody',alignment: 'right',bold:false
                                              }
                                          ]
                                      ]
                                  },
                                  layout: {
                                      paddingBottom: function(i, node) { return 15; }
                                  }
                              }
                          ]
                      ]
                  ]
              },
              layout: 'lightHorizontalLines'
          });
          /* END : INFO MATERIALES */

          /* START : OBSERVACIONES */
          arrContent.push({
  			style: 'bodyTable',
  			pageBreak: 'before',
  			table: {
  			headerRows: 0,
              dontBreakRows: true,
              widths: ['*'],
  				body: [
  				    [
                          {border: [false, false, false, false],text: 'OBSERVACIONES', alignment: 'left',fontSize: 10,bold:true}
                      ],
                      [
                          {border: [false, false, false, false],text: "Valor Pack Paneles SIP: valor referencial, estimado en base a paneles enteros (Formato 122 x 244 cm) El valor de este puede variar tras el diseño detallado de la estructura, de acuerdo al tipo de solución y cantidad de elementos.\n Se sugiere ajustar dimensiones a modulacion SIP. \nUn proyecto optimizado para SIP genera hasta 10% de ahorro (sin alterar el diseño general de arquitectura).\n Valores + iva", alignment: 'left'}
                      ],
                      [
                          {border: [false, false, false, false],text: 'PLAZOS', alignment: 'left',fontSize: 10,bold:true}
                      ],
                      [
                          {border: [false, false, false, false],text: "Estudio y diseño de estructura: 10 dias habiles. Considera 2 correcciones Fabricacion y despacho PACK: 25 dias habiles desde el termino del estudio Montaje: 8 - 10 dias corridos", alignment: 'left'}
                      ],
                       [
                          {border: [false, false, false, false],text: ""}
                      ],
                      [
                          {border: [false, false, false, false],text: 'CONDICIONES COMERCIALES', alignment: 'left',fontSize: 10,bold:true}
                      ],
                      [
                          {border: [false, false, false, false],text: "Estudio y diseño de estructura: 10 dias habiles. Considera 2 correcciones Fabricacion y despacho PACK: 25 dias habiles desde el termino del estudio Montaje: 8 - 10 dias corridos", alignment: 'left'}
                      ],
                      [
                          {border: [false, false, false, false],text: ""}
                      ],
                      [
                          {border: [false, false, false, false],text: 'INFORMACIÓN DE FACTURACIÓN', alignment: 'left',fontSize: 10,bold:true}
                      ],
                      [
                          {border: [false, false, false, false],text: "Razon Social: Proyectasip SpA\nRUT: 76.510.913-2\nDiego Portales 860 - Puerto Montt\njbarros@prosip.cl\nBanco Chile. Cuenta Corriente Nº 268 03909 - 07", alignment: 'left'}
                      ]

  				]
  			},
  			layout: {
  				// paddingLeft: function(i, node) { return 4; },
  				// paddingRight: function(i, node) { return 4; },
  				 paddingTop: function(i, node) { return 8; },
  				 paddingBottom: function(i, node) { return 0; },
  				// fillColor: function (i, node) { return null; }
  			}
  		});
          /* END : OBSERVACIONES */

          var docDefinition = {
              pageOrientation: 'portrait',
              pageSize: 'LETTER',
              pageMargins: [ 40, 30, 40, 50 ],
              info: {
                  title: 'Informe Prosip',
                  author: 'Prosip'
              },
              content: arrContent,
              styles: {
                  cardUser: {
                      fontSize: 9,
                      color: "#333333",
                      bold: true,
                      alignment: 'right',
                      margin: [0, 0, 0, 2]
                  },
                  styleLogo: {
                      fontSize: 9,
                      bold: true,
                      alignment: 'right',
                      margin: [0, 0, 0, 10]
                  },
                  bodyTable: {
                      fontSize:8,
                      bold: false,
                      margin: [0, 0, 0, 5]
                  },
                  separator: {
                      fontSize: 10,
                      color: "#CCCCCC",
                      margin: [0, 5, 0, 5]
                  },
                  tableHeader: {
                      bold: true,
                      fontSize: 9,
                      color: 'black',
                      margin: [0, 5, 0, 5]
                  },
                  subheader: {
                      fontSize: 8,
                      color: "#222222",
                      bold: true,
                      margin: [0, 2, 0, 2]
                  },
                  contentBody: {
                      fontSize: 8,
                      margin: [0, 2, 0, 2]
                  },
                  titleBox: {
                      fontSize: 12,
                      bold: true,
                      margin: [0, 0, 0, 10]
                  }
              },
              defaultStyle: {
                  /*  alignment: 'justify' */
              },
              footer: function(currentPage, pageCount) {
                  return {
                      margin:[0,0,20,0],
                      columns: [
                          {
                              fontSize: 9,
                              text:[
                                  {
                                      text: '©prosip. ' + currentPage.toString() + ' de ' + pageCount,
                                  }
                              ],
                              alignment: 'right'
                          }
                      ]
                  };

              }
          };

          var pdfDoc = printer.createPdfKitDocument(docDefinition);
          var nameDate=moment().format('YYYYMMDDTHHmmss');
          var namePdf='Cotizacion_' + nameDate + '.pdf';

          //pdfDoc is a stream so you can pipe it to the file system
          var fs = require('fs');
          pdfDoc.pipe(fs.createWriteStream('/var/sistema.prosip.cl/assets/pdf/'+ namePdf));

          pdfDoc.on('end', function () {

              //copiamos de la carpeta original a la temporal, para que el documento se encuentre disponible
              //inmediatamente despues de generado
              //var uploadLocation = path.resolve(sails.config.appPath, 'assets/pdfs') + '/' + namePdf;
              //var tempLocation = path.resolve(sails.config.appPath, '.tmp/public/pdfs') + '/' + namePdf;
              //Copy the file to the temp folder so that it becomes available immediately
              //fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));

              var stats = fs.statSync('/var/sistema.prosip.cl/assets/pdf/'+ namePdf);
              var size = stats["size"];
              var i = Math.floor(Math.log(size) / Math.log(1024));
              var finalSize = (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];

              return callback(null,{file: namePdf, size: finalSize});

          });
          // close the stream
          pdfDoc.end();
  }
};

/*
* Convert 1234567.89 a 1.234.567,89
*/
function currencyFormatDE (num) {
    let nnum=num
    .toFixed(2) // always two decimal digits
    .replace(".", ",") // replace decimal point character with ,
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") // use . as a separator

    return nnum.replace(",00", "");
}

/*
* Convert a format rut
*/
function formateaRut(rut) {
    var actual = rut.replace(/^0+/, "");
    if (actual != '' && actual.length > 1) {
        var sinPuntos = actual.replace(/\./g, "");
        var actualLimpio = sinPuntos.replace(/-/g, "");
        var inicio = actualLimpio.substring(0, actualLimpio.length - 1);
        var rutPuntos = "";
        var i = 0;
        var j = 1;
        for (i = inicio.length - 1; i >= 0; i--) {
            var letra = inicio.charAt(i);
            rutPuntos = letra + rutPuntos;
            if (j % 3 == 0 && j <= inicio.length - 1) {
                rutPuntos = "." + rutPuntos;
            }
            j++;
        }
        var dv = actualLimpio.substring(actualLimpio.length - 1);
        rutPuntos = rutPuntos + "-" + dv;
    }
    return rutPuntos;
}
