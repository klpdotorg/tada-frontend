import { RESET_BOUNDARY_NAV_TREE, RESET_PROGRAM_NAV_TREE } from './types';

export const resetBoundaryNavTree = () => {
  return {
    type: RESET_BOUNDARY_NAV_TREE,
  };
};

export const resetProgramNavTree = () => {
  return {
    type: RESET_PROGRAM_NAV_TREE,
  };
};
