
import './Cell.css';

function Cell({number, style}){

    const isDayNumber = typeof number === "number";
    return (
        <>
            <div className={style}>
                <span>
                    {number}
                </span>
                
            </div>
        </>
    );

}

export default Cell;