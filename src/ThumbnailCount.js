import React from 'react';
import styled from 'styled-components/macro';
import _ from 'lodash';

export default function ThumbnailImages({ imagesArr, thumbnailNumber, handleImageClick, style, thumbnailStyle, imgStyle, imgRadius, className, ...props }) {
    
    const Wrap = styled('div')`
        display: flex;
        justify-content: space-between;
    `;

    const ImgWrap = styled('div')`
        width: ${() => getThumbnailWidth(thumbnailNumber)};
        position: relative;
        overflow: hidden;
        `;

    const imgStyleInner = {
        objectFit: 'cover', 
        width: '100%', 
        height: '100%',
        cursor: 'pointer',
    }

    const renderObj = arrangeMultipleImages(imagesArr, thumbnailNumber);

    const fillThumbnail = thumbnailNumber - renderObj.shownImage.length;

    return (
        <Wrap className={className} style={style} {...props}>
            {_.map(renderObj.shownImage, (imgUrl, i) => (
                <ImgWrap key={i} style={thumbnailStyle}>
                    {
                        showExtraImagesFrame(renderObj.extraImage, thumbnailNumber, i)  && (
                            <ImageFrame number={renderObj.extraImage.length} onClick={() => handleImageClick(imgUrl)}/> )
                    }
                    <img
                        onClick={() => {handleImageClick(imgUrl)}}
                        style={{...imgStyleInner, ...imgStyle,}}
                        src={imgUrl}
                        alt="too good"/>
                </ImgWrap>
            ))}
            {_.map(_.range(fillThumbnail), (item,i) => <ImgWrap key={i} style={thumbnailStyle} />)}
        </Wrap>
    );
}

ThumbnailImages.defaultProps = {
    className: '',
    imgRadius: 0,
};

var ImageFrame = ({number, onClick}) => {

    const ImageFrameWrap = styled('div')`
        position: absolute;
        background-color: rgba(0, 0, 0, 0.4);
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;        
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

    `;

    return  <ImageFrameWrap onClick={onClick}>
        <span>+ {number + 1}</span>
    </ImageFrameWrap>

}

var arrangeMultipleImages = (images, imagesThumbnailNumber) => {
    return {
        shownImage : _.slice(images, 0, imagesThumbnailNumber),
        extraImage : _.slice(images, imagesThumbnailNumber),
    }
}

var getThumbnailWidth = number => {
    const ratio = 100 / (number + 1);
    return ratio + "%";
}

var showExtraImagesFrame = (extraImage, thumbnailNumber, mapIndex) => {
    return (extraImage.length > 0) && (mapIndex === (thumbnailNumber - 1))
}
    