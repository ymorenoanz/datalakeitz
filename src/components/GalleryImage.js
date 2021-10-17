import React, { Component } from 'react'

export default class GalleryImage extends Component 
{
    render() 
    {
        return(
            <img className={this.props.className} alt={this.props.alt} src={this.props.src}  />
        )
    }
}