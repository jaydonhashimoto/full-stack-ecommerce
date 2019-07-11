import React, { Component } from 'react'

export class ViewEBook extends Component {
    state = {
        ebook: this.props.location.state.ebook,
    }
    render() {
        const { title, id, description, author, price, img, date_added } = this.state.ebook;
        return (
            <div>
                {title}
                <img src={'/images/' + img} />
            </div>
        )
    }
}

export default ViewEBook
