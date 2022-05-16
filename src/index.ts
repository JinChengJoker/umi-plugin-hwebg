// ref:
// - https://umijs.org/plugins/api
import { IApi } from '@umijs/types';
import { traverseOpenApiList } from 'hwebg';

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
        traverseOpenApiList(openAPIConfig);
        return;
      }
      traverseOpenApiList([openAPIConfig]);
    },
  });
}
