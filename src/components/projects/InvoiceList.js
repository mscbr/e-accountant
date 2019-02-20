import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import InvoiceSummary from './InvoiceSummary'


const selectContainerStyle = {
    display: 'flex'
}
const selectStyle = {
    display: 'initial'
}


class InvoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: 'newest',
            filterType: null
        }
    }

    handleSort = (invoices, sortType, filterType) => {
        let sortedArr = [];
        switch(sortType) {
            case 'newest':
                sortedArr = invoices.sort((a,b) => {
                    return new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate());
                });
                break;
            case 'oldest':
                sortedArr = invoices.sort((a,b) => {
                    return new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate());
                });
            default:
                // sortedArr = invoices.sort((a,b) => {
                //     return new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate());
                // });
                break;
                
        }

        //test createdAt sorting ascending
        // const sortedArr = invoices.sort((a,b) => {
        //     return new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate());
        // });

        return sortedArr;
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });

    }
    
    render() {
        
        const invoices = this.handleSort(this.props.invoices, this.state.sortType);
        console.log(this.state);
        return (
            <div className="project-list section">
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
                {/* <InvoiceSortPanel sortType={this.state.sortType} filterType={this.state.filterType} updateSortType={this.updateSort} /> */}
                { invoices && invoices.map(invoice => {
                    return (
                        <Link to={'/project/' + invoice.id} key={invoice.id}>
                            <InvoiceSummary invoice={invoice}  />
                        </Link>
                    )
                })}
            </div>
        )
    }
}
export default InvoiceList;