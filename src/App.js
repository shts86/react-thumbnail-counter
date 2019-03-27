import React, { Component } from 'react';
import ThumbnailCount from "./ThumbnailCount";
class App extends Component {

  state = {
    imgArr : [
      'images/baby.jpg',
      'images/bled.jpg',
      'images/cat.jpg',
      'images/colored-pencils.jpg',
      'images/happy.jpg',
      'images/night-bird.jpg',
      'images/mother.jpg',
      'images/mountain.jpg',
      'images/night.jpg',
      'images/ship.jpg',
      'images/skyscraper.jpg',
      'images/web.jpg'
    ],
    currentImage: '',

  }

  onThumbnailClick = imgName => {
    this.setState({
      currentImage : imgName
    })
  }


  render() {
    const { imgArr, currentImage, thumbnailSize } = this.state;
    return (
      <div className="App">
        <div className="preview">
          <img src={currentImage} alt={currentImage}/>
        </div>
        <div className="container">
          <ThumbnailCount 
            imagesArr={imgArr}
            thumbnailNumber={ 6 }
            handleImageClick={this.onThumbnailClick}
            // style={{height: thumbnailSize}}
            // thumbnailStyle={{width: thumbnailSize,borderRadius: '4px'}}
          />     
        </div>
      </div>
    );
  }
}

export default App;
