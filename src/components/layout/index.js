import React from 'react';
import { Query } from 'react-apollo';
import { GET_INFO_OF_USER } from './queries';

import './style.scss';

export default class mainLayout extends React.Component{
    render(){
        let repos ={totalCount:0,nodes:[]}
        let personalInfo ={}
        return(
            <Query query={GET_INFO_OF_USER} variables={{queryString:this.props.queryString}}>
                {({ data ,loading, error, fetchMore }) => {
                 
                    if (error) {
                        return (
                            <div className="ErrorMessage">
                                <small>{error.toString()}</small>
                            </div>
                        );
                    }else{
                       const {search} =data
                       if (search && search.edges && search.edges.length>0) {
                            // console.log("search__",search.edges.find(e => !!e))
                            const FirstElem=search.edges.find(e => !!e) //first object in Array
                            repos = FirstElem.node.repositories
                            personalInfo = FirstElem.node
            
                    }
                    return (
                        <div className="bossWrapp">
                            
                            {loading && repos && repos.nodes.length>0?  <Profile loading={loading} details={personalInfo}/>:<Profile details={personalInfo}/>}
                            {loading && repos && repos.nodes.length>0?  <RepositoryList loading={loading} repositories={repos.nodes} totalCount={repos.totalCount} /> :<RepositoryList repositories={repos.nodes} totalCount={repos.totalCount} />}
                        </div>
                    );
                    } 
                        
                }}
            </Query>

        )
    }
}


const RepositoryList = ({ loading,repositories,totalCount }) => (
        <div className="stepDetails">
            <div className="stepHeader">
                <div className="stepCount active">{totalCount}</div>
                <h3><p>Public Repository</p> </h3>
            </div>
            {loading?
                <div className="plans">
                  <div className="plan">
                    <div className="planDesc">Loading...</div>
                    </div>
                </div>
                :
                <div className="plans">
                  {repositories.map((item,index) => {
                  return (
  
                          <div key={index}  className="plan">
                              <a  href={item.url} aria-label="plan" ></a>
                              <div className="planDesc">
                                  <h3>{item.name}</h3>
                                  <p>{item.description}</p>
                              </div>
                              <div className="repoDeatils">
                                  <span>
                                      {item.primaryLanguage?<sub>{item.primaryLanguage.name}</sub>:''}
                                      <sup>
                                          <svg aria-label="star" viewBox="0 0 14 16" version="1.1" width="14" height="16" role="img"><path fillRule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                                      </sup>
                                      {item.stargazers.totalCount}
                                  </span>
                              </div>
                          </div>
                  
                      );
                  })}
              </div>
            }
    
        </div>
  );
  

  const Profile = ({ details,loading }) => (
    <div className="details stuff">
    <div className="detHeader">
    <div>
        <h3 className="detTitle">
            {details.name}
            {/* <span>Pro</span> */}
        </h3>
        <p>{details.login}</p>
    </div>
    </div>

    <div className="detDetails">
    <ul className="benefits">
        {loading?
            <div className="rounded-circle" ></div>
            :
            <img alt={details.name+' avatar'} className="rounded-circle" src={details.avatarUrl}/>
        }
    </ul>
    <ul className="features">
        <h5 className="title"><span >followers:</span> {details.followers && details.followers.totalCount?details.followers.totalCount:0} | <span>following:</span> {details.following && details.following.totalCount?details.following.totalCount:0} </h5>
    </ul>
    </div>
    <div className="detProfile">
            <p>{details.bio}</p>
            <a href={details.url}>View Profile</a>
    </div>
</div>
);