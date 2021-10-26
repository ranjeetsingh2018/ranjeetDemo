import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor(props) {
    super(props);
    this.state = { currentCount: 0, data: {}, page: 1, candidateList:[] };
    this.loadMore = this.loadMore.bind(this);
  }

  // incrementCounter() {
  //   this.setState({
  //     currentCount: this.state.currentCount + 1
  //   });
  // }

  componentDidMount(){
    // fetch('https://randomuser.me/api')
    //     .then(response => response.json())
    //     .then(data => this.setState({ data: data.results }));

    this.getMore(this.state.page)
  }

  getMore(page){
    var candidates = [...this.state.candidateList]
    fetch(`https://randomuser.me/api?page=${page}`)
        .then(response => response.json())
        .then(data => 
          {
          candidates.push(data.results[0])
          this.setState({ candidateList: candidates })
        }
        )
  }

  loadMore(){
    this.setState({page: this.state.page+1})
    this.getMore(this.state.page)
  }

  render() {
    var cL = this.state.candidateList
    // var completeData = this.state.data && JSON.stringify(this.state.data) || ''
    
    // var candidate = (this.state.data && this.state.data[0]) || {}
    // var candidatePicture = candidate.picture
    // var candidateName = candidate.name
    return (
      <div>
        {/* <div>{completeData}</div>
        {candidate && candidate.name &&
          <div>
        <div>Name : {candidateName.title} {candidateName.first} {candidateName.last}</div>
        <img src={candidatePicture.large}></img>
        </div>
        
        }  */}

        {
          this.state.candidateList &&  this.state.candidateList.length > 0 &&
          this.state.candidateList.map(cl =>{
            return <div>
              <div>Name : {cl.name.title} {cl.name.first} {cl.name.last}</div>
              <img src={cl.picture.large}></img>
            </div>
          })
        }

        <button className="btn btn-primary" onClick={this.loadMore}>Load more</button>
      </div>
    );
  }
}
