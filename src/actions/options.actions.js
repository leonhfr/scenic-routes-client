import { namespace } from '../constants/namespace';

export const setActiveOption = (option) => ({
  type: namespace.SET_ACTIVE_OPTION,
  option
});
