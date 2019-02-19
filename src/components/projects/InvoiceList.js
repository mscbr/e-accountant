import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import InvoiceSummary from './InvoiceSummary'
import InvoiceSortPanel from './InvoiceSortPanel'



class InvoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortType: 'newest',
            filterType: null
        }
    }
    handleSortFilter = (invoices, sortType, filterType) => {
        //test createdAt sorting ascending
        const sortedArr = invoices.sort((a,b) => {
            return new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate());
        });
        console.log(sortedArr);
        return sortedArr;
        
    }
    
    render() {
        console.log(this.props.invoices);
        const invoices = this.handleSortFilter(this.props.invoices);
        //console.log(invoices);
        invoices.map(item => {
            console.log(new Date(item.createdAt.toDate()));
        })
        return (
            <div className="project-list section">
                <InvoiceSortPanel sortType={this.state.sortType} filterType={this.state.filterType} />
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