import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getDetail } from "../../actions/index";

const CardDetail = () => {

    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.type);

    const { name, type, hp, attack, defense } = pokemon; // REVISAR!!!!!!!!!!!!!!!!!!!!!!!!!!
    let { id } = useParams();

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id]);


    return (
        <div className="card-details">
            <div className="">
                
            </div>
        </div>
    )
};

export default CardDetail;