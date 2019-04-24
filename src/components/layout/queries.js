import gql from 'graphql-tag';

export const GET_INFO_OF_USER = gql`
query($queryString:String!){
    search(query: $queryString, type: USER, first: 10) {
      userCount
      edges{
        node{
           ... on User {
                id
                login
                bio
                avatarUrl
                name
                url
                isDeveloperProgramMember
                followers(first: 1) {
                totalCount
                }
                following(first: 1) {
                totalCount
                }
               repositories (first: 10,ownerAffiliations:OWNER,privacy:PUBLIC) {
                        totalCount
                        nodes {
                          ... on Repository {
                            id
                            description
                            stargazers{
                                totalCount
                            }
                            primaryLanguage{
                                name
                            }
                            createdAt
                            name
                            url
                          }
                        }
                      }
                  }
          __typename
        }
      }
  
    }
  }
  
`;