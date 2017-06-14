import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAgGridModule } from '../../shared/actionCreators.es6'
// import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-root/dist/styles/ag-grid.css'  // see webpack config for alias of 'ag-grid-root'
import 'ag-grid-root/dist/styles/theme-fresh.css'

function mapStateToProps(store) {
    return { commodities: store.commodities, tenders: store.tenders, agGridModule: store.agGridModule }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAgGridModule }, dispatch)
}

class Grid extends React.Component {
    constructor(props) {
        super(props)
        // if (!props.agGridModule) {
        //     console.log("==== Grid constructor didn't find agGridModule, getting it now")
        //     props.getAgGridModule()
        // }
        this.state = { columnDefs: [
            // the comparator works for every nested grouped column:
            {headerName: "Product / Destination", cellRenderer: 'group', comparator: this.sortGroupBy.bind(this), checkboxSelection: true},
            // {headerName: "Product / Destination", cellRenderer: 'group', sort: 'asc'},
            // {headerName: 'Product', rowGroupIndex: 0, field: 'commodityId', hide: true},
            {headerName: 'Product', rowGroupIndex: 0, valueGetter: this.gridGetCommodityName.bind(this), hide: true},
            // {headerName: 'Country', field: 'deliveryCountryCode'},
            {headerName: 'Country', rowGroupIndex: 1, valueGetter: this.gridGetCountryName.bind(this), hide: true},
            // {headerName: 'Region', field: 'deliveryRegionCode'},
            {headerName: 'Region', valueGetter: this.gridGetRegionName.bind(this), sort: 'asc'},
            {headerName: 'City', field: 'deliveryCity', sort: 'asc'},
            {headerName: 'Incoterm', field: 'incoterm'},
            {headerName: 'Description', valueGetter: this.gridCalcDescription.bind(this), sort: 'asc'},
            {headerName: 'Quantity', field: 'qty', cellStyle: {'text-align': 'right'}},
            {headerName: 'Unit Price', field: 'pricePerUnit'},
            {headerName: 'Delivery Price', field: 'deliveryPrice'},
            {headerName: 'Total', valueGetter: this.gridCalcTotal.bind(this)},
            {headerName: 'Prepay %', field: 'prepayPercent'},
            {headerName: 'Terms', field: 'paymentTerms'},
            {headerName: 'Mfr name', field: 'mfrName'},
            {headerName: 'Mfr code', field: 'productCode'},
            {headerName: 'Country of Manufacture', valueGetter: this.gridGetOriginName.bind(this)}
        ],
            rowData: Object.values(this.props.tenders)}
        // this.state = { columnDefs: [{headerName: 'Product', field: 'product'}, {headerName: 'Country', field: 'country'}],
        //                 rowData: [{product: 'IOL', country: 'US'}, {product: 'Suture', country: 'IN'}]}
    }

    sortGroupBy(valueA, valueB, nodeA, nodeB, isInverted) {
        // note Aland Islands sorted after Bahamas, is this because
        console.log(`==== valueA: ${valueA}, valueB: ${valueB}, isInverted: ${isInverted}`)
        console.log("==== nodeA: ", nodeA)
        console.log("==== nodeB: ", nodeB)
        let answer = 0
        if (nodeA.key < nodeB.key) {
            answer = -1
        } else {
            answer = 1
        }
        console.log("==== sortGroupBy returning ", answer)
        return answer
    }

    gridGetCountryName(gridParams) {
        console.log("==== gridParams getCountryName = ", gridParams)
        if (gridParams.data == null) {
            return ''
        }
        return this.getCountryName(gridParams.data.deliveryCountryCode)
    }

    gridGetOriginName(gridParams) {
        console.log("==== gridParams getOriginName = ", gridParams)
        if (gridParams.data == null) {
            return ''
        }
        return this.getCountryName(gridParams.data.originCountryCode)
    }

    gridGetRegionName(gridParams) {
        console.log("==== gridParams getRegionName = ", gridParams)
        if (gridParams.data == null) {  // this may be necessary because it's called for grouped rows that don't display a region?
            return ''
        }
        return this.getRegionName(gridParams.data.deliveryCountryCode, gridParams.data.deliveryRegionCode)
    }

    gridGetCommodityName(gridParams) {
        if (gridParams.data == null) {
            return ''
        }
        return this.getCommodityName(gridParams.data.commodityId)
    }

    getCountryName(countryCode) {
        const country = window.geoLookup[countryCode]
        if (country) {
            return window.geoLookup[countryCode]['name']
        } else {
            return `no country code '${countryCode}'`
        }
    }

    getRegionName(countryCode, regionCode) {
        return window.geoLookup[countryCode]['regions'][regionCode]
    }

    getCommodityName(commodityId) {
        return this.props.commodities.commodities[commodityId]['commodity_name']
    }

    gridCalcDescription(gridParams) {
        let description = ''
        if (gridParams.data) {
            const match = gridParams.data.description.match(/\/\s*(.*)$/)  // extract description after first /
            if (match) {
                description = match[1]
            }
        }
        return description
    }

    gridCalcTotal(gridParams) {
        if (gridParams.data == null) {
            return ''
        }
        const qty = parseInt(gridParams.data.qty)
        const unitPrice = parseFloat(gridParams.data.pricePerUnit)
        let deliveryPrice
        if (gridParams.data.deliveryPrice) {
            deliveryPrice = parseFloat(gridParams.data.deliveryPrice)
        } else {
            deliveryPrice = 0
        }
        return `$${(qty * unitPrice) + deliveryPrice}`
    }

    onGridReady(params) {
        console.log("==== ag-grid ready, params = ", params)
        this.api = params.api
        this.columnApi = params.columnApi
        this.columnApi.autoSizeColumns(this.columnApi.getAllColumns())
    }

    render() {
        console.log("==== rendering Grid with rowData :", this.state.rowData)

        const AgGridReact = window.agGridReact
        // when loaded with a regular import at the top of the file, AgGridReact returns: function (props, context, updater) {if (process.env.NODE_ENV !== 'production'…
        // when loaded with an async import() (see first commit to ag-grid branch) it returns an object -- why the difference?
        console.log("==== agGridModule found, = ", AgGridReact)
        return (
            <div id='grid' className='ag-fresh'>
                <div>
                    Here's the grid...
                </div>
                <AgGridReact

                    // listen for events with React callbacks
                    onGridReady={this.onGridReady.bind(this)}
                    // onRowSelected={this.onRowSelected.bind(this)}
                    // onCellClicked={this.onCellClicked.bind(this)}

                    // binding to properties within React State or Props
                    // showToolPanel={this.state.showToolPanel}
                    // quickFilterText={this.state.quickFilterText}
                    // icons={this.state.icons}

                    // column definitions and row data are immutable, the grid
                    // will update when these lists change
                    columnDefs={this.state.columnDefs}
                    rowData={this.state.rowData}
                    // rowData={this.props.rowData}

                    // or provide props the old way with no binding
                    groupsUseEntireRow="true"
                    groupSuppressAutoColumn="true"
                    // rowSelection="multiple"
                    enableSorting={true}
                    enableFilter={true}
                    rowHeight="22"
                    enableColResize={true}
                />
            </div>)
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)