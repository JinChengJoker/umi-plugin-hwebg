// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import { generatePages, generateRoutes } from 'hwebg';

export default function(api: IApi) {
  api.describe({
    key: 'openAPI',
    config: {
      schema(joi) {
        const itemSchema = joi.object({
          requestLibPath: joi.string(),
          schemaPath: joi.string(),
          mock: joi.boolean(),
          projectName: joi.string(),
          apiPrefix: joi.alternatives(joi.string(), joi.function()),
          namespace: joi.string(),
          hook: joi.object({
            customFunctionName: joi.function(),
            customClassName: joi.function(),
          }),
        });
        return joi.alternatives(joi.array().items(itemSchema), itemSchema);
      },
    },
    enableBy: api.EnableBy.config,
  });

  api.registerCommand({
    name: 'hwebg',
    fn: async () => {
      const openAPIConfig = api.config.openAPI;
      if (Array.isArray(openAPIConfig)) {
        generatePages(openAPIConfig);
        return;
      }
      generatePages([openAPIConfig]);
    },
  });

  api.registerCommand({
    name: 'hwebr',
    fn: async () => {
      const openAPIConfig = api.config.openAPI;
      const publicPath = api.config.publicPath || '';
      if (Array.isArray(openAPIConfig)) {
        generateRoutes(openAPIConfig, publicPath);
        return;
      }
      generateRoutes([openAPIConfig], publicPath);
    },
  });
}
