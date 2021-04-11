const express = require("express");
const { postgraphile, makePluginHook } = require("postgraphile");
const { default: PgPubsub } = require("@graphile/pg-pubsub");
const PgSimplifyInflectorPlugin = require("@graphile-contrib/pg-simplify-inflector");
const PgSmallNumericToFloatPlugin = require("./plugins/PgSmallNumericToFloatPlugin");
const PgConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");
const postgraphilePolyRelationCorePlugin = require('postgraphile-polymorphic-relation-plugin').postgraphilePolyRelationCorePlugin;


const pluginHook = makePluginHook([
  PgPubsub,
  PgSmallNumericToFloatPlugin
]);

const postgraphileOptions = {
  pluginHook,
  subscriptions: true, // Enable PostGraphile websocket capabilities
  simpleSubscriptions: true, // Add the `listen` subscription field
  subscriptionEventEmitterMaxListeners: 20, // Set max listeners on eventEmitter, 0 unlimited, 10 default
  watchPg:true,
  graphiql: true,
  enhanceGraphiql: true,
  showErrorStack: true,
  dynamicJson:true,
  extendedErrors: ['hint', 'detail', 'errcode'],
  appendPlugins: [
    PgConnectionFilterPlugin,
    PgSimplifyInflectorPlugin,
    PgSmallNumericToFloatPlugin,
    postgraphilePolyRelationCorePlugin
  ],
  graphileBuildOptions: {
    connectionFilterPolymorphicForward: true,
    connectionFilterPolymorphicBackward: true,
  },  
  disableDefaultMutations: true,
  websocketMiddlewares: [
    // Add whatever middlewares you need here, note that they should only
    // manipulate properties on req/res, they must not sent response data. e.g.:
    //
    //   require('express-session')(),
    //   require('passport').initialize(),
    //   require('passport').session(),
  ],
  pgSettings: async req => ({
    'user.id':1
  })
};

const app = express();
app.use(postgraphile(process.env.DATABASE_URL, "public", postgraphileOptions));
app.listen(parseInt(process.env.PORT, 10) || 5433);

// http
//   .createServer(
//     postgraphile(process.env.DATABASE_URL, "public", {
//       pluginHook,
//       watchPg: true,
//       graphiql: true,
//       enhanceGraphiql: true,
//       appendPlugins:[

//       ]
//     })
//   )
//   .listen(process.env.PORT);