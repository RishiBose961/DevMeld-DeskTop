import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

// Define a proper User type instead of unknown
interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

// Helper function to check if electron-store is available
const isElectronStoreAvailable = (): boolean => {
  return typeof window !== 'undefined' && 
         window.electronStore && 
         typeof window.electronStore.get === 'function';
};

// Synchronous function to quickly check localStorage for user data
const getUserFromLocalStorage = (): User | null => {
  try {
    const storedUser = localStorage.getItem("activeAccount");
    if (storedUser) {
      return JSON.parse(storedUser) as User;
    }
    return null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("activeAccount"); // Clear corrupted data
    return null;
  }
};


// Helper function to save user data to both storages
const saveUserToStorage = (user: User): void => {
  try {
    // Always save to localStorage first
    localStorage.setItem("activeAccount", JSON.stringify(user));
    
    // Save to electron-store if available
    if (isElectronStoreAvailable()) {
      try {
        window.electronStore!.set("activeAccount", user);
      } catch (electronError) {
        console.warn("Failed to save to electron-store:", electronError);
      }
    }
  } catch (error) {
    console.error("Error saving user to storage:", error);
  }
};

// Helper function to remove user data from both storages
const removeUserFromStorage = (): void => {
  try {
    // Always remove from localStorage
    localStorage.removeItem("activeAccount");
    
    // Remove from electron-store if available
    if (isElectronStoreAvailable()) {
      try {
        window.electronStore!.delete("activeAccount");
      } catch (electronError) {
        console.warn("Failed to remove from electron-store:", electronError);
      }
    }
  } catch (error) {
    console.error("Error removing user from storage:", error);
  }
};

// Define the auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean; // Track if we've tried to load user data
  error: string | null;
}

// Initialize state with user data from localStorage if available
const getInitialState = (): AuthState => {
  const user = getUserFromLocalStorage();
  return {
    user,
    isAuthenticated: !!user,
    isLoading: false,
    isInitialized: false, // Always start as not initialized
    error: null,
  };
};

const initialState: AuthState = getInitialState();

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
      state.error = null;
      
      // Save to both storages
      saveUserToStorage(action.payload);
    },
    
    logoutUserAction: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isInitialized = true;
      state.error = null;
      
      // Remove from both storages
      removeUserFromStorage();
    },
    
    setUserAction: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isInitialized = true;
      state.error = null;
    },
    
    setLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null; // Clear error when starting to load
      }
    },
    
    setInitializedAction: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
      if (action.payload && !state.user) {
        state.isLoading = false;
      }
    },
    
    setErrorAction: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isInitialized = true;
    },
    
    clearErrorAction: (state) => {
      state.error = null;
    },
  },
});

// Export the actions
export const {
  loginUserAction,
  logoutUserAction,
  setUserAction,
  setLoadingAction,
  setInitializedAction,
  setErrorAction,
  clearErrorAction,
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// Thunk to load user data from storage
export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    // Check localStorage first (synchronous)
    const localUser = getUserFromLocalStorage();
    
    // If we have electron-store available, try to get the most up-to-date data
    if (isElectronStoreAvailable()) {
      try {
        const electronUser = window.electronStore!.get("activeAccount");
        if (electronUser) {
          // Update localStorage with electron-store data and set user
          localStorage.setItem("activeAccount", JSON.stringify(electronUser));
          dispatch(setUserAction(electronUser as User));
          return;
        } else if (localUser) {
          // Electron-store is empty but localStorage has data - sync it
          window.electronStore!.set("activeAccount", localUser);
          dispatch(setUserAction(localUser));
          return;
        }
      } catch (electronError) {
        console.warn("Failed to sync with electron-store:", electronError);
        // Fall back to localStorage data if electron-store fails
        if (localUser) {
          dispatch(setUserAction(localUser));
          return;
        }
      }
    } else if (localUser) {
      // No electron-store available, use localStorage data
      dispatch(setUserAction(localUser));
      return;
    }
    
    // No user data found anywhere
    dispatch(setInitializedAction(true));
  } catch (error) {
    console.error("Error loading user:", error);
    dispatch(setErrorAction(error instanceof Error ? error.message : "Failed to load user"));
  }
};

// Thunk to login user
export const loginUser = (userData: User) => async (dispatch: AppDispatch) => {
  dispatch(setLoadingAction(true));
  dispatch(clearErrorAction());
  
  try {
    // Here you might want to validate the user data or make an API call
    dispatch(loginUserAction(userData));
  } catch (error) {
    console.error("Error logging in user:", error);
    dispatch(setErrorAction(error instanceof Error ? error.message : "Failed to login"));
  }
};

// Thunk to logout user
export const logoutUser = () => async (dispatch: AppDispatch) => {
  try {
    // Here you might want to make an API call to logout
    dispatch(logoutUserAction());
  } catch (error) {
    console.error("Error logging out user:", error);
    dispatch(setErrorAction(error instanceof Error ? error.message : "Failed to logout"));
  }
};