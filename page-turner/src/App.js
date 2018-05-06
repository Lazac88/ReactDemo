import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.getPage = this.getPage.bind(this);
    this.renderAllPages = this.renderAllPages.bind(this);
    this.nextPageAnimation = this.nextPageAnimation.bind(this);
    this.lastPageAnimation = this.lastPageAnimation.bind(this);
  }

  state= { currentLeftIndex: 1, totalPages: 4 }

  render() {

    

    return (
      <div className="App">
          <button onClick={this.lastPageAnimation}>-</button>
          <button onClick={this.nextPageAnimation}>+</button>
          <div className="centerDiv">
            { this.renderAllPages() }
          </div>
      </div>
    );
  }

  nextPageAnimation()
  {
    console.log("Next Page");
    var rightTop = document.getElementsByClassName('rightTop');
    var leftTop = document.getElementsByClassName('leftTop');
    var rightBottom = document.getElementsByClassName('rightBottom');

    //Check that the current page is not the second to last page
    if (this.state.currentLeftIndex + 1 !== this.state.totalPages)
    {
      //Add animation class to top right page which will shift it across the page
      rightTop[0].classList.add("forwardTopPage");

      //Add animation to compress top left page
      leftTop[0].classList.add("compress");

      //Add animation to expand right bottom page
      rightBottom[0].classList.add("expand");

      //Add one to the currentLeft index
      var nextPage = this.state.currentLeftIndex + 1;
      
      setTimeout(function() { 
        //Remove the animation css after it has completed
        rightTop[0].classList.remove("forwardTopPage");
        leftTop[0].classList.remove("compress");
        rightBottom[0].classList.remove("expand");
        this.setState({currentLeftIndex: nextPage}); 
      }.bind(this), 1000);
      
    }   
  }

  lastPageAnimation()
  {
    console.log("Last Page");
    var leftTop = document.getElementsByClassName('leftTop');
    var leftBottom = document.getElementsByClassName('leftBottom');
    var rightTop = document.getElementsByClassName('rightTop');

    //Check that the current page is not the first page
    if(this.state.currentLeftIndex !== 1)
    {
      //Add animation to shift left page across
      leftTop[0].classList.add("reverseTopPage");
      //Add animation to expand bottom left page
      leftBottom[0].classList.add("expand");
      //Add animation to compress top right page
      rightTop[0].classList.add("compress");

      //Remove 1 from currentLeft index
      var lastPage = this.state.currentLeftIndex - 1;

      setTimeout(function() {
        //Remove animations after transition
        leftTop[0].classList.remove("reverseTopPage");
        leftBottom[0].classList.remove("expand");
        rightTop[0].classList.remove("compress");
        this.setState({currentLeftIndex: lastPage}); 
      }.bind(this), 1000);
    }    
  }

  renderAllPages()
  {
    var leftBottomIndex = this.state.currentLeftIndex - 1;
    var leftTopIndex = this.state.currentLeftIndex;
    var rightTopIndex = this.state.currentLeftIndex + 1;
    var rightBottomIndex = this.state.currentLeftIndex + 2;

    return (
          <div>
            <div className="page leftBottom">{ this.getPage(leftBottomIndex) }</div>
            <div className="page leftTop">{ this.getPage(leftTopIndex) }</div>
            <div className="page rightTop">{ this.getPage(rightTopIndex) }</div>
            <div className="page rightBottom">{ this.getPage(rightBottomIndex) }</div>
          </div>
          )  
  }

  getPage(pageId)
  {
    switch(pageId)
    {
      case 1:
        //Page 0
        return(
          <div className="whiteBackground"><h1>Page0</h1></div>
        );        
      case 2:
        //Page 1
        return(
          <div className="whiteBackground"><h1>Page1</h1></div>
        );        
      case 3:
        //Page 2
        return(
          <div className="whiteBackground"><h1>Page2</h1></div>
        );        
      case 4:
        //Page 3
        return(
          <div className="whiteBackground"><h1>Page3</h1></div>
        );
      default: return null;        
    }
  }
}

export default App;
