"use strict"
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem, updateCart, getCart } from '../../actions/cartActions';

class Cart extends React.Component {
    componentDidMount(){
      this.props.getCart();
    }
    //Delete function
    onDelete(_id) {

        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex(
            function (cart) {
                return cart._id === _id;
            }
        )
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
            ...currentBookToDelete.slice(indexToDelete + 1)]

        this.props.deleteCartItem(cartAfterDelete);
    }

    //Increment
    onIncrement(_id) {
        this.props.updateCart(_id, 1, this.props.cart);
    }

    //Decrement
    onDecrement(_id, quantity) {
        if (quantity > 1) {
            this.props.updateCart(_id, -1, this.props.cart);
        }
    }

    constructor() {
        super();
        this.state = {
            showmodel:false
        }
    }
    open() {
        this.setState({ showModal:true})
    }
    close() {
        this.setState({showModal:false})
    }

    //Is cart empty or does it have at least one thing?
    render() {
        if (this.props.cart[0]) {
            return this.renderCart();
        } else {
            return this.renderEmpty();
        }
    }

    //Render empty cart
    renderEmpty() {
        return(<div></div>)
    }

    //Render cart with something in it
    renderCart() {
        const cartItemList = this.props.cart.map(function (cartArr) {
            return (
                <Panel key={cartArr._id}>
                    <Row>
                        <Col xs={12} sm={4}>
                            <h6>{cartArr.title}</h6><span>   </span>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>{cartArr.price}</h6>
                        </Col>
                        <Col xs={12} sm={2}>
                            <h6>Qty. <Label bsStyle="success"></Label>{cartArr.quantity}</h6><span>   </span>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup style={{ minWidth: 300 }}>
                                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                                <span>  </span>
                                <Button onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">Delete</Button>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Panel>
                )
        }, this)
        return (
            <Panel header="Cart" bsStyle="primary">
                {cartItemList}
                <Row>
                    <Col xs={12}>
                        <h6>Total amount: {this.props.totalAmount}</h6>
                        <Button onClick={this.open.bind(this)} bsStyle="success">
                            Proceed to checkout
                        </Button>
                    </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thanks!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h6>Your order has been saved!</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col>
                            <h6>Total cahes $$: {this.props.totalAmount}</h6>
                        </Col>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>
            )
    }

}

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteCartItem: deleteCartItem,
        updateCart: updateCart,
        getCart:getCart,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
