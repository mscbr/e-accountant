import React from 'react';
import { Link } from 'react-router-dom';

import InvoiceSummary from './InvoiceSummary'

const InvoiceList = ({invoices}) => {
    //grab invoices and sort it in desired manner 
    return (
        <div className="project-list section">

            { invoices && invoices.map(invoice => {
                return (
                    <Link to={'/project/' + invoice.id} key={invoice.id}>
                        <InvoiceSummary invoice={invoice}  />
                    </Link>
                )
            })}

        </div>
    );
}

export default InvoiceList;