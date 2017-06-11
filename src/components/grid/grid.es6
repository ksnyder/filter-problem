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
            {headerName: 'Region', valueGetter: this.gridGetRegionName.bind(this), sort: 'asc', enableRowGroup: true},
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
            rowData: Object.values(this.props.tenders)
        }
        this.DetailPanelCellRenderer = function DetailPanelCellRenderer() {}
        this.initDetailPanelCellRenderer()
    }

    initDetailPanelCellRenderer() {
        console.log("==== initializing DetailPanelCellRenderer")
        this.DetailPanelCellRenderer.prototype.init = function(params) {
            console.log("==== DetailPanelCellRenderer.init was passed params: ", params)
            // trick to convert string of html into dom object
            var eTemp = document.createElement('div')
            // eTemp.innerHTML = this.getTemplate(params)
            eTemp.innerHTML = '<div><div class="full-width-grid"></div></div>'
            this.eGui = eTemp.firstElementChild

            this.setupDetailGrid(params.data);
            // this.consumeMouseWheelOnDetailGrid();
            // this.addSeachFeature();
            // this.addButtonListeners();
        }

        this.DetailPanelCellRenderer.prototype.setupDetailGrid = function(bids) {
            console.log("==== DetailPanelCellRenderer.setupDetailGrid was passed ", bids)
            this.detailGridOptions = {
                enableSorting: true,
                enableFilter: true,
                enableColResize: true,
                rowData: bids,
                columnDefs: detailColumnDefs,
                onGridReady: function (params) {
                    setTimeout(function () {
                        console.log("==== detailGrid ready");
                        params.api.sizeColumnsToFit();
                    }, 0);
                }
            }

            var eDetailGrid = this.eGui.querySelector('.full-width-grid')
            new window.agGridReact.Grid(eDetailGrid, this.detailGridOptions)
        }
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
        setTimeout( this.columnApi.autoSizeColumns(this.columnApi.getAllColumns()), 0)
    }

    getNodeChildDetails(record) {
        console.log("==== getNodeChildDetails passed record ", record)
        if (Array.isArray(record.bids) && record.bids.length > 0) {
            console.log("==== this tender has bids")
            return {
                group: true,
                // the key is used by the default group cellRenderer
                key: `${record.id}-bids`,
                // provide ag-Grid with the children of this group
                children: [record.bids]
                // for demo, expand the third row by default
                // expanded: record.account === 177005
            }
        } else {
            console.log("==== this tender has NO bids")
            return null
        }
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
                    isFullWidthCell={function(rowNode) {
                        const fullWidth = rowNode.level != 2
                        console.log(`==== fullWidth = ${fullWidth}, rowNode.level = `, rowNode.level)
                        return fullWidth
                    }}
                    // the problem with providing our own fullWidthCellRenderer is we lose the automatic full width cell
                    // output done by ag-grid for product and country
                    {/*// fullWidthCellRenderer={this.DetailPanelCellRenderer}*/}
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
                    rowSelection="multiple"
                    enableSorting={true}
                    enableFilter={true}
                    rowHeight="22"
                    enableColResize={true}
                    getNodeChildDetails={this.getNodeChildDetails}
                />
            </div>)
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)