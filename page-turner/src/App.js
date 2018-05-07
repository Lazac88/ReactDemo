import React, { Component } from 'react';
import './App.css';

import leftArrow from './static/leftArrow.svg';
import rightArrow from './static/rightArrow.svg';

class App extends Component {

  constructor(props) {
    super(props);

    this.getPage = this.getPage.bind(this);
    this.renderAllPages = this.renderAllPages.bind(this);
    this.nextPageAnimation = this.nextPageAnimation.bind(this);
    this.lastPageAnimation = this.lastPageAnimation.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.clearTimeout = this.clearTimeout.bind(this);
  }
  timeout = null
  state= { currentLeftIndex: 1, totalPages: 4 }

  scrollJumpDistance = 0;

  componentDidMount() {
    //var doc = document.getElementById('contentInner')
    window.addEventListener('wheel', this.handleScroll);

    var scrollWidth = document.getElementById('footerScroll').offsetWidth;
    //Minus 44 so that the two direction arrows are not counted
    var fullWidth = scrollWidth - 44;
    this.scrollJumpDistance = fullWidth / 4;
    console.log('Scroll Jump Distance = ' + this.scrollJumpDistance);

  }

  componentWillUnmount() {
      //var doc = document.getElementById('contentInner')
      window.removeEventListener('wheel', this.handleScroll);
  }

  handleScroll(event) {
      if (this.timeout === null) {
        var scroll = document.getElementById('footerScrollBar');
        var currentLeft = scroll.offsetLeft;
        var scrollBar = document.getElementById("footerScrollBar");
        //Check scroll direction
        if(event.deltaY === 100)
        {
          this.nextPageAnimation();
          scrollBar.style.left = `${currentLeft + this.scrollJumpDistance}px`;
          console.log(this.scrollJumpDistance);
        }
        else if(event.deltaY === -100)
        {
          this.lastPageAnimation();
          scrollBar.style.left = currentLeft - this.scrollJumpDistance;
          scrollBar.style.left = `${currentLeft - this.scrollJumpDistance}px`;
          console.log(this.scrollJumpDistance);
        }
        //set timeout to allow animation to complete
        this.timeout = setTimeout(this.clearTimeout, 1000);
        console.log(event.deltaY);
      }
  }

  clearTimeout() {
    this.timeout = null;
  }

  render() {    

    return (
      <div className="App">
          <div className="centerDiv">
            { this.renderAllPages() }
          </div>
          <div id="footerScroll">
            <div id="footerLeftArrow"><img id="leftScrollArrow" className="scrollArrow" src={leftArrow} /></div>
            <div id="footerScrollBar"></div>
            <div id="footerRightArrow"><img id="rightScrollArrow" className="scrollArrow" src={rightArrow} /></div>
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
