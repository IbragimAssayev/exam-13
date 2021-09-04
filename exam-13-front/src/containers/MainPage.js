import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPlaces} from "../store/dataActions";
import ImageViewer from 'react-simple-image-viewer';
import { Link } from "react-router-dom";


const MainPage = () => {

    const [currentImage, setCurrentImage] = useState(0);

    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const places = useSelector(state => state.data.places);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaces());
    }, [dispatch]);

    let allPlacesLinks;
    let allPlacesLinksFull;

    if (places.data === undefined) {
        allPlacesLinks = [];
    } else {
        allPlacesLinksFull = Object.keys(places.data).map(id => { return (`http://localhost:8000/uploads/` + places.data[id].image) });
        allPlacesLinks = Object.keys(places.data).map(id => { return places.data[id] });
    }

    return (
        <div className="container--wrap" style={{marginTop:20}}>
            <div className="div">
                {allPlacesLinks.map(id=>{
                      return  <div>
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