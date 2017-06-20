import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAgGridModule } from '../../shared/actionCreators.es6'
import BidsGrid from './bidsgrid.es6'
import { getCountryName, getRegionName } from '../../shared/utils.es6'
// import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-root/dist/styles/ag-grid.css'  // see webpack config for alias of 'ag-grid-root'
import 'ag-grid-root/dist/styles/theme-fresh.css'

const tendersAll = {"tenderTree":{"42291613":{"AF":[50,51,48,47,49],"BR":[16,26,27,25]},"42292904":{"AT":[53],"AU":[54],"BT":[52],"TD":[55]},"42295524":{"AF":[45,46,44],"AZ":[12],"BO":[13],"BR":[14],"BW":[11],"GD":[15]},"51101503":{"AF":[42,43,29,37,38,39,40,41],"AI":[18],"AL":[32],"AT":[34],"AX":[36,35],"BS":[33]},"51101552":{"BR":[28]},"51101572":{"BH":[21]},"51102713":{"AS":[19]},"51111605":{"AF":[20]},"51151504":{"TD":[30]},"51151512":{"AF":[31]},"51181704":{"AI":[17]},"51241114":{"TV":[22]}},"tenders":{"50":{"commodityId":42291613,"bids":[],"description":"Surgical scalpels or knives or blades or trephines or accessories","qty":4444,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"4444c","deliveryBidRequested":false,"incoterm":"CIP"},"51":{"commodityId":42291613,"bids":[{"id":15,"organizationId":2,"pricePerUnit":"4.3","paymentTerms":"Net 7","packingSpecs":null,"originCountryCode":"AI","sourceCountryCode":null,"notes":null,"mfrName":"YTR","productCode":"234","prepayPercent":"0","deliveryPrice":"430.0"}],"description":"Surgical scalpels or knives or blades or trephines or accessories","qty":4445,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"4444d","deliveryBidRequested":false,"incoterm":"CIP"},"48":{"commodityId":42291613,"bids":[{"id":13,"organizationId":2,"pricePerUnit":"4.05","paymentTerms":"Net 7","packingSpecs":null,"originCountryCode":"BT","sourceCountryCode":null,"notes":null,"mfrName":"Y","productCode":"298734","prepayPercent":"21","deliveryPrice":"405.0"}],"description":"Surgical scalpels or knives or blades or trephines or accessories","qty":4444,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"4444a","deliveryBidRequested":false,"incoterm":"CIP"},"47":{"commodityId":42291613,"bids":[{"id":12,"organizationId":2,"pricePerUnit":"4.04","paymentTerms":"Net 30","packingSpecs":null,"originCountryCode":"AI","sourceCountryCode":null,"notes":null,"mfrName":"Yodle","productCode":"23456","prepayPercent":"20","deliveryPrice":"404.0"}],"description":"Surgical scalpels or knives or blades or trephines or accessories","qty":4444,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"4444","deliveryBidRequested":false,"incoterm":"CIP"},"49":{"commodityId":42291613,"bids":[{"id":14,"organizationId":2,"pricePerUnit":"4.0","paymentTerms":"Net 60","packingSpecs":null,"originCountryCode":"DZ","sourceCountryCode":null,"notes":null,"mfrName":"Yoiu","productCode":"22908","prepayPercent":"33","deliveryPrice":"400.0"}],"description":"Surgical scalpels or knives or blades or trephines or accessories","qty":4444,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"4444b","deliveryBidRequested":false,"incoterm":"CIP"},"16":{"commodityId":42291613,"bids":[{"id":7,"organizationId":2,"pricePerUnit":"4.04","paymentTerms":null,"packingSpecs":null,"originCountryCode":"AT","sourceCountryCode":null,"notes":null,"mfrName":null,"productCode":null,"prepayPercent":null,"deliveryPrice":"400.0"}],"description":"Surgical scalpels or knives or blades or trephines or accessories / 3% / 20ml","qty":400,"deliveryDeadline":"2017-05-21","deliveryCountryCode":"BR","deliveryRegionCode":"AM","deliveryCity":"Uirty","deliveryBidRequested":true,"incoterm":"CIP"},"26":{"commodityId":42291613,"bids":[],"description":"Surgical scalpels or knives or blades or trephines or accessories","qty":200,"deliveryDeadline":"","deliveryCountryCode":"BR","deliveryRegionCode":"AM","deliveryCity":"Uyy","deliveryBidRequested":false,"incoterm":""},"27":{"commodityId":42291613,"bids":[],"description":"Surgical scalpels or knives or blades or trephines or accessories","qty":400,"deliveryDeadline":"","deliveryCountryCode":"BR","deliveryRegionCode":"AM","deliveryCity":"Four","deliveryBidRequested":false,"incoterm":""},"25":{"commodityId":42291613,"bids":[{"id":11,"organizationId":2,"pricePerUnit":"3.03","paymentTerms":"Net 45","packingSpecs":null,"originCountryCode":"AL","sourceCountryCode":null,"notes":null,"mfrName":"Juno","productCode":"J789","prepayPercent":"33","deliveryPrice":"300.0"}],"description":"Surgical scalpels or knives or blades or trephines or accessories","qty":300,"deliveryDeadline":"","deliveryCountryCode":"BR","deliveryRegionCode":"AM","deliveryCity":"Boo","deliveryBidRequested":false,"incoterm":""},"53":{"commodityId":42292904,"bids":[],"description":"Suture / Poliglecaprone 25 / Braided / Blue / 23 cm / 8-0 / Needle 135° / Needle ⌀200μm / Single / Spatula point (side cutting)","qty":1000,"deliveryDeadline":"","deliveryCountryCode":"AT","deliveryRegionCode":"5","deliveryCity":"Salzburg","deliveryBidRequested":false,"incoterm":"CIP"},"54":{"commodityId":42292904,"bids":[],"description":"Suture / Polyactic acid / Monofilament / 30 cm / 8-0","qty":1000,"deliveryDeadline":"","deliveryCountryCode":"AU","deliveryRegionCode":"NT","deliveryCity":"Hytr","deliveryBidRequested":false,"incoterm":"CIP"},"52":{"commodityId":42292904,"bids":[],"description":"Surgical suture or wire passers or related products","qty":1000,"deliveryDeadline":"","deliveryCountryCode":"BT","deliveryRegionCode":"12","deliveryCity":"Yhgy","deliveryBidRequested":false,"incoterm":"CIP"},"55":{"commodityId":42292904,"bids":[],"description":"Suture / Nylon / Monofilament / 23 cm / 9-0 / Needle: 135° / ⌀7μm / Single arm / Cutting reverse","qty":1000,"deliveryDeadline":"","deliveryCountryCode":"TD","deliveryRegionCode":"CB","deliveryCity":"Oip","deliveryBidRequested":false,"incoterm":"CIP"},"45":{"commodityId":42295524,"bids":[{"id":9,"organizationId":2,"pricePerUnit":"1.01","paymentTerms":null,"packingSpecs":null,"originCountryCode":"BY","sourceCountryCode":null,"notes":null,"mfrName":"IOLab","productCode":"12345","prepayPercent":null,"deliveryPrice":"101.0"}],"description":"Intraocular lens IOL / Monofocal / PMMA / 3-piece / +15.5 / Opt ⌀6 mm / Overall ⌀12mm","qty":1000,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"City2","deliveryBidRequested":false,"incoterm":"CIP"},"46":{"commodityId":42295524,"bids":[],"description":"Intraocular lens IOL / Monofocal / PMMA / 1-piece / +19.5 / Opt ⌀6 mm / Overall ⌀12mm","qty":2100,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"City3","deliveryBidRequested":false,"incoterm":"CIP"},"44":{"commodityId":42295524,"bids":[{"id":8,"organizationId":2,"pricePerUnit":"2.02","paymentTerms":null,"packingSpecs":null,"originCountryCode":"AL","sourceCountryCode":null,"notes":null,"mfrName":null,"productCode":null,"prepayPercent":null,"deliveryPrice":"202.0"},{"id":10,"organizationId":10,"pricePerUnit":"2.04","paymentTerms":null,"packingSpecs":null,"originCountryCode":"CF","sourceCountryCode":null,"notes":null,"mfrName":"UUoo","productCode":"45678","prepayPercent":null,"deliveryPrice":"204.0"}],"description":"Intraocular lens IOL / Monofocal / PMMA / 3-piece / +12.5 / Opt ⌀6 mm / Overall ⌀12mm","qty":1000,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"City","deliveryBidRequested":true,"incoterm":"CIP"},"12":{"commodityId":42295524,"bids":[{"id":6,"organizationId":2,"pricePerUnit":"1.02","paymentTerms":null,"packingSpecs":null,"originCountryCode":"BS","sourceCountryCode":null,"notes":null,"mfrName":null,"productCode":null,"prepayPercent":null,"deliveryPrice":"100.0"}],"description":"Intraocular lens IOL / Monofocal / Hydrophilic / 3-piece / +4.5","qty":200,"deliveryDeadline":"2017-05-20","deliveryCountryCode":"AZ","deliveryRegionCode":"FUZ","deliveryCity":"Juili","deliveryBidRequested":true,"incoterm":"CIP"},"13":{"commodityId":42295524,"bids":[],"description":"Intraocular lens IOL / Bifocal / Hydrophobic / 3-piece / +21.5 / Aspheric zero","qty":4000,"deliveryDeadline":"2017-05-31","deliveryCountryCode":"BO","deliveryRegionCode":"N","deliveryCity":"Trior","deliveryBidRequested":true,"incoterm":"CIP"},"14":{"commodityId":42295524,"bids":[],"description":"Intraocular lens IOL / Monofocal / Hydrophobic / +0.5","qty":400,"deliveryDeadline":"2017-05-27","deliveryCountryCode":"BR","deliveryRegionCode":"MT","deliveryCity":"Ytr","deliveryBidRequested":true,"incoterm":"CIP"},"11":{"commodityId":42295524,"bids":[],"description":"Intraocular lens IOL","qty":1000,"deliveryDeadline":"2017-05-08","deliveryCountryCode":"BW","deliveryRegionCode":"KL","deliveryCity":"Hyu","deliveryBidRequested":true,"incoterm":"CIP"},"15":{"commodityId":42295524,"bids":[],"description":"Intraocular lens IOL / Bifocal / PMMA / 3-piece / +10.5 / Opt ⌀ 6.5 mm / Opt ⌀ 12.5 mm / Yellow / Cylinder +1.5 / Scleral fixation / Pediatric","qty":10000,"deliveryDeadline":"2017-05-27","deliveryCountryCode":"GD","deliveryRegionCode":"02","deliveryCity":"Bob","deliveryBidRequested":true,"incoterm":"CIP"},"42":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":900,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"Huu","deliveryBidRequested":false,"incoterm":"CIP"},"43":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":200,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"Hyrt","deliveryBidRequested":false,"incoterm":"CIP"},"29":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":300,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"Hrf","deliveryBidRequested":false,"incoterm":""},"37":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":800,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"Hty","deliveryBidRequested":false,"incoterm":"CIP"},"38":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":200,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"Hju","deliveryBidRequested":false,"incoterm":"CIP"},"39":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":100,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"Hii","deliveryBidRequested":false,"incoterm":"CIP"},"40":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":677,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"Ytr","deliveryBidRequested":false,"incoterm":"CIP"},"41":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":900,"deliveryDeadline":"","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"Gtt","deliveryBidRequested":false,"incoterm":"CIP"},"18":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol","qty":1000,"deliveryDeadline":"2017-05-31","deliveryCountryCode":"AI","deliveryRegionCode":"07","deliveryCity":"Hyu","deliveryBidRequested":true,"incoterm":"CIP"},"32":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":300,"deliveryDeadline":"","deliveryCountryCode":"AL","deliveryRegionCode":"02","deliveryCity":"City","deliveryBidRequested":false,"incoterm":"CIP"},"34":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":67,"deliveryDeadline":"","deliveryCountryCode":"AT","deliveryRegionCode":"3","deliveryCity":"Tyu","deliveryBidRequested":false,"incoterm":"CIP"},"36":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":800,"deliveryDeadline":"","deliveryCountryCode":"AX","deliveryRegionCode":"FN","deliveryCity":"Juyt","deliveryBidRequested":false,"incoterm":"CIP"},"35":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":333,"deliveryDeadline":"","deliveryCountryCode":"AX","deliveryRegionCode":"FN","deliveryCity":"Juyt","deliveryBidRequested":false,"incoterm":"CIP"},"33":{"commodityId":51101503,"bids":[],"description":"Chloramphenicol / 0.5% / 10ml","qty":20,"deliveryDeadline":"","deliveryCountryCode":"BS","deliveryRegionCode":"09","deliveryCity":"89","deliveryBidRequested":false,"incoterm":"CIP"},"28":{"commodityId":51101552,"bids":[],"description":"Ceftazidime / vial / 1000mg","qty":300,"deliveryDeadline":"","deliveryCountryCode":"BR","deliveryRegionCode":"AM","deliveryCity":"YYu","deliveryBidRequested":false,"incoterm":""},"21":{"commodityId":51101572,"bids":[],"description":"Azithromycin / 1.7% / 5.9ml","qty":100,"deliveryDeadline":"2017-05-08","deliveryCountryCode":"BH","deliveryRegionCode":"13","deliveryCity":"MO","deliveryBidRequested":true,"incoterm":"You"},"19":{"commodityId":51102713,"bids":[],"description":"Povidone iodine / 1% / 5ml","qty":500,"deliveryDeadline":"2017-05-31","deliveryCountryCode":"AS","deliveryRegionCode":"03","deliveryCity":"Boo","deliveryBidRequested":true,"incoterm":"CIP"},"20":{"commodityId":51111605,"bids":[],"description":"Fluorouracil / 1% / 5ml","qty":500,"deliveryDeadline":"2017-05-30","deliveryCountryCode":"AF","deliveryRegionCode":"ORU","deliveryCity":"Uuio","deliveryBidRequested":true,"incoterm":"CIP"},"30":{"commodityId":51151504,"bids":[],"description":"Pilocarpine nitrate / vial / 1ml","qty":700,"deliveryDeadline":"","deliveryCountryCode":"TD","deliveryRegionCode":"BG","deliveryCity":"Hygt","deliveryBidRequested":false,"incoterm":"CIP"},"31":{"commodityId":51151512,"bids":[],"description":"Neostigmine methylsulfate / 0.25% / 1ml","qty":25,"deliveryDeadline":"2017-05-31","deliveryCountryCode":"AF","deliveryRegionCode":"BDS","deliveryCity":"HDG","deliveryBidRequested":true,"incoterm":"CIP"},"17":{"commodityId":51181704,"bids":[],"description":"Dexamethasone","qty":1000,"deliveryDeadline":"2017-05-31","deliveryCountryCode":"AI","deliveryRegionCode":"07","deliveryCity":"City","deliveryBidRequested":true,"incoterm":"CIP"},"22":{"commodityId":51241114,"bids":[],"description":"Pilocarpine hydrochloride / bottle / 0.5% / 10ml","qty":200,"deliveryDeadline":"2017-05-29","deliveryCountryCode":"TV","deliveryRegionCode":"NMA","deliveryCity":"Hnu","deliveryBidRequested":true,"incoterm":"CIP"}}}

