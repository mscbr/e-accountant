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
            currentPage: 0
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
            [e.target.id]: e.target.value,
            currentPage: 0
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
                        <option value='pick'>WSZYSTKIE</option>
                        <option value='sale'>SPRZEDAŻ</option>
                        <option value='expence'>WYDATEK</option>
                        <option value='other'>INNE</option>
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
                        <option value='pick'>WSZYSTKIE</option>
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
    handlePagination = (invoiceList, page) => {
        
        let paginatedInvoiceList = [];
        if (invoiceList.length > 5) {
            let invoiceListCopy = invoiceList.slice();
            for (let i = 0; i < invoiceListCopy.length+1; i++) {
                paginatedInvoiceList.push(invoiceListCopy.splice(0,5));
            }
        } else {
            paginatedInvoiceList = invoiceList.slice();
            return paginatedInvoiceList;
        }
        return paginatedInvoiceList[page];
        
        
    }
    handlePageButtons = (invoiceList) => {
        const pagesAmount = Math.ceil(invoiceList.length/5);
       
        if (pagesAmount && invoiceList.length>5) {
            let pagesButtons = [];
            for (let i = 0; i < pagesAmount; i++) {
                pagesButtons.push(
                    <li key={i + 'pageLink'}><a href="#" onClick={(e) => {
                            e.preventDefault();
                            this.setState({currentPage: i})}
                        }
                        style={ i === this.state.currentPage ? {color: 'red'} : {color: 'black'} } 
                    >{i+1}</a></li>
                );
            }
            return pagesButtons;
        } else {
            return false;
        }
        
    }
    
    render() {
        
        const invoices = this.handleSort(this.props.invoices, this.state.sortType);
        const filterTarget = this.handleFilterType(this.state.filterType, invoices);
        const filteredInvoices = this.handleFilter(invoices, this.state.filterTarget);
        const paginated = this.handlePagination(filteredInvoices, this.state.currentPage);
        const pageButtons = this.handlePageButtons(invoices);
        

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
                            <option value="newest">NAJNOWSZE</option>
                            <option value="oldest">NAJSTARSZE</option>
                        </select>
                        <select
                            name='filterType'
                            id='filterType'
                            value={this.state.filterType}
                            style={selectStyle}
                            onChange={this.handleChange}
                            >
                            <option value='none'>FILTER (BEZ)</option>
                            <option value='type'>TYP DOKUMENTU</option>
                            <option value='period'>ZA OKRES</option>
                        </select>
                        {filterTarget}
                    </div>   
                </div>
                { invoices && paginated.map(invoice => {
                    return (
                        <Link to={'/project/' + invoice.id} key={invoice.id}>
                            <InvoiceSummary invoice={invoice}  />
                        </Link>
                    )
                })}
                <div className='page-buttons' style={{background: 'rgba(201, 204, 222, 0.5)'}}>
                    <ul style={{display: 'flex', justifyContent: 'center'}}>
                        {pageButtons && pageButtons.map(button => {
                            return button;
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
export default InvoiceList;