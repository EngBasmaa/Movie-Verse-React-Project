import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPeople,
  getPersonById,
  addPerson,
  editPerson,
  deletePerson,
  searchPeople,
} from "./peopleApi";

// Async thunks
export const getAllPeopleAction = createAsyncThunk(
  "people/getAllPeople",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllPeople();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPersonByIdAction = createAsyncThunk(
  "people/getPersonById",
  async (personId, { rejectWithValue }) => {
    try {
      const response = await getPersonById(personId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addPersonAction = createAsyncThunk(
  "people/addPerson",
  async (person, { rejectWithValue }) => {
    try {
      const response = await addPerson(person);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPersonAction = createAsyncThunk(
  "people/editPerson",
  async ({ id, formValues }, { rejectWithValue }) => {
    try {
      const response = await editPerson(id, formValues);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePersonAction = createAsyncThunk(
  "people/deletePerson",
  async (personId, { rejectWithValue }) => {
    try {
      await deletePerson(personId);
      return personId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchPeopleAction = createAsyncThunk(
  "people/searchPeople",
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchPeople(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  people: [],
  selectedPerson: null,
  isLoading: false,
  errors: null,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople: (state, action) => {
      state.people = action.payload;
    },
    setSelectedPerson: (state, action) => {
      state.selectedPerson = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get all people
    builder.addCase(getAllPeopleAction.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(getAllPeopleAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.people = action.payload;
    });
    builder.addCase(getAllPeopleAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });

    // Get person by ID
    builder.addCase(getPersonByIdAction.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(getPersonByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedPerson = action.payload;
    });
    builder.addCase(getPersonByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });

    // Add person
    builder.addCase(addPersonAction.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(addPersonAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.people.push(action.payload);
    });
    builder.addCase(addPersonAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });

    // Edit person
    builder.addCase(editPersonAction.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(editPersonAction.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.people.findIndex(
        (person) => person.id === action.payload.id
      );
      if (index !== -1) {
        state.people[index] = action.payload;
      }
    });
    builder.addCase(editPersonAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });

    // Delete person
    builder.addCase(deletePersonAction.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(deletePersonAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.people = state.people.filter(
        (person) => person.id !== action.payload
      );
    });
    builder.addCase(deletePersonAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });

    // Search people
    builder.addCase(searchPeopleAction.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(searchPeopleAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.people = action.payload;
    });
    builder.addCase(searchPeopleAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const { setPeople, setSelectedPerson, setLoading, setErrors } =
  peopleSlice.actions;

export const peopleReducer = peopleSlice.reducer;
