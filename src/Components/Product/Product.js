import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Product.css';


export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: [],
            name: '',
            price: '',
            picture: '',
            //42J
            //42K
            id: this.props.match.params.id.split(''),
            edit: true,
            newName: '',
            editedPrice: '',
            button: false
        }

        //37C
        this.editName = this.editName.bind(this);
        this.editPrice = this.editPrice.bind(this);
        this.saveUpdate = this.saveUpdate.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.saveButton = this.saveButton.bind(this);
    }

    //44E
    componentDidMount() {
        let id = this.props.match.params.id.split('');
        //37D
        //44C
        //44D
        axios.get('/api/bin/' + id[0] + id[1]).then(res => {
            console.log(res.data)
            this.setState({
                name: res.data[0].prod_name,
                price: res.data[0].price,
                picture: res.data[0].picture
            })
        })
    }

    editButton() {
        this.setState({
            edit: false,
            button: true
        })
    }

    saveButton() {
        this.setState({
            edit: true,
            button: false
        })
    }

    editName(name) {
        this.setState({
            name: name
        })
    }

    editPrice(price) {
        this.setState({
            price: price
        })
    }

    saveUpdate() {
        let updatedBin = {
            shelf: this.state.id[0],
            bin: this.state.id[1],
            name: this.state.name,
            price: this.state.price,
            picture: 'http://lorempixel.com/200/200/business/'
        }
        axios.put(`/api/bin/${this.state.id[0]}${this.state.id[1]}`, updatedBin).then(res => {
        })
        //36H
        this.saveButton();
    }

    deleteItem() {
        axios.delete(`/api/bin/${this.state.id[0]}${this.state.id[1]}`).then(res => {
            //36E
            this.props.history.push(`/bins/${this.state.id[0]}`)
        })
    }

    render() {
        console.log(this.state.newName)
        return (
            <div className="product">
                <div className="bins-nav-cont">
                    <div className="icon-div-product">
                        <Link to="/"><div className="logo-cont">
                            <img className="bin-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAABKJJREFUeAHVnLtPFFEUxncNARsfnRU24INKpaKg0UILNBT8JVQkVms0hlhb+C/QGBIwGE20UwsjHY8EQ4JGLEgELYBEXb9vmQvj7MzO3Jlz7r1zkm/v7My995zz23nceew0G46s3W5fgatRaCTSEMpz0NlIKBo/I+2h/AytQivQcrPZXEepbk0tDwBwGn3fg+5At6FBqIp9QeNX0EtoEYAOqnTmrC1A3ICeQj8gLWPf9HHdWWK2jhDcGPQacm30OWYbr1p9BHMVeuGaQoq/Rcailmhex3DeB92HDqBQjLEwpr68+EWXw+FlaBkK1T4hMB7V9A2OJqDdUEnE4mKME6pE4GAG+hNzGvokY51RgYKOH4aefY/4HolCgaPZHs7qsuhxESinilRCnaL1Cnbnpdo1/HJyRx909qQuq0JKnBwnDYj/DDWFogPD0K0ZFF0YNYPiBkZNoLiFETgUPzACheIXRmBQwoARCJSwYHiGEiYMT1DChuEYSj1gOIKiCwPD8ZsmEclSaZivAgOxXurkjolB6BBSudyGfiXPkrVgjCDO79DFBj4mIVroULRhkMEkgTzgVGShQnEBgwhaBDIfwTBFaFBcwWD+8wTyzpCIlaFAcQmD6b8nkJUYiPikbyiuYTD3VQLZjlNITPuC4gMGU98mkP0EhORX11B8wWDe+wTChPPMFRSfMMjgkEB28mhEy7Wh+IbBNHcIZJNTBU0TitxNpOj8AzmZEWjB9NqbvCO3a3H+0o+6z9G7+DAfz4z9togjtyphoNJb6EJu5ZMKuwSycfK90JQalELeC1QqCYM9bxBImccdg4VSAQaBrBHIGqdKWHBQKsIggnXuVIehKqa2o7X5kZCA7Q40Lefhjk8s2UpbajHPKxTEKQFjizC4ydDeHBWlP71tPoSBqG2PJmmJdhgYIItpNSznOYciCIOpLhzni44HID4uLWFONh8EKrGZmHyZe+eBms4agkHRIejMHROqNqG+phAGQpTYTEymcxED873Bo82owSVUqqwpiI1HxW9CMZpu+LeVbsPSJVNDqBSFgpgI46tQbKabpW4S0RzUGDe1BEsRKIhHAwbTHM8EwgWoIL2W0GklKGivBSN77TCUIuca/3AoBUURBnM8Gpma5LNKVGxBGmYFBQForRnMrZWVf9d8VO6HPrKVghWCAr+aMJgbhwfFDQ2GoD1Iw3pCgUNNGMyJ/wi1NzScgv5CGpYKBY40YTCXKXsSsRboYFqDRtTnf1AwTxMGXU7HUis/iY40/x7SgeIAxmx5AiktHUDpdQcR7iuZLAzDByFx89Hap1TKOKMxY5XZTAyEZAkH3NFqHX0y8io1mzFW24Emk8/6Dkc8JGuNU0pln2jE2ModWrOSzpsPhxy8cUSrMcxHt6WMsTAmu0FXXrI2y+Gch0qNE0J0a2WModi5iU2CZesiGF468AGGPnufwpdNSqIdguOVt2eQ1DVadNVl7Js+0q90VUhE84UqvGjLF6rchW5BEi9U4a0C3iFY6LoGipkSpgYkGRx+TW7ffM8HX2nBFxXw+3noTCQUjV+R+EQCb8LzvjNvtX4AANub8mhmb/8Asov1hwQSlWQAAAAASUVORK5CYII=" />
                        </div></Link>
                        <Link className="shelf-link-back" to={`/bins/${this.state.id[0]}`}><div className="logo-cont-two">
                            <h1 className="bin-nav-title-for-product-page">{`Shelf ${this.state.id[0]}`}</h1>
                        </div></Link>
                        <h1 className="bin-nav-title">{`Bin ${this.state.id[1]}`}</h1>
                    </div>
                </div>
    {/* ------------------------------------------NAVIGATION BAR ABOVE THIS LINE------------------------------------ */}
                <div className="product-parent">
                    <div className="image-container">
                        <img className="product-image" src={this.state.picture} />
                    </div>
                    <div className="product-name-price">
                        <h4 className="name-price-headers">Name</h4>
                        <div className="info-containers"><input className="container-text" type="text" value={this.state.name} disabled={this.state.edit} onChange={(e) => this.editName(e.target.value)}></input></div>
                        <h4 className="name-price-headers">Price</h4>
                        <div className="info-containers"><input className="container-text" type="text" value={this.state.price} disabled={this.state.edit} onChange={(e) => this.editPrice(e.target.value)}></input></div>
                        <div className="button-container">
                            <button className="edit-button" hidden={this.state.button}onClick={() => this.editButton()}>Edit</button>
                            <button className="edit-button-two" hidden={this.state.edit} onClick={ () => this.saveUpdate()}>Save</button>

                            {/* 36J */}
                            <button className="delete-button" onClick={ () => this.deleteItem()}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}