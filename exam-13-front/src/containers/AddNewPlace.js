import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postNewPlace} from "../store/dataActions";
import { isLogined } from "../store/userActions";

const AddNewPlace = () => {

    const [place, setPlace] = useState({
        title: '',
        image: null,
        description:''
    });

    const [check, setCheck] = useState(false);

    const [err, setError] = useState({
        errorMessage: null
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(isLogined());
    }, [dispatch])

    const submitFormHandler = e => {
        e.preventDefault();
        if (place.image === null || place.title === '' || place.description === ''|| check===false) {
            if (place.title === '') {
                setError({ errorMessage: "Title is required" });
                return;
            } else if (place.image === null) {
                setError({ errorMessage: "Image is required" });
                return;
            } else if (place.description === '') {
                setError({ errorMessage: "Description is required" });
                return;
            } else if (check === false) {
                setError({ errorMessage: "Checkbox" });
                return;
            }
        }
        if (place.image) {
            let formData = new FormData();
            Object.keys(place).forEach(key => {
                if (place[key] !== null) {
                    formData.append(key, place[key]);
                }
            });
            setError({ errorMessage: null })
            dispatch(postNewPlace(formData));
        }
    };

    const checkboxHandler = e => {
        setCheck(!check)
    };

    const inputChangeHandler = e => {
        setPlace({
            ...place,
            [e.target.name]: e.target.value
        });
    };

    const fileChangeHandler = e => {
        setPlace({
            ...place,
            [e.target.name]: e.target.files[0]
        });
    };

    return (
        <div>
            <h1 style={{color:'white'}}>Add New Place</h1>
            <form onSubmit={(e) => submitFormHandler(e)}>
                <div className="df" style={{ margin: '0 auto' }}>
                    {err.errorMessage ? <div style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>{err.errorMessage}</div> : null}
                    <div style={{display:'flex', flexDirection:"column"}}>
                        <label style={{ color: 'white' }} htmlFor="name">Title</label>
                        <textarea
                            name="title"
                            value={place.title}
                            onChange={(e) => inputChangeHandler(e)}
                            placeholder="Title" />
                    </div>
                    <div style={{display:'flex', flexDirection:"column"}}>
                        <label style={{ color: 'white' }} htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            value={place.description}
                            onChange={(e) => inputChangeHandler(e)}
                            placeholder="Description" />
                    </div>
                    <div>
                        <label style={{ color: 'white' }} htmlFor="image">Main Photo: </label>
                        <input type="file" name="image" id="image" onChange={fileChangeHandler} />
                    </div>
                    <div>
                        <p>By pressing that button blah-blah-blah...</p>
                        <input type="checkbox" checked={check} onChange={checkboxHandler}/>
                    </div>
                    <div>
                        <button type='submit'>Create photo</button>
                    </div>
                </div>

            </form>

        </div>
    )
}
export default AddNewPlace;