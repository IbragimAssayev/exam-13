import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPlaces} from "../store/dataActions";
import { Link } from "react-router-dom";


const MainPage = () => {

    const places = useSelector(state => state.data.places);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaces());
    }, [dispatch]);

    let allPlacesLinks;

    if (places.data === undefined) {
        allPlacesLinks = [];
    } else {
        allPlacesLinks = Object.keys(places.data).map(id => { return places.data[id] });
    }

    return (
        <div className="container--wrap" style={{marginTop:20}}>
            <div>
                {allPlacesLinks.map(id=>{
                  return <div id={id._id}>
                          <div>
                              <img width={200} src={`http://localhost:8000/uploads/${id.image}`}/>
                          </div>
                          <Link style={{color:'white'}} to={`place/${id._id}`} >{id.title}</Link>
                      </div>
                })}
            </div>
        </div>
    )
}

export default MainPage;