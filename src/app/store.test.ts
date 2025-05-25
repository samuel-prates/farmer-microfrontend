import { store } from './store';

describe('Redux Store', () => {
  it('should configure the store with farmers reducer', () => {
    const state = store.getState();
    expect(state).toHaveProperty('farmers');
  });

    it('should dispatch actions without error', () => {
      expect(() => {
        store.dispatch({ type: 'UNKNOWN_ACTION' });
      }).not.toThrow();
    });
  });