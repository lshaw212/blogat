import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import qs from "qs";

const defaultState = {
  filter: ""
}

class SearchBox extends Component{

  updateQueryParam = obj => {
    this.props.history.push({
      search: `?${qs.stringify({
        ...qs.parse(this.props.location.search.replace("?", "")),
        ...obj
      })}`
    })
  }

  render(){

    const queryParamState = {
      ...defaultState,
      ...qs.parse(this.props.location.search.replace("?", ""))
    }
    return(
      <div>
        <input type="text" value={queryParamState.filter} onChange={e => this.updateQueryParam({ filter: e.target.value })}/>
      </div>
    )
  }
  
}

export default withRouter(SearchBox);