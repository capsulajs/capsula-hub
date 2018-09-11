export const user = {
  // Initial state
  state: {
    name: '',
    greeting: ''
  },
  reducers: {
    // handle state changes with pure functions
    updateName(state, payload) {
      return {
        ...state,
        name: payload
      };
    },
    updateGreeting(state, payload) {
      return {
        ...state,
        greeting: payload
      };
    }
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async getGreetingAsync(payload, state) {
      const loadedGreeting = await new Promise(resolve =>
        setTimeout(() => resolve(`Greetings to ${state.user.name}!`), payload)
      );
      dispatch.user.updateGreeting(loadedGreeting);
    }
  })
};
