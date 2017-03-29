import React from 'react';
import StoreHelpers from '../shared/storeHelpers.es6';
import { Treebeard } from 'react-treebeard';
import { StyleRoot } from 'radium';
import styles from '../client/styles.es6';
import ProductForm from '../components/productForm.es6';

export default class Catalog extends React.Component {
    constructor(props){
        super(props);
        this.state = { data: StoreHelpers.getProducts(), cursor: null };
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle(node, toggled){
        // console.log(`==== got onToggle with toggled = ${toggled} loading = ${node.loading} and node = `, node);
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }

    // componentWillUpdate(_, nextState) {
    //     console.log("==== app nextState = ", nextState)
    // }

    render () {
        return (
            <div id='catalog'>
                <div className='title'>
                    Catalog
                </div>
                <StyleRoot>
                    <div style={styles.component}>
                        <Treebeard
                            style={styles}
                            className='product-tree'
                            data={this.state.data}
                            onToggle={this.onToggle}
                        />
                    </div>
                    <div style={styles.component}>
                        <ProductForm node={this.state.cursor}/>
                    </div>
                </StyleRoot>
            </div>
        )
    }
}
