import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.socket = io('/')
    //console.log(this.socket);
    this.socket.on('readingArchive', datos =>{
      //console.log(datos);
      this.setState({
        data: [datos, ...this.state.data]
      })
    })
  }

  render() {
     const {data} = this.state
    return(
      <div>
        
        <table>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr>
              <td>{data[0]}</td>
            </tr> 
          </tbody>
        </table>  
        
       
  
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('root'));
