'use strict';

const nodemailer = require('nodemailer')
const Styliner = require('styliner')
const fs = require('fs')

let styliner = new Styliner(__dirname + '/html');

// async..await is not allowed in global scope, must use a wrapper
async function main(textHtml) {

     // Generate test SMTP service account from ethereal.email
     // Only needed if you don't have a real mail account for testing
     let account = await nodemailer.createTestAccount();

     // create reusable transporter object using the default SMTP transport
     /*let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
               //user: 'cubicador@prosip.cl',
               user: 'jvectronic@gmail.com',
               pass: '49166752'
               //pass: 'Felicida00'
          }
     });*/

     /**
      * @param idcliente 720457448691-8ijujf2f4h2covdupk7fg9psqmfm3fq6.apps.googleusercontent.com
      * @param idsecret D0lF2_uLsKcGfSFh3Ua4bR1r
      * @param accessToken ya29.GlunBgfHPCqsp9eqy1bO7_gjfVsNE4vShcJuMGqTAcv185z2rRcLaALP90peOcA0AWIP4cYWypFEToFbvaMuA3ctiYQiRU8GPmKaqRPARCHVZQEwpHZ_U5-oDd5v
      * @param refreshToken 1/Si156a-Ncsvq4NAHt4ZJPd1YpxOTz2phN66u-9QZcXg
      */

     let transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth:{
               user: 'jvectronic@gmail.com',
               pass: '49166752'
          }
     });

     // verify connection configuration
     /*transporter.verify(function (error, success) {
          if (error) {
               console.log(error);
          } else {
               console.log("Server is ready to take our messages");
          }
     });*/

     let temphtml = `
     <p>Hola Juan Ramon Perez, </p>
     <br>
     <p>En el siguiente enlace <a href="https://api.prosip.cl/generate/cotizacion/">PDF</a> encontrarás 
     Presupuesto PROSIP Nº  correspondiente a proyecto "", ubicado en "xxx".</p>
     <br>
     <p>Para completar tu pedido cotiza DESPACHO y compra directo en nuestra  TIENDA 
     Con PROSIP, este proyecto estará instalado en pocos días. Cotiza INSTALACIÓN aquí.</p>
     <br>
     <br>
     <p>Presupuesto generado automáticamente por CUBICADOR PROSIP, no garantiza volumen optimizado de Paneles ni incluye planos de montaje. 
     Para Pack de paneles a medida y/o contratar Instalación Prosip, debes anticipar el Diseño del proyecto, a partir de este se re cubica el material. Puedes generar hasta un 10% de ahorro en base a una estructura eficiente y a una correcta optimización del SIP. </p>
     <br>
     <p>DISEÑO DE ESTRUCTURA</p></p>
     <p>Diseño de Estructura SIP. Valor desde 0,2 UF/m2</p>
     <p>Diseño Estructural Completo. Memoria Fundaciones, SIP, Techumbre, Estructuras adicionales. Valor desde 0,4 UF/m2</p>
     <br>
     <br>
     <p>Para compra de materiales y despacho Ingresa a nuestra TIENDA o comunicate con nostros a ventas@prosip.cl</p>
     <p>Para más informacion y contratacion de servicios envíanos un correo a ventas@prosip.cl</p>
     <br>
     <br>
     <p>Un cordial saludo,</p>
     <br>
     <p>Equipo Plataforma PROSIP</p>
     <p>569 5687 3083</p>
     <p>www.prosip.cl</p>
     `

     // setup email data with unicode symbols
     let mailOptions = {
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: "blackencio33@gmail.com", // list of receivers
          subject: "Hello ✔", // Subject line
          html: textHtml
     };

     // send mail with defined transport object
     let info = await transporter.sendMail(mailOptions)

     console.log("Message sent: %s", info.messageId);
     // Preview only available when sending through an Ethereal account
     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

let originalSource = fs.readFileSync(__dirname + '/emailTemplate.html', 'utf8');

/*styliner.processHTML(originalSource)
     .then(function (processedSource) {
          let aux = processedSource.toString()
          aux = aux.replace(/llnameclient/i, "José Bolívar")
          aux = aux.replace(/llnrocotizacion/i, "123456-1")
          aux = aux.replace(/llnameproyecto/i, "Casa de Palacios")
          aux = aux.replace(/llubicacion/i, "Carabobo")
          aux = aux.replace(/llurlcotizacion/i, "https://api.prosip.cl/generate/proyecto/123456")
          main(aux).catch(console.error);
     })
     .catch(function (error) {
          console.log(error)
     });*/

let a = '1546'
let b = parseInt(a).toLocaleString();
b = b.toString()
console.log(b)
b = b.replace(/\,/, '.')
console.log(b)



