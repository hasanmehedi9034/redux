import { connect } from "react-redux";
import { decrement, increment } from "../redux/counter/actions";
import { decrement as dynamicDecrement, increment as dynamicIncrement } from "../redux/dynamicCounter/actions";


function VariableCounter({ count, increment, decrement }) {

    return (
        <div className="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
            <div className="text-2xl font-semibold">{count}</div>
            <div className="flex space-x-3">
                <button
                    className="bg-indigo-400 text-white px-3 py-2 rounded shadow"
                    onClick={() => increment(3)}
                >
                    Increment
                </button>
                <button
                    className="bg-red-400 text-white px-3 py-2 rounded shadow"
                    onClick={() => decrement(1)}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        count: ownProps ? state.dynamicCouner.value : state.counter.value
    }
}


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        increment: (value) => dispatch(increment(value)),
        decrement: (value) => dispatch(decrement(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VariableCounter);
