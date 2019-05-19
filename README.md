[![Build Status](https://travis-ci.com/capsulajs/capsulahub.svg?branch=develop)](https://travis-ci.com/capsulajs/capsulahub)

Capsula Hub
===========
Description
-----------
An awesome tool to develop and test your micro-frontend services !

Install
-------
`$ npm install -g @capsulajs/capsula-hub`

or

`$ yarn global add @capsulajs/capsula-hub`

Usage
-----
`capsula-hub run <token>`

Right now, only the localhost mode is available.
The `token` is the path to the served configuration file.

Configuration<a name="config_example"></a>
-------------
The configuration should match this [API](https://github.com/capsulajs/capsulahub-core/blob/develop/packages/workspace/src/api/WorkspaceConfig.ts).

Example: 
```typescript
export const capsulaHubConfig = {
  name: 'my-config',
  service: [
    {
      serviceName: 'myServiceA',
      path: '@my-namespace/my-service-a',
      definition: {
        serviceName: 'myServiceA',
        methods: {
          myMethod1: { asyncModel: 'RequestResponse' },
          myMethod2$: { asyncModel: 'RequestStream' },
        }
      },
      config: {}
    },
    {
      serviceName: 'myServiceB',
      path: 'https://my-cdn/my-service-b',
      definition: {
        serviceName: 'myServiceB',
        methods: {
          myMethod1: { asyncModel: 'RequestResponse' },
          myMethod2: { asyncModel: 'RequestResponse' },
        }
      },
      config: {}
    },
  ],
  components: {
    layouts: {
      grid: {
        componentName: 'web-grid',
        nodeId: 'root',
        path: 'http://my-cdn/components/Grid.js',
        config: { title: 'Base Grid' },
       },
    },
    items: {
      ['request-form']: {
        componentName: 'web-request-form',
        nodeId: 'request-form',
        path: 'http://my-cdn/components/RequestForm.js',
        config: { title: 'Base Request Form' },
      },
    }
  }
};
```

Develop your extension
----------------------
An extension is a service that is able to register himself and can be reached by the configuration
as detailed in this [section](#configurationa-nameconfig_examplea).

This service can be reached when deployed to npm registry, any CDN or even served locally.

The two variables `WORKSPACE` and `SERVICE_CONFIG` are passed through the service `Workspace` which 
is a core service.

`WORKSPACE` contains the methods that allows the service to register itself.
`SERVICE_CONFIG` contains the service specific configuration previously loaded with the `token`.

```typescript
const bootstrap = (WORKSPACE: any, SERVICE_CONFIG: any) => {
  return new Promise(async (resolve) => {
    class ServiceA {
      private readonly message: string;
      constructor(message: string) {
        this.message = message;
      }

      greet(name: string) {
        return new Promise((resolve, reject) => {
          if (!name) {
            reject('No name to greet has been provided :-(');
          }
          resolve(`Dear ${name}, ${this.message}`);
        });
      }
    }

    const serviceA = new ServiceA(SERVICE_CONFIG.config.message);

    const registerServiceData = {
      serviceName: SERVICE_CONFIG.serviceName,
      reference: serviceA,
    };

    await WORKSPACE.registerService(registerServiceData);
    resolve({ ...registerServiceData, reference: serviceA });
  });
};

// @ts-ignore
if (typeof publicExports !== 'undefined') {
  // @ts-ignore
  publicExports = bootstrap;
}

export default bootstrap;

```

Run it locally
--------------
|        What to do    |   Command   |
|----------------------|-------------|
| To run the linter:   | `yarn lint` |
| To run the tests:    | `yarn test` |
| To generate the doc: | `yarn doc`  |

Development
-----------
- Clone the project then do `yarn` or `npm i`
- Create a `capsulahub.json` file at the root with the following structure:
    ```json
    {
      "token": "your_token"
    }
    ```
- Run `yarn start` or `npm run start`.
