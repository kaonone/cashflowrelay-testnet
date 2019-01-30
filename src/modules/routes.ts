import build, { getParam } from 'build-route-tree';

const rawTree = {
  marketplace: null,
  cashFlows: {
    type: getParam(null),
  },
  create: null,
};

const routes = build(rawTree);

export default routes;
