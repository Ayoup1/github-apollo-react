import React,{Component} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// const  Navigation= () => import ('./components/Navbars');
import Navigation from './components/Navbars';
import PageHeader from './components/PageHeader';
import Layout from './components/layout';

class App extends Component {
  state = {
    queryString: 'ayoup',
  };
  onQueryString = value => {
    this.setState({ queryString: value });
  };
  render() {
    const { queryString } = this.state;

    return (
    <Router>
      <div className="App">
        <Navigation/>
        <PageHeader
          queryString={queryString}
          onQueryString={this.onQueryString}/>
        <Layout queryString={queryString}/>
      </div>
    </Router>
    )
  }

}

export default App;
