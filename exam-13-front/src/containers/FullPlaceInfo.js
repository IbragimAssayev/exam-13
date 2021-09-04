import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deletePhoto,
    getOneGallery,
    getOnePlace,
    getPhotos,
    getRating,
    postNewPhoto,
    postNewRating
} from "../store/dataActions";
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

    const [rating, setRating] = useState({
        quality:'',
        service:'',
        interior:'',
        comment:''
    })

    const [photo, setPhoto] = useState({
image:null
    })

    const photos = useSelector(state => state.data.photos);

    const places = useSelector(state => state.data.places);

    const ratings = useSelector(state => state.data.ratings);

    const user = useSelector(state => state.user.user);


    const dispatch = useDispatch();

    const inputChangeHandler = e => {
        setRating({
            ...rating,
            [e.target.name]: e.target.value
        });
    };

    const fileChangeHandler = e => {
        setRating({
            ...rating,
            [e.target.name]: e.target.files[0]
        });
    };

    useEffect( () => {
         dispatch(getOnePlace(props.match.params.id));
         dispatch(getRating(props.match.params.id));
        dispatch(getPhotos(props.match.params.id))
    }, [dispatch, props.match.params.id]);


    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(postNewRating(props.match.params.id,rating));
    };

    const submitPhotoHandler = e => {
        e.preventDefault();
        if (photo.image) {
            let formData = new FormData();
            Object.keys(rating).forEach(key => {
                if (rating[key] !== null) {
                    formData.append(key, rating[key]);
                }
            });
            dispatch(postNewPhoto(props.match.params.id,formData));
        }
    };

    let allPhotoLinks;
    let allPhotoLinksFull;
    let allReviews;

    if (ratings.data === undefined) {
        allReviews = []
    } else {
        allReviews = Object.keys(ratings.data).map(id=>{ return ratings.data[id]});
    }

    let onePlaceInfo;

    if (places.data === undefined) {
        onePlaceInfo = [];
    } else {
        onePlaceInfo = Object.keys(places.data).map(id => { return places.data[id] });
    }

    if (photos.data === undefined) {
        allPhotoLinks = []
    } else {
        allPhotoLinksFull = Object.keys(photos.data).map(id => { return (`http://localhost:8000/uploads/` + photos.data[id].image) });
        allPhotoLinks = Object.keys(photos.data).map(id => { return photos.data[id] });
    }

    let avgService = []
    let avgQuality = []
    let avgInterior = []

    const average = list => list.reduce((prev, curr) => prev + curr) / list.length;

    if (allReviews.length === 0) {
        return <div>No reviews</div>
    } else {
        avgService = allReviews.map(id=>{
            return parseInt(id.service)
        })
        avgQuality = allReviews.map(id=>{
            return parseInt(id.quality)
        })
        avgInterior = allReviews.map(id=>{
            return parseInt(id.interior)
        })
    }



    return (
        <>
            <div className="container--wrap" style={{ marginTop: 20 }}>
                <div style={{display:"flex"}}>
                    {onePlaceInfo.map((src, index) => (
                        <div key={index} id={index}>
                            <img
                                src={(`http://localhost:8000/uploads/` + src.image)}
                                onClick={() => openImageViewer(index)}
                                width="220"
                                height="200"
                                key={index}
                                style={{ margin: '5px' }}
                                alt={`IMG_${index}`} />
                            <h1 style={{color:'white'}}>{src.title}</h1>
                            <p style={{color:"white"}}>{src.description}</p>
                            <div style={{display:"flex", justifyContent:'space-between', flexDirection:'column'}}>
                                <div style={{color:'white'}}>
                                    <h1 style={{color:'white'}}>Rating</h1>
                                    <p>service:{Math.round(average(avgService) * 10)/10}</p>
                                    <p>quality:{Math.round(average(avgQuality) * 10)/10}</p>
                                    <p>interior:{Math.round(average(avgInterior) * 10)/10}</p>
                                </div>
                                <div style={{display:'flex', flexDirection:'column'}}>
                                    <h1 style={{color:'white'}}>Gallery</h1>
                                    <div style={{display:'flex'}}>
                                        {allPhotoLinks.map((src, index) => (
                                            <div  key={index}>
                                                <img
                                                    src={(`http://localhost:8000/uploads/` + src.image)}
                                                    onClick={() => openImageViewer(index)}
                                                    width="200"
                                                    key={index}
                                                    alt={`IMG_${index}`} />

                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h1 style={{color:"white"}}>Reviews:</h1>
                                    {allReviews.map(id=>{
                                        return <div id={id} style={{color:"white", display:'flex', justifyContent:'space-evenly'}}>
                                            <p>service:{id.service}</p>
                                            <p>quality:{id.quality}</p>
                                            <p>interior:{id.interior}</p>
                                            <p>comment:{id.comment}</p>
                                            <p>author:{id.author}</p>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div>
                    <select name="quality" onChange={inputChangeHandler}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <select name="service" onChange={inputChangeHandler}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <select name="interior" onChange={inputChangeHandler}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <input name="comment" onChange={inputChangeHandler}/>
                    <button onClick={submitFormHandler}>Add review</button>
                </div>
                <div>
                    <input type="file" name="image" onChange={fileChangeHandler}/>
                    <button onClick={submitPhotoHandler}>ADD photo</button>
                </div>

            </div>
            {isViewerOpen && (
                <ImageViewer
                    src={allPhotoLinksFull}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                />
            )}
        </>
    )
}

export default FullPlaceInfo;