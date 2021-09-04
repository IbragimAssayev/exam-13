import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deletePhoto, getOneGallery, getRating} from "../store/dataActions";
import ImageViewer from 'react-simple-image-viewer';

const FullPlaceInfo = (props) => {

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

    const toggleDelete = (id) => {
        dispatch(deletePhoto(id));
    }

    const photos = useSelector(state => state.data.photos);

    const user = useSelector(state => state.user.user);

    const dispatch = useDispatch();

    useEffect(async () => {
        await dispatch(getOneGallery(props.match.params.id));
        await dispatch(getRating(props.match.params.id));
        console.log(props.match.params.id)
    }, [dispatch, props.match.params.id]);

    let allPhotoLinks;
    let allPhotoLinksFull;
    let isItYourGallery;

    if (photos.data === undefined) {
        allPhotoLinks = []
    } else {
        allPhotoLinksFull = Object.keys(photos.data).map(id => { return (`http://localhost:8000/uploads/` + photos.data[id].image) });
        allPhotoLinks = Object.keys(photos.data).map(id => { return photos.data[id] });
        if (user === null) {
            isItYourGallery = false;
        } else {
            isItYourGallery = ((props.match.params.id) === user.username);
        }
    }

    return (
        <>
            {isItYourGallery ? <h1 className="container--wrap" ><Link style={{ color: 'white' }} to="/addPhoto">Add Photo</Link></h1> : null}
            <div className="container--wrap" style={{ marginTop: 20 }}>
                {isItYourGallery ? <h1 style={{ color: 'white' }}>Your Gallery</h1> : <h1 style={{ color: 'white' }}>{(props.match.params.id).charAt(0).toUpperCase() + (props.match.params.id).slice(1)}'s Gallery</h1>}
                <div className="div">
                    {allPhotoLinks.map((src, index) => (
                        <div key={index}>
                            <img
                                src={(`http://localhost:8000/uploads/` + src.image)}
                                onClick={() => openImageViewer(index)}
                                width="220"
                                height="200"
                                key={index}
                                style={{ margin: '5px' }}
                                alt={`IMG_${index}`} />
                            <h2 style={{ color: 'white', margin: 0 }}>{src.title}</h2>
                            {isItYourGallery ? <button onClick={() => toggleDelete(src._id)}>Delete</button> : null}
                        </div>
                    ))}
                    {isViewerOpen && (
                        <ImageViewer
                            src={allPhotoLinksFull}
                            currentIndex={currentImage}
                            onClose={closeImageViewer}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default FullPlaceInfo;