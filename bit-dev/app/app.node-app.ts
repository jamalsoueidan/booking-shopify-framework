import { NodeAppOptions } from '@teambit/node';

export const app: NodeAppOptions = {
  name: 'app',
  entry: require.resolve('./app.app-root'),
  portRange: [3000, 4000]
};

export default app;
