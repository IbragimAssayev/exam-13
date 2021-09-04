import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewPhoto } from "../store/dataActions";
import { isLogined } from "../store/userActions";

const NewPhoto = () => {

    const [photo, setPhoto] = useState({
        title: '',
        image: null,
    });

    const [err, setError] = useState({
        errorMessage: null
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isLogined());
    }, [dispatch])

    const submitFormHandler = e => {
        e.preventDefault();
        if (photo.image === null || photo.title === '') {
            if (photo.title === '') {
                setError({ errorMessage: "Title is required" });
                return;
            } else if (photo.image === null) {
                setError({ errorMessage: "Image is required" });
                return;
            }
        }
        if (photo.image) {
            let formData = new FormData();
            Object.keys(photo).forEach(key => {
                if (photo[key] !== null) {
                    formData.append(key, photo[key]);
                }
            });
            setError({ errorMessage: null })
            dispatch(postNewPhoto(formData));
        }
    };

    const inputChangeHandler = e => {
        setPhoto({
            ...photo,
            [e.target.name]: e.target.value
        });
    };

    const fileChangeHandler = e => {
        setPhoto({
            ...photo,
            [e.target.name]: e.target.files[0]
        });
    };

    return (
        <div>
            <form onSubmit={(e) => submitFormHandler(e)}>
                <div className="df" style={{ margin: '0 auto' }}>
                    {err.errorMessage ? <div style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>{err.errorMessage}</div> : null}
                    <div >
                        <label style={{ color: 'white' }} htmlFor="name">Title</label>
                        <input

                            name="title"
                            value={photo.name}
                            onChange={(e) => inputChangeHandler(e)}
                            placeholder="Photo title" />
                    </div>
                    <div>
                        <label style={{ color: 'white' }} htmlFor="image">Image: </label>
                        <input type="file" name="image" id="image" onChange={fileChangeHandler} />
                    </div>
                    <button type='submit'>Create photo</button>
                </div>

            </form>

        </div>
    )
}
export default NewPhoto;