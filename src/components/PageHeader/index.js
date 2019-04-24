import React from 'react';
import './style.scss';
  
export default class Navigation extends React.Component{
    render(){
        return(
            <div className="header">
            <h1>Simple React apollo client example </h1>
            <h2>Search and view users repository</h2>
            <OrganizationSearch
               queryString={this.props.queryString}
               onQueryString={this.props.onQueryString}
              />
            </div>
        )
    }
}

const WAIT_INTERVAL = 1000
const ENTER_KEY = 13

class OrganizationSearch extends React.Component {
    state = {
        value:this.props.queryString
      }
    
      timer = null
    
      handleChange = e => {
        clearTimeout(this.timer)
    
        this.setState({ value: e.target.value })
    
        this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL)
      }
    
      handleKeyDown = e => {
        if (e.keyCode === ENTER_KEY) {
          clearTimeout(this.timer)
          this.triggerChange()
        }
      }
    
      triggerChange = () => {
        const { value } = this.state
        this.props.onQueryString(value);
        // event.preventDefault();
      }

    render() {
      const { ...rest } = this.props
  
      return (
        <div className="Navigation-search">
      <input
        type={rest.type}
        className="search"
        placeholder={rest.placeholder}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
      />
          {/* <form onSubmit={this.onSubmit}>
            <input           
                type="text"
                value={value}
                onChange={this.onChange}>
            </input>
          </form> */}
        </div>
      );
    }
  }