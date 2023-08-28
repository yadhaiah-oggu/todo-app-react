import { PropTypes } from "prop-types";

export default function CounterButton({
  by,
  incrementMethod,
  decrementMethod,
}) {
  // const buttonStyle = {
  //     fontSize:"16px",
  //     backgroundColor: "#00a5ab",
  //     width:"100px",
  //     margin:"10px",
  //     color:"white",
  //     padding:"15px",
  //     borderRadius:"30px"
  // }

  return (
    <>
      <div className="Counter">
        <div>
          <button
            className="counterButton"
            onClick={()=> incrementMethod(by)}
            //   style={buttonStyle}
          >
            +{by}
          </button>

          <button
            className="counterButton"
            onClick={()=> decrementMethod(by)}
            //   style={buttonStyle}
          >
            -{by}
          </button>
        </div>
      </div>
    </>
  );
}

CounterButton.propTypes = {
  by: PropTypes.number,
};
CounterButton.defaultProps = {
  by: 1,
};
