import * as hemaService from '../services/hemaService';

export default {
    namespace: 'hema',
    state: {

    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },
    effects: {
        *submit({ payload }, { call, put, select }) {
            console.log('submit payload', payload)
            const { data } = yield call(hemaService.submit, payload);
            console.log('data:', data)
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/users') {
                    // dispatch({ type: 'fetch', payload: query });
                }
            });
        },
    },
};