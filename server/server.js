var Glue = require("@hapi/glue");
const msal = require('@azure/msal-node');
const Path = require("path");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});
const Inert = require("@hapi/inert");

var manifest = require("./config/manifest.json");
var options = {
  relativeTo: __dirname + "/modules",
};
manifest.register.plugins.push({
  plugin: "hapi-sequelizejs",
  options: [
    {
      name: "odyssee_teams",
      models: [__dirname + "/models/**/*.js"],
      sequelize: sequelize,
      sync: false,
      forceSync: false,
    },
  ],
});
manifest.register.plugins.push(Inert);

const config = {
  auth: {
    clientId: "5830a2dd-c958-47bd-b6e8-676341fc5faf", //Le client ID de l'application enregistrée sur Azure Active Directory 
    authority: "https://login.microsoftonline.com/ef866cb3-5ed9-490c-a761-90c3ddaee64e", //Le Tenant ID de votre domaine Azure ACtive Directory
    clientSecret: "AB6OH-Pb.66SBbT__e9Bo5V6JdF.B7Pt8~",
  }
};

const cca = new msal.ConfidentialClientApplication(config);

const startServer = async function () {
  try {
    const server = await Glue.compose(manifest, options);


    server.route({
      method: "GET",
      path: "/{path*}",
      handler: {
        directory: {
          path: Path.join(__dirname, "public/build"),
          listing: false,
          index: true,
        },
      },
    });

    server.route({
      method: "GET",
      path: "/static-server/{param*}",
      config: {
        handler: {
          directory: {
            path: Path.resolve(__dirname, "public"),
          },
        },
      },
    });

    await server.start();
    console.log("hapi days!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
