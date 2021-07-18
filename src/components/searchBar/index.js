import React from 'react';
import './SearchBar.css';

function SearchBar(props) {

    return <div className="mainSearchBarContainer">
        <input className="searchInput" placeholder="Search" type="text" value={props.searchedText} onChange={(e) => props.setSearchedText(e.target.value)} />
        <div className={`sortBtn ${props.isSort ? 'active' : ''}`} onClick={() => props.toggleSort()}>Sort</div>
    </div>
}

export default React.memo(SearchBar);