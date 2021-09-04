import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPhotos } from "../store/dataActions";
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

    const photos = useSelector(state => state.data.photos);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPhotos());
    }, [dispatch]);

    let allPhotoLinks;

    let allPhotoLinksFull;

    if (photos.data === undefined) {
        allPhotoLinks = []
    } else {
        allPhotoLinksFull = Object.keys(photos.data).map(id => { return (`http://localhost:8000/uploads/` + photos.data[id].image) })
        allPhotoLinks = Object.keys(photos.data).map(id => { return photos.data[id] })
    }

    return (
        <div className="container--wrap" style={{marginTop:20}}>
            <div className="div">
                {allPhotoLinks.map(id=>{
                      return  <div>
                          <div>
                              <img width={200} src={`http://localhost:8000/uploads/${id.image}`}/>
                          </div>
                          <Link to={`place/${id._id}`} >{id._id}</Link>
                      </div>
                })}
            </div>
        </div>
    )
}

export default MainPage;