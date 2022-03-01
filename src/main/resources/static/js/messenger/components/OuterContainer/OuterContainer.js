import {InnerContainer} from "../InnerContainer/InnerContainer";

export function OuterContainer() {

    const outerContainerStyle = {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <div style={outerContainerStyle}>
            <InnerContainer/>
        </div>
    )
}