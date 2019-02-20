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
            filterType: 'none',
            filterTarget: 'pick',
        }
    }

    handleSort = (invoices, sortType, filterTarget) => {
        let sortedArr = [];
        //SORTING
        switch(sortType) {
            case 'newest':
                sortedArr = invoices.slice().sort((a,b) => {
                    return new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate());
                });
                break;
            case 'oldest':
                sortedArr = invoices.slice().sort((a,b) => {
                    return new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate());
                });
            default:
                break;
                
        }
        //FILTERING
        

        return sortedArr;
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });

    }
    handleFilterType = (filterType, invoices) => {
        switch(filterType) {
            case 'none':
                return (
                    <select
                    name='filterTarget'
                    id='filterTarget'
                    value={this.state.filterTarget}
                    style={selectStyle}
                    onChange={this.handleChange}
                    >
                        <option value='pick'>--</option>
                    </select>
                )
            case 'type':
                return (
                    <select
                    name='filterTarget'
                    id='filterTarget'
                    value={this.state.filterTarget}
                    style={selectStyle}
                    onChange={this.handleChange}
                    >
                        <option value='sale'>SALE</option>
                        <option value='expence'>EXPENCE</option>
                        <option value='other'>OTHER</option>
                    </select>
                )
            case 'period':
                let issuePeriods =[];
                invoices.map(invoice => {
                    if(!issuePeriods.includes(invoice.issuePeriod)) {
                        issuePeriods.push(invoice.issuePeriod);
                    }
                })
                return (
                    <select
                    name='filterTarget'
                    id='filterTarget'
                    value={this.state.filterTarget}
                    style={selectStyle}
                    onChange={this.handleChange}
                    >
                    {issuePeriods.map(period => {
                        return (
                            <option value={period} key={period}>{period}</option>
                        )
                    })}
                    </select>
                )
            default:
                return (
                    <select
                    name='filterTarget'
                    id='filterTarget'
                    value={this.state.filterType}
                    style={selectStyle}
                    onChange={this.handleChange}
                    >

                    </select>
                )
        }
    }
    
    render() {
        
        const invoices = this.handleSort(this.props.invoices, this.state.sortType);
        const filterTarget = this.handleFilterType(this.state.filterType, invoices);
        

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
                        <select
                            name='filterType'
                            id='filterType'
                            value={this.state.filterType}
                            style={selectStyle}
                            onChange={this.handleChange}
                            >
                            <option value='none'>NONE</option>
                            <option value='type'>TYPE</option>
                            <option value='period'>PERIOD</option>
                        </select>
                        {filterTarget}
                        {/* <select
                            name='filterTarget'
                            id='filterTarget'
                            value={this.state.filterType}
                            style={selectStyle}
                            onChange={this.handleChange}
                            >

                        </select> */}
                        
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