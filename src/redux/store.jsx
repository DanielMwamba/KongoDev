import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST } from "redux-persist";

// Configuration de la persistance Redux
const persistConfig = {
    key: "persist-key",
    storage
};

// Création du rootReducer avec la persistance
import { rootReducer } from "./reducers";
const persistRootReducer = persistReducer(persistConfig, rootReducer);

// Configuration du store 
export const store = configureStore({
    reducer: persistRootReducer,
    middleware: getDefaultMiddleware({
        // Ignorer les actions Redux persist spécifiques
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, REGISTER, PURGE, PAUSE, PERSIST]
        }
    })
});

// Création du store persisté
export const persistedStore = persistStore(store);