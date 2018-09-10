export const user = {
  // Initial state
  state: {
    name: ''
  },
  reducers: {
    // handle state changes with pure functions
    saveName(state, payload) {
      return {
        ...state,
        name: payload
      };
    }
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async getNameAsync(payload, state) {
      const loadedName = await new Promise(resolve =>
        setTimeout(() => resolve(payload.name), payload.timeout)
      );
      dispatch.user.saveName(loadedName);
    }
  })
};
