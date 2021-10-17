import React, { Component } from 'react'
import GalleryImage from "./GalleryImage.js"
import GalleryModal from "./GalleryModal.js"

export default class Gallery extends Component
{
    constructor(props) 
    {
        super(props)

        this.state = 
        {
            showModal: false,
            url: ''
        }
    }

    render() 
    {
        return(
            <div refs="gallery-container" className="container-fluid gallery-container" >
                <div className="row" >
                    {
                        this.props.imgUrls.map((url, index) => {
                            return( 
                                <div className="col-sm-6 col-md-3 col-xl-2" >
                                    <div className="gallery-card" >
                                        <GalleryImage className="gallery-thumbnail" src={url} alt={'Img number' + (index + 1)} key={index} />
                                        <span className="card-icon-open fa fa-expand" onClick={e => this.openModal(url)} />
                                    </div>      
                                </div>
                            )           
                        })
                    }
                </div>
                <GalleryModal isOpen={this.state.showModal} src={this.state.url} closeModal={this.closeModal} imgUrls={this.props.imgUrls} />
            </div>
        )
    }

    openModal = (url) => {
        this.setState({
            showModal: true,
            url: url
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            url: ''
        })
    }
}