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
          schemaPath: joi.string(),
          projectName: joi.string(),
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
