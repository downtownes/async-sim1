import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CreateItem.css';


export default class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            newName: '',
            newPrice: '',
            addedItem: []
        }
        this.updateName = this.updateName.bind(this);
        this.updatePrice = this.updatePrice.bind(this);
    }

    updateName(name) {
        this.setState({
            newName: name
        })
    }

    updatePrice(price) {
        this.setState({
            newPrice: price
        })
    }

    postToBin() {
        let binID = this.state.id.split('');

        let newItem = {
                        shelf: binID[0], 
                        bin: binID[1], 
                        prod_name: this.state.newName, 
                        price: this.state.newPrice, 
                        picture: 'http://lorempixel.com/200/200/business/'
                    }
        axios.post(`/api/bin/${binID[0]}${binID[1]}`, newItem).then(res => {
            console.log(res.data)
            this.setState({
                addedItem: res.data
            })
            this.props.history.push(`/bins/${this.state.id[0]}`)
        })
    }


    render() {
        return (
            <div className="create-item">
                <div className="bins-nav-cont">
                    <div className="icon-div-product">
                        <Link to="/"><div className="create-page-logo-cont">
                            <img className="bin-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABECAYAAAA4E5OyAAAAAXNSR0IArs4c6QAABKJJREFUeAHVnLtPFFEUxncNARsfnRU24INKpaKg0UILNBT8JVQkVms0hlhb+C/QGBIwGE20UwsjHY8EQ4JGLEgELYBEXb9vmQvj7MzO3Jlz7r1zkm/v7My995zz23nceew0G46s3W5fgatRaCTSEMpz0NlIKBo/I+2h/AytQivQcrPZXEepbk0tDwBwGn3fg+5At6FBqIp9QeNX0EtoEYAOqnTmrC1A3ICeQj8gLWPf9HHdWWK2jhDcGPQacm30OWYbr1p9BHMVeuGaQoq/Rcailmhex3DeB92HDqBQjLEwpr68+EWXw+FlaBkK1T4hMB7V9A2OJqDdUEnE4mKME6pE4GAG+hNzGvokY51RgYKOH4aefY/4HolCgaPZHs7qsuhxESinilRCnaL1Cnbnpdo1/HJyRx909qQuq0JKnBwnDYj/DDWFogPD0K0ZFF0YNYPiBkZNoLiFETgUPzACheIXRmBQwoARCJSwYHiGEiYMT1DChuEYSj1gOIKiCwPD8ZsmEclSaZivAgOxXurkjolB6BBSudyGfiXPkrVgjCDO79DFBj4mIVroULRhkMEkgTzgVGShQnEBgwhaBDIfwTBFaFBcwWD+8wTyzpCIlaFAcQmD6b8nkJUYiPikbyiuYTD3VQLZjlNITPuC4gMGU98mkP0EhORX11B8wWDe+wTChPPMFRSfMMjgkEB28mhEy7Wh+IbBNHcIZJNTBU0TitxNpOj8AzmZEWjB9NqbvCO3a3H+0o+6z9G7+DAfz4z9togjtyphoNJb6EJu5ZMKuwSycfK90JQalELeC1QqCYM9bxBImccdg4VSAQaBrBHIGqdKWHBQKsIggnXuVIehKqa2o7X5kZCA7Q40Lefhjk8s2UpbajHPKxTEKQFjizC4ydDeHBWlP71tPoSBqG2PJmmJdhgYIItpNSznOYciCIOpLhzni44HID4uLWFONh8EKrGZmHyZe+eBms4agkHRIejMHROqNqG+phAGQpTYTEymcxED873Bo82owSVUqqwpiI1HxW9CMZpu+LeVbsPSJVNDqBSFgpgI46tQbKabpW4S0RzUGDe1BEsRKIhHAwbTHM8EwgWoIL2W0GklKGivBSN77TCUIuca/3AoBUURBnM8Gpma5LNKVGxBGmYFBQForRnMrZWVf9d8VO6HPrKVghWCAr+aMJgbhwfFDQ2GoD1Iw3pCgUNNGMyJ/wi1NzScgv5CGpYKBY40YTCXKXsSsRboYFqDRtTnf1AwTxMGXU7HUis/iY40/x7SgeIAxmx5AiktHUDpdQcR7iuZLAzDByFx89Hap1TKOKMxY5XZTAyEZAkH3NFqHX0y8io1mzFW24Emk8/6Dkc8JGuNU0pln2jE2ModWrOSzpsPhxy8cUSrMcxHt6WMsTAmu0FXXrI2y+Gch0qNE0J0a2WModi5iU2CZesiGF468AGGPnufwpdNSqIdguOVt2eQ1DVadNVl7Js+0q90VUhE84UqvGjLF6rchW5BEi9U4a0C3iFY6LoGipkSpgYkGRx+TW7ffM8HX2nBFxXw+3noTCQUjV+R+EQCb8LzvjNvtX4AANub8mhmb/8Asov1hwQSlWQAAAAASUVORK5CYII=" />
                        </div></Link>
                        <Link className="shelf-link-back" to={`/bins/${this.state.id[0]}`}><div className="logo-cont-two">
                            <h1 className="bin-nav-title-for-product-page">{`Shelf ${this.state.id[0]}`}</h1>
                        </div></Link>
                        <h1 className="bin-nav-title">{`Add to Bin ${this.state.id[1]}`}</h1>
                    </div>
                </div>
                <div className="position-cont">
                    <div className="main-container">
                        <div className="headers"><h2>Name</h2></div>
                        <div><input className="input-boxes" onChange={ (e) => this.updateName(e.target.value)}/></div>
                        <div className="headers"><h2>Price</h2></div>
                        <div><input className="input-boxes" onChange={ (e) => this.updatePrice(e.target.value)} id="text" placeholder="$0.00" type="text"/></div>
                        <div><button className="inventory-add" onClick={ () => this.postToBin()}>+ Add to Inventory</button></div>
                    </div>
                </div>
            </div>
        )
    }
}