import { Button, Modal } from 'react-bootstrap';
import React from 'react';

export default function AddressModal(props) {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <React.Fragment>
            <Button className="btn-danger" onClick={() => setShowModal(true)}>Checkout</Button>
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Choose your shipping address
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div>
                            <select className="form-select" name="selectAddress"
                                value={props.selectAddress} onChange={props.updateSelect}>
                                <option>Select shipping address</option>
                                <option value="1">Registered address</option>
                                <option value="2">Add new address</option>
                            </select>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Email: </label>
                                <input type="text" className="form-control" placeholder="customer@email.com"
                                    name="customer_email" value={props.customer_email} onChange={props.updateFormField} />
                            </div>
                            <div className="col-6">
                                <label>Block & Street: </label>
                                <input type="text" className="form-control" placeholder="blk 855, yishun ring road"
                                    name="block_street" value={props.block_street} onChange={props.updateFormField} />
                            </div>
                            <div className="col-3">
                                <label>Unit: </label>
                                <input type="text" className="form-control" placeholder="#04-256"
                                    name="unit" value={props.unit} onChange={props.updateFormField} />
                            </div>
                            <div className="col-3">
                                <label>Postal Code: </label>
                                <input type="text" className="form-control" placeholder="719414"
                                    name="postal" value={props.postal} onChange={props.updateFormField} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-danger my-2" onClick={props.Checkout}>Proceed to checkout</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}