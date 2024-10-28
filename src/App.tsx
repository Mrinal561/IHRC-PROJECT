import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Theme from '@/components/template/Theme'
import Layout from '@/components/layouts'
import mockServer from './mock'
import appConfig from '@/configs/app.config'
import './locales'
import { useEffect } from 'react'

import { useAppDispatch } from '@/store'
import { fetchAuthUser, setIsAuthenticated } from './store/slices/login'

const environment = process.env.NODE_ENV
const dispatch = useAppDispatch();
/**
 * Set enableMock(Default false) to true at configs/app.config.js
 * If you wish to enable mock api
 */
// if (environment !== 'production' && appConfig.enableMock) {
//     mockServer({ environment })
// }
// useEffect(()=> {
//     // appInitial();
// },[])

// const appInitial = async () => {
//     dispatch(fetchAuthUser()).then(({ payload }) => {
//         if (payload) {
//             dispatch(setIsAuthenticated(true))
//         } else {
//             dispatch(setIsAuthenticated(false))
//         }
//     })}

    
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Theme>
                        <Layout />
                    </Theme>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default App
