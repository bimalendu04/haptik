import React from 'react';
import _ from 'lodash';
import { ActionType } from "./action";
import { reducer } from './reducer';
import List from '../list';
import SearchBar from '../searchBar';

import './Main.css'

function Main(params) {

    const [state, dispatch] = React.useReducer(reducer, {
        searchedText: '',
        friendList: [],
        name: '',
        isSort: false
    });

    const setSearchedText = React.useCallback((value) => {
        dispatch({
            type: ActionType.SET_SEARCH_TEXT,
            payload: value
        });
    }, []);

    const addFriend = React.useCallback((e) => {
        if (e.key === 'Enter') {
            dispatch({
                type: ActionType.ADD_FRIEND,
                payload: { name: e.target.value, isFav: false, id: _.uniqueId('id-') }
            });
        }
    }, []);

    const handleNameChange = React.useCallback((e) => {
        dispatch({
            type: ActionType.SET_NAME,
            payload: e.target.value
        });
    }, []);

    const toggleIsFav = React.useCallback((id) => {
        dispatch({
            type: ActionType.TOGGLE_FAV,
            payload: id
        });
    }, []);

    const toggleSort = React.useCallback(() => {
        dispatch({
            type: ActionType.TOGGLE_SORT,
            payload: null
        });
    }, []);

    const deleteFriend = React.useCallback((id) => {
        dispatch({
            type: ActionType.DELETE,
            payload: id
        });
    }, []);

    React.useEffect(() => {
        dispatch({
            type: ActionType.SET_NAME,
            payload: ''
        });
    }, [state.friendList]);

    return <div className='mainContainer' >
        <div className="heading">Friends List</div>
        <input className="nameInput" placeholder="Enter your friend's name" type="text" value={state.name} onChange={handleNameChange} onKeyDown={addFriend} />
        <SearchBar
            setSearchedText={(value) => setSearchedText(value)}
            isSort={state.isSort}
            toggleSort={toggleSort}
        />
        <List
            state={state}
            toggleIsFav={(id) => toggleIsFav(id)}
            deleteFriend={(id) => deleteFriend(id)}
        />
    </div>
}

export default React.memo(Main);