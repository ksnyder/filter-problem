import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCountryName } from '../../shared/utils.es6'

function mapStateToProps(store) {
    return {  }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ }, dispatch)
}

class BidsGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            columnDefs: this.createColumnDefs(),
            parentRecord: this.props.node.parent.data,
        }

        this.onGridReady = this.onGridReady.bind(this)
    }

    createColumnDefs() {
        return [
            // {headerName: 'Unit Price', valueGetter: function(){ return 4444 }},
            {headerName: 'Unit Price', field: 'pricePerUnit'},
            {headerName: 'Delivery Price', field: 'deliveryPrice'},
            {headerName: 'Total', valueGetter: this.gridCalcTotal.bind(this)},
            {headerName: 'Prepay %', field: 'prepayPercent'},
            {headerName: 'Terms', field: 'paymentTerms'},
            {headerName: 'Mfr name', field: 'mfrName'},
            {headerName: 'Mfr code', field: 'productCode'},
            {headerName: 'Country of Manufacture', valueGetter: this.gridGetOriginName.bind(this)}
        ]
    }

    onGridReady(params) {
        this.gridApi = params.api
        this.columnApi = params.columnApi
        console.log("==== bidsGrid setting row data: ", this.state.parentRecord.bids)
        this.gridApi.setRowData(this.state.parentRecord.bids)
        setTimeout(() => {
            // this.gridApi.sizeColumnsToFit()
            this.columnApi.autoSizeColumns(this.columnApi.getAllColumns())
        })
    }

    gridCalcTotal(gridParams) {
        if (gridParams.data === null || !gridParams.data.pricePerUnit) {
            return ''
        }
        // const qty = parseInt(gridParams.data.qty)
        console.log("==== bidsGrid, parentRecord.data = ", this.state.parentRecord)
        const qty = parseInt(this.state.parentRecord.qty)
        const unitPrice = parseFloat(gridParams.data.pricePerUnit)
        let deliveryPrice
        if (gridParams.data.deliveryPrice) {
            deliveryPrice = parseFloat(gridParams.data.deliveryPrice)
        } else {
            deliveryPrice = 0
        }
        return `$${(qty * unitPrice) + deliveryPrice}`
    }

    gridGetOriginName(gridParams) {
        console.log("==== gridParams getOriginName = ", gridParams)
        if (gridParams.data === null || !gridParams.data.originCountryCode) {
            return ''
        }
        return getCountryName(gridParams.data.originCountryCode)
    }

    render() {
        const AgGridReact = window.agGridReact
        console.log("==== bidsGrid rendering, AgGridReact = ", AgGridReact)
        console.log("==== bidsGrid rendering, columnDefs = ", this.state.columnDefs)

        return (
            <div className="full-width-panel">
                <AgGridReact
                    // properties
                    columnDefs={this.state.columnDefs}

                    enableSorting
                    enableFilter
                    enableColResize

                    // events
                    onGridReady={this.onGridReady}>
                </AgGridReact>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BidsGrid)