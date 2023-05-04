import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Link, useParams } from 'react-router-dom';
import * as $ from 'jquery';
import random from 'random';
import api from '../../constants/api';
import message from '../Message';
import ComponentCard from '../ComponentCard';

const InvoiceData = ({ editInvoiceData, setEditInvoiceData, projectInfo }) => {
  InvoiceData.propTypes = {
    editInvoiceData: PropTypes.bool,
    setEditInvoiceData: PropTypes.func,
    projectInfo: PropTypes.any,
  };
  //All state Varible
  const { id } = useParams();
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentTerms, setPaymentTerms] = useState('');
  const [createInvoice, setCreateInvoice] = useState({
    discount: '',
    quote_code: '',
    po_number: '',
    project_location: '',
    project_reference: '',
    invoice_date: '',
    code: '',
    so_ref_no: '',
    site_code: '',
    attention: '',
    reference: '',
    invoice_terms: '',
    status: 'due',
    paymentTerms: '',
    invoice_code: '',
    order_id: id,
    invoice_due_date:'',
  });
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      unit: '',
      qty: '',
      unit_price: '',
      total_cost: '',
      remarks: '',
      item_title: '',
      description: '',
    },
  ]);

  //setting data in createinvoice
  const handleInserts = (e) => {
    setCreateInvoice({ ...createInvoice, [e.target.name]: e.target.value });
  };
  const handleDataEditor = (e, type) => {
    setCreateInvoice({
      ...createInvoice,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };

  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    obj.order_id = projectInfo;
    api
      .post('/finance/insertInvoiceItem', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
      })
      .catch(() => {
        message('Cannot Add Line Items', 'error');
      });
  };
  //final api call
  const finalinsertapi = (receipt, results) => {
    for (let j = 0; j < results.length; j++) {
      addLineItemApi({
        description: results[j].description,
        invoice_id: receipt,
        amount: results[j].total_cost,
        item_title: results[j].item_title,
        item_code: projectInfo.item_code,
        cost_price: 2,
        qty: results[j].qty,
        unit: results[j].unit,
        remarks: results[j].remarks,
        unit_price: parseFloat(results[j].unit_price),
      });
    }
  };

  //Insert Invoice
  const insertInvoice = async (code,results) => {
    createInvoice.invoice_amount = totalAmount + (7 / 100) * totalAmount;
    createInvoice.order_id = id;
    createInvoice.invoice_code = code;

    const now = new Date();
    if (now.getMonth() === 11) {
        const current = new Date(now.getFullYear() + 1, 0, now.getDate());
        createInvoice.invoice_due_date=current;
          } else {
        const current = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
        createInvoice.invoice_due_date=current;
    }
   
    api
      .post('/finance/insertInvoice', createInvoice)
      .then((res) => {
        message('Invoice inserted successfully.', 'success');
        finalinsertapi(res.data.data.insertId, results);
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Network connection error.');
      });
  };
  //generateCode
  const generateCode = (results, type) => {
    api
      .post('/commonApi/getCodeValue', { type })
      .then((res) => {
        insertInvoice(results, res.data.data);
      })
      .catch(() => {
        insertInvoice(results, '');
      });
  };

 

  //Add new line item
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        uom: '',
        qty: '',
        unitprice: '',
        total_cost: '',
        remarks: '',
        item: '',
        description: '',
      },
    ]);
  };

  //Invoice item values
  const getAllValues = () => {
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    setTotalAmount(0);
    setAddLineItem([
      {
        id: random.int(1, 99),
        unit: '',
        qty: '',
        unit_price: '',
        total_cost: '',
        remarks: '',
        item_title: '',
        description: '',
      },
    ]);
    generateCode(result, 'invoice');
  };
  //Invoice Items Calculation
  const calculateTotal = () => {
    let totalValue = 0;
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
          allValues.total_cost = allValues.qty * allValues.unit_price;
        });
      result.push(allValues);
    });
    result.forEach((e) => {
      if (e.total_cost) {
        totalValue += parseFloat(e.total_cost);
      }
    });
    setAddLineItem(result);
    setTotalAmount(totalValue);
  };

  // Clear row value
  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
    if (ind.total_cost) {
      const finalTotal = totalAmount - parseFloat(ind.total_cost);
      setTotalAmount(finalTotal);
    }
  };
  return (
    <>
      <Modal size="xl" isOpen={editInvoiceData}>
        <ModalHeader>
          Create Invoice
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditInvoiceData(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <Card>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
                <Row>
                  <Col md="3">
                    <Button
                      className="shadow-none"
                      color="primary"
                      type="button"
                      onClick={() => {
                        AddNewLineItem();
                      }}
                    >
                      Add Line Item
                    </Button>
                  </Col>
                  {/* Invoice Detail */}
                  <Row>
                    {/* <Col md="4">
                            <FormGroup>
                              <Label>Invoice Code</Label>
                              <Input
                                type="text"
                                onChange={handleInserts}
                                name="invoice_code"
                              />
                            </FormGroup>
                          </Col> */}
                         <Col md="4">
                      <FormGroup>
                        <Label>Discount</Label>
                        <Input
                          type="number"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.discount}
                          name="discount"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Quote Code</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.quote_code}
                          name="quote_code"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>PO Number</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.po_number}
                          name="po_number"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Project Location</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.project_location}
                          name="project_location"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Project Reference</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.project_reference}
                          name="project_reference"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Invoice date</Label>
                        <Input
                          type="date"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.invoice_date}
                          name="invoice_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Code</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.code}
                          name="code"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>SO Ref Number</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.so_ref_no}
                          name="so_ref_no"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Site Code</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.site_code}
                          name="site_code"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Attention</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.attention}
                          name="attention"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Reference</Label>
                        <Input
                          type="textarea"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.reference}
                          name="reference"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Invoice Terms</Label>
                        <Input
                          type="text"
                          onChange={handleInserts}
                          value={createInvoice && createInvoice.invoice_terms}
                          name="invoice_terms"
                        />
                      </FormGroup>
                    </Col>
                 
                    {/* Description form */}
                    <ComponentCard title="Description">
                      <Editor
                        editorState={paymentTerms}
                        wrapperClassName="demo-wrapper mb-0"
                        editorClassName="demo-editor border mb-4 edi-height"
                        onEditorStateChange={(e) => {
                          handleDataEditor(e, 'payment_terms');
                          setPaymentTerms(e);
                        }}
                      />
                    </ComponentCard>
                  </Row>
                  <Card>
                  {/* Invoice Item */}
                  <table className="lineitem">
                    <thead>
                      <tr>
                        <th scope="col">Item</th>
                        <th scope="col">Description </th>
                        <th scope="col">UoM</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Total Price</th>
                        <th scope="col">Remarks</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {addLineItem.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td data-label="Item">
                              <Input defaultValue={item.item} type="text" name="item_title" />
                            </td>
                            <td data-label="Description">
                              <Input
                                defaultValue={item.description}
                                type="text"
                                name="description"
                              />
                            </td>
                            <td data-label="UoM">
                              <Input defaultValue={item.unit} type="text" name="unit" />
                            </td>
                            <td data-label="Qty">
                              <Input defaultValue={item.qty} type="number" name="qty" />
                            </td>
                            <td data-label="Unit Price">
                              <Input
                                defaultValue={item.unit_price}
                                onBlur={() => {
                                  calculateTotal();
                                }}
                                type="number"
                                name="unit_price"
                              />
                            </td>
                            <td data-label="Total Price">
                              <Input
                                defaultValue={item.total_cost}
                                type="text"
                                name="total_cost"
                                disabled
                              />
                            </td>
                            <td data-label="Remarks">
                              <Input defaultValue={item.remarks} type="text" name="remarks" />
                            </td>
                            <td data-label="Action">
                              <Link to="">
                                <Input type="hidden" name="id" defaultValue={item.id}></Input>
                                <span
                                  onClick={() => {
                                    ClearValue(item);
                                  }}
                                >
                                  Clear
                                </span>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  </Card>
                  <ModalFooter>
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        getAllValues();
                      }}
                    >
                      {' '}
                      Submit{' '}
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setEditInvoiceData(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Row>
              </Form>
            </Col>
          </Row>
        </ModalBody>
        </Card>
      </Modal>
    </>
  );
};

export default InvoiceData;
