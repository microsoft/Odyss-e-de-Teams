var Glue = require("@hapi/glue");
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
