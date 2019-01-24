import build, { getParam } from 'build-route-tree';

const rawTree = {
  marketplace: null,
  c2fc: {
    type: getParam(null),
  },
  create: null,
};

const routes = build(rawTree);

export default routes;
