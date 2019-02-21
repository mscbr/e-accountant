import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import InvoiceSummary from './InvoiceSummary'


const selectContainerStyle = {
    display: 'flex'
}
const selectStyle = {
    display: 'initial',
    
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

    handleSort = (invoices, sortType) => {
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
                break;
            default:
                break;    
        }
        return sortedArr;
    }
    handleFilter = (invoices, filterTarget) => {
        let filteredArr = [];
        //FILTERING
        switch(filterTarget) {
            case 'pick':
                filteredArr = invoices.slice();
                break;
            case 'sale':
            case 'expence':
            case 'other':
                filteredArr = invoices.filter(invoice => {
                    return invoice.docType === filterTarget;
                });
                break;
            default:
                filteredArr = invoices.filter(invoice => {
                    return invoice.issuePeriod === filterTarget;
                });
                break;
        }

        return filteredArr
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });

    }
    handleFilterType = (filterType, invoices) => {
        
        switch(filterType) {
            case 'none':
                //fix for reseting filterTarget when turning of filter
                if (this.state.filterTarget !== 'pick') {
                    this.setState({
                        filterTarget: 'pick'
                    })
                }
                return (
                    <select
                    name='filterTarget'
                    id='filterTarget'
                    value={this.state.filterTarget}
                    style={selectStyle}
                    onChange={this.handleChange}
                    >
                        <option value='pick' default>--</option>
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
                        <option value='pick'>ALL</option>
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
                        <option value='pick'>ALL</option>
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
        const filteredInvoices = this.handleFilter(invoices, this.state.filterTarget);
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
                        <select
                            name='filterType'
                            id='filterType'
                            value={this.state.filterType}
                            style={selectStyle}
                            onChange={this.handleChange}
                            >
                            <option value='none'>FILTER (NONE)</option>
                            <option value='type'>TYPE OF DOC</option>
                            <option value='period'>PERIOD OF ISSUE</option>
                        </select>
                        {filterTarget}
                    </div>   
                </div>
                { invoices && filteredInvoices.map(invoice => {
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