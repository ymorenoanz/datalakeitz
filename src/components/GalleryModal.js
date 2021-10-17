import React, { Component } from 'react'

export default class GalleryModal extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = 
        {
            src: ''
        }
    }

    componentWillReceiveProps(nextProps)
    {
        if(nextProps.src !== '') 
        {
            this.setState({
                src: nextProps.src
            })
        }
    }

    render() {
        if(this.props.isOpen === false) 
        {
            return null
        }

        return(
            <div className="modal-overlay" >
                <div className="modal-body" >
                    <a className="modal-close" href='#' onClick={this.props.closeModal} >
                        <span className='fa fa-times' />
                    </a>
                    <img src={this.state.src} alt="" />
                </div>
                <a className='card-arrow-left' href='#' onClick={() => this.changeImage(this.props.imgUrls[this.props.imgUrls.indexOf(this.state.src)-1])} >
                    <span className='fa fa-arrow-left' />
                </a>

                <a className='card-arrow-right' href='#' onClick={() => this.changeImage(this.props.imgUrls[this.props.imgUrls.indexOf(this.state.src)+1])} >
                    <span className='fa fa-arrow-right' />
                </a>
            </div>
        )
    }

    changeImage = (url) => 
    {
        if(url !== undefined){
            this.setState({
                src: url
            })
        }
    }
}