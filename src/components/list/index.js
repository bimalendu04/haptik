import React from 'react';
import './List.css';
import _ from 'lodash';

function List(props) {

    const filteredList = React.useMemo(() => {
        if (props.state.isSort) {
            return _.cloneDeep(props.state.friendList).sort((x, y) => {
                if (props.state.isSort) {
                    return (x.isFav === y.isFav) ? 0 : x.isFav ? -1 : 1;
                }
                return 0;
            })
        }
        return _.cloneDeep(props.state.friendList);
    }, [props.state]);

    return <div className="mainListContainer">
        {
            filteredList.map((friends) => {
                if (friends.name.toLowerCase().includes(props.state.searchedText.toLowerCase())) {
                    return <div className="list" key={friends.id}>
                        <div className="nameContainer">
                            <div>{friends.name}</div>
                            <div className="subText">is your friend</div>
                        </div>
                        <div className="actionsContainer">
                            <button className={`${friends.isFav ? 'active' : ''}`} onClick={() => props.toggleIsFav(friends.id)}>Star</button>
                            <button onClick={() => props.deleteFriend(friends.id)}>Delete</button>
                        </div>
                    </div>
                }
            }).filter(Boolean)
        }
    </div>
}

export default React.memo(List);