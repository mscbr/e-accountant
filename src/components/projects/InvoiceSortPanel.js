import React, {Component} from 'react'


const selectContainerStyle = {
    display: 'flex'
}
const selectStyle = {
    display: 'initial'
}

class InvoiceSortPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: props.sortType,
            filterType: props.filterType

        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        console.log(this.state);
    }

    render() {
        console.log('invoiceSortPanel state:');
        console.log(this.state);
        return (
        <div className="z-depth-1" style={{width: '96%', height: '50px', margin: "0 auto"}}>
            <div className="select-container" style={selectContainerStyle}>
                <select 
                    name='sortType'
                    id='sortType'
                    value={this.state.sortType} 
                    style={selectStyle}
                    onChange={this.handleChange}
                    >
                    <option value="newest">NEWEST</option>
                    <option value="oldest">OLDEST</option>
                </select>
                {/* <select name='period' value="newest" style={selectStyle}>
                    <option value="jan">JAN</option>
                    <option value="feb">FEB</option>
                </select>    */}
            </div>   
        </div>
        )
    }
}


export default InvoiceSortPanel



