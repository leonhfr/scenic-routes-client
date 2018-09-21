import {mockConstants} from '../constants/mock.constants';

export const getChuck = (data) => ({
  type: mockConstants.CHUCK_GET,
  api: {
    endpoint: '/jokes/random'
  }
})