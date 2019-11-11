import React from "react";
import {connect} from "react-redux";
import {getAllAlbums} from "../../redux/albumReducer"
import "./Home.css";

class Home extends React.Component {
    constructor(){
        super();
        this.state = {

        }
    }

    componentDidMount(){
        this.props.getAllAlbums();
    }

    render(){

        let albumDisplay = this.props.albums.map((val, i) => {
            
            return (
                <div className="album" key={i}>
                    <img style={{width: "100px"}} src={val.image_url} alt="album_photo"/>
                    <p>Album: {val.album_name}</p>
                    <p>Artist: {val.artist_name}</p>
                    <p>Price: ${val.price}</p>
                    <button>Add To Cart</button>
                </div>
            )
        })
        return (
            <div className="album_container">
            
            
                <div className="album_display">
                    {albumDisplay}
                </div>
            </div>

                
                
                
        )
    }
}

const mapStateToProps = state => {
    return {
        albums: state.albumReducer.albums
    };
};

export default connect(mapStateToProps, {getAllAlbums})(Home) 