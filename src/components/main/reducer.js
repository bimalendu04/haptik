import _ from "lodash";

import { ActionType } from "./action";

export function reducer(state, action) {
    switch (action.type) {
        case ActionType.SET_NAME:
            return {
                ...state, ...{
                    name: action.payload
                }
            };
        case ActionType.SET_SEARCH_TEXT:
            return {
                ...state,
                ...{ searchedText: action.payload }
            };

        case ActionType.ADD_FRIEND:
            return {
                ...state,
                friendList: [...state.friendList, action.payload]
            };
        case ActionType.TOGGLE_FAV: {
            let friendList = _.cloneDeep(state.friendList);
            friendList[_.findIndex(friendList, { id: action.payload })].isFav = !(friendList[_.findIndex(friendList, { id: action.payload })].isFav)
            return {
                ...state,
                ...{ friendList }
            };
        }

        case ActionType.DELETE: {
            let friendList = _.cloneDeep(state.friendList);
            let indexToDelete = _.findIndex(friendList, { id: action.payload });
            friendList.splice(indexToDelete, 1);

            return {
                ...state,
                ...{ friendList }
            };
        }
        
        case ActionType.TOGGLE_SORT: {

            return {
                ...state,
                ...{ isSort: !state.isSort }
            };
        }
        default:
            return state;
    }
}