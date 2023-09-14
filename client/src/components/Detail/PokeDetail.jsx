import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import style from "./PokeDetail.module.css"
import { getPokemonById } from "../../redux/actions";
export default function PokeDetail() {
    const [paints, setPaints] = useState([]);
    const { id } = useParams()
    const [poke, setPoke] = useState(null)
    const [toggleImg, setToggleImg] = useState(true)
    const pokeDetail = useSelector(state => state.pokeDetail);;
    const dispatch = useDispatch();

    const handleMouseMove = (e) => {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        const color = `rgba(${64}, ${211}, ${101}, ${0.57})`;

        const newPaint = {
            left: x + 'px',
            top: y + 'px',
            backgroundColor: color,
        };

        setPaints((prevPaints) => [...prevPaints, newPaint])
        setTimeout(() => {
            setPaints((prevPaints) => prevPaints.filter((paint) => paint !== newPaint));
        }, 800);
    };

    const imgToggle = (event) => {
        event.preventDefault()
        setToggleImg(!toggleImg)
    }

    useEffect(() => {
        dispatch(getPokemonById(id), console.log("estoy en dispatch"))
    }, [id])
    useEffect(() => {
        setPoke(pokeDetail)
    }, [pokeDetail])
    return (
        <div>
            <Link to="/home" >
                <button className={style.goHome}>Back to home</button>
            </Link>
            {toggleImg ? null : <div className={style.curtain} />}

            <div className={style.divCard} onMouseMove={handleMouseMove}>
                {paints.map((paint, index) => (
                    <div
                        key={index}
                        className={style.paintTrail}
                        style={{
                            left: paint.left,
                            top: paint.top,
                            backgroundColor: paint.backgroundColor,

                        }}
                    />
                ))}
                <h1 className={style.name}>{poke?.name}</h1>
                <div className={style.divContainer}>
                    <div className={style.imageContainer}>
                        <div className={style.imageOverlay}></div> {/* Capa transparente para hover */}
                        {toggleImg ?
                            <img src={poke?.image} alt="our picture" className={style.img} onClick={imgToggle} />
                            : <img src={poke?.image} alt="our picture" className={style.imgOnClick} />}
                        {toggleImg ? null
                            : <button onClick={imgToggle} className={style.closeButton}>x</button>
                        }


                    </div>
                    <div className={style.textContainer}>
                        <h1>{id}</h1>
                        <h1>Name: {poke?.name}</h1>
                        <h1>Types: {poke?.types}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}