function mapStateToProps(store) {
    // return { commodities: store.commodities, tenders: store.tenders, agGridModule: store.agGridModule }
    return { commodities: { commodities: { 42295524: {commodity_name: "Intraocular lens IOL"} } }, tenders: tendersAll.tenders } // #NONET
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
            // {headerName: "Product / Destination", cellRenderer: 'group', comparator: this.sortGroupBy.bind(this), checkboxSelection: true},
            // {headerName: "Bids", cellRenderer: 'group'}, // with two columns configured as cellRenderer: 'group', but behave the same (get the same display values)
            {headerName: "Bids", cellRenderer: 'group', checkboxSelection: true},
            // {headerName: 'Product', rowGroupIndex: 0, valueGetter: this.gridGetCommodityName.bind(this), hide: true},
            {headerName: 'Product', valueGetter: this.gridGetCommodityName.bind(this), sort: 'asc'},
            // {headerName: 'Product', valueGetter: this.gridGetCommodityName.bind(this), rowGroupIndex: 0, enableRowGroup: true},
            {headerName: 'Description', valueGetter: this.gridCalcDescription.bind(this), sort: 'asc', onCellClicked: function(params) {
                params.node.expanded = !params.node.expanded;
                params.api.onGroupExpandedOrCollapsed();
            }},
            {headerName: 'Country', valueGetter: this.gridGetCountryName.bind(this), sort: 'asc'},
            // {headerName: 'Country', valueGetter: this.gridGetCountryName.bind(this), rowGroupIndex: 1, enableRowGroup: true},
            // {headerName: 'Region', field: 'deliveryRegionCode'},
            {headerName: 'Region', valueGetter: this.gridGetRegionName.bind(this), sort: 'asc'},
            {headerName: 'City', field: 'deliveryCity', sort: 'asc'},
            {headerName: 'Incoterm', field: 'incoterm'},

            {headerName: 'Quantity', field: 'qty', cellStyle: {'text-align': 'right'}},
            ],
            rowData: Object.values(this.props.tenders)
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
        console.log("==== gridParams gridGetCountryName = ", gridParams)
        if (gridParams.data === null || !gridParams.data.deliveryCountryCode) {
            return ''
        }
        return getCountryName(gridParams.data.deliveryCountryCode)
    }

    gridGetRegionName(gridParams) {
        // console.log("==== gridParams getRegionName = ", gridParams)
        if (gridParams.data === null || !gridParams.data.deliveryCountryCode || !gridParams.data.deliveryRegionCode) {  // this may be necessary because it's called for grouped rows that don't display a region?
            return ''
        }
        return getRegionName(gridParams.data.deliveryCountryCode, gridParams.data.deliveryRegionCode)
    }

    gridGetCommodityName(gridParams) {
        if (gridParams.data === null || !gridParams.data.commodityId) {
            return ''
        }
        return this.getCommodityName(gridParams.data.commodityId)
    }

    getCommodityName(commodityId) {
        const comm = this.props.commodities.commodities[commodityId]
        if (!comm) {
            return `comm ${commodityId} not found`
        }
        return this.props.commodities.commodities[commodityId]['commodity_name']
    }

    gridCalcDescription(gridParams) {
        let description = ''
        if (gridParams.data && gridParams.data.description) {
            const match = gridParams.data.description.match(/\/\s*(.*)$/)  // extract description after first /
            if (match) {
                description = match[1]
            }
        }
        return description
    }

    onGridReady(params) {
        console.log("==== ag-grid ready, params = ", params)
        this.api = params.api
        this.columnApi = params.columnApi
        setTimeout( this.columnApi.autoSizeColumns(this.columnApi.getAllColumns()) )
    }

    getRowHeight(params) {
        let rowIsDetailRow = params.node.level === 1;
        // return 100 when detail row, otherwise return 25
        return rowIsDetailRow ? 100 : 25;
    }

    getNodeChildDetails(record) {  // any row of grid could be passed in here, not just parent row with children
        console.log("==== getNodeChildDetails passed record ", record)
        if (Array.isArray(record.bids) && record.bids.length > 0) {
            console.log("==== this record has bids")
            return {
                group: true,
                // the key is used by the default group cellRenderer
                key: 'Bids',
                // provide ag-Grid with the children of this group
                children: [record.bids]
                // for demo, expand the third row by default
                // expanded: record.account === 177005
            }
        } else {
            console.log("==== this record has NO bids")
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
                        // const fullWidth = rowNode.level != 2
                        const fullWidth = rowNode.level === 1
                        console.log(`==== fullWidth = ${fullWidth}, rowNode.level = `, rowNode.level)  // shows correct values in browser console when row is expanded, then no other logging occurs
                        return fullWidth
                    }}
                    getRowHeight={this.getRowHeight}
                    // the problem with providing our own fullWidthCellRenderer is we lose the automatic full width cell
                    // output done by ag-grid for product and country
                    // fullWidthCellRenderer={this.DetailPanelCellRenderer.bind(this)}
                    // fullWidthCellRenderer={DetailPanelCellRenderer}
                    fullWidthCellRendererFramework={BidsGrid} // React Component
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
                    // groupsUseEntireRow="true"
                    // groupSuppressAutoColumn="true"
                    // rowSelection="multiple"
                    enableSorting={true}
                    enableFilter={true}
                    floatingFilter={true}
                    // suppressMenuFilterPanel={true}
                    // rowHeight="22"
                    enableColResize={true}
                    getNodeChildDetails={this.getNodeChildDetails}
                />
            </div>)
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid)