import React, { useState, useEffect } from 'react';
import {
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Table,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import DuctingCostModal from '../../components/ProjectModal/DuctingCostModal';
import ViewQuoteLogModal from '../../components/ProjectModal/ViewQuoteLogModal';
import ViewLineItemModal from '../../components/ProjectModal/ViewLineItemModal';
import EditQuotation from '../../components/ProjectModal/EditQuotation';
import QuotationMoreDetails from '../../components/ProjectModal/QuotationMoreDetails';
import CreateFinance from '../../components/ProjectModal/CreateFinance';
import AddPurchaseOrderModal from '../../components/ProjectModal/AddPurchaseOrderModal';
import MaterialsusedTab from '../../components/ProjectModal/MaterialsusedTab';
import EditDeliveryOrder from '../../components/ProjectModal/EditDeliveryOrder';
import EditPoModal from '../../components/ProjectModal/EditPoModal';
import EditPOLineItemsModal from '../../components/ProjectModal/EditPOLineItemsModal';
import AttachmentModal from '../../components/tender/AttachmentModal';
import ViewFileComponent from '../../components/ProjectModal/ViewFileComponent';
import SubConWorkOrderPortal from '../../components/ProjectModal/SubConWorkOrderPortal';
//import SubconWorkPaymentHistory from '../../components/ProjectModal/SubconWorkPaymentHistory';
import MaterialsTransferred from '../../components/ProjectModal/MaterialsTransferred';
import FinanceTab from '../../components/ProjectModal/FinanceTab';
import message from '../../components/Message';
import api from '../../constants/api';
import ProjectButton from '../../components/ProjectTable/ProjectButton';
import PdfMaterialPurchaseOrder from '../../components/PDF/PdfMaterialPurchaseOrder';
import PdfDeliveryOrder from '../../components/PDF/PdfDeliveryOrder';
import NewPcModal from '../../components/ProjectModal/NewPcModal';
import ClaimItems from '../../components/ProjectModal/ClaimItems';
import EditClaimModal from '../../components/ProjectModal/EditClaimModal';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/tender/AttachmentModalV2';
import EditPc from '../../components/ProjectModal/EditPc';
import CostingSummary from '../../components/projectTabContent/CostingSummary';
import TransferModal from '../../components/ProjectModal/TransferModal';
import AddEmployee from '../../components/projectTabContent/AddEmployee';

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Project');
  };

  const [projectDetail, setProjectDetail] = useState();
  const [getCostingSummary, setGetCostingSummary] = useState();

  const [activeTab, setActiveTab] = useState('1');
  // const [editCostingSummaryModel, setEditCostingSummaryModel] = useState(false);
  const [addDuctingCostModal, setAddDuctingCostModal] = useState(false);
  const [viewQuotationsModal, setViewQuotationsModal] = useState(false);
  
  const [viewLineModal, setViewLineModal] = useState(false);
  const [editQuoteModal, setEditQuoteModal] = useState(false);
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  // const [claimAttachmentModal, setClaimAttachmentModal] = useState(false);
  const [tabdeliveryorder, setTabdeliveryorder] = useState();
  const [tabPurchaseOrderLineItemTable, setTabPurchaseOrderLineItemTable] = useState();
  const [checkId, setCheckId] = useState([]);
  const [editDeliveryOrder, setEditDeliveryOrder] = useState(false);
  const [editPo, setEditPo] = useState(false);
  const [editPOLineItemsModal, setEditPOLineItemsModal] = useState(false);
  const [deliveryData, setDeliveryData] = useState('');
  const [POId, setPOId] = useState('');
  const [pcId, setPcId] = useState();
  const [pc, setPc] = useState();
  const [gTotal, setGtotal] = useState(0);
  const [gTotal1, setGtotal1] = useState(0);
  const [gTotal2, setGtotal2] = useState(0);
  const [gTotal3, setGtotal3] = useState(0);
  const [gTotal4, setGtotal4] = useState(0);
  const [gTotal5, setGtotal5] = useState(0);
  const [types, setTypes] = useState(0);
  
 
  //const [charges, setCharges]=useState([]);
  const [chargesdetails, setChargesDetails] = useState();
  const [workOrderForm, setWorkOrderForm] = useState({
    work_order_date: '',
    status: '',
  });

  const [testJsonData, setTestJsonData] = useState(null);

  useEffect(() => {
    api
      .post('/purchaseorder/testAPIendpoint', { project_id: id })
      .then((res) => {
        setTestJsonData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleClientForms = (e) => {
    setWorkOrderForm({ ...workOrderForm, [e.target.name]: e.target.value });
  };
  const [selectedPoProducts, setSelectedPoProducts] = useState([]);
  const [transferModal, setTransferModal] = useState(false);
  const [transferItem, setTransferItem] = useState({});
  const [newPcModal, setNewPcModal] = useState(false);
  const [financeModal, setFinanceModal] = useState(false);
  // const [editModal, setEditModal] = useState(false);
  const [editPcModal, setEditPcModal] = useState(false);
  const [pcItems, setPcItems] = useState(false);
  const [editClaimModal, setEditClaimModal] = useState(false);
  const [claimData, setClaimData] = useState({});
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [contactLinked, setContactLinked] = useState('');
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  // const editCostingSummaryToggle = () => {
  //   setEditCostingSummaryModel(!editCostingSummaryModel);
  //   };

  // Get Project By Id

  const getProjectById = () => {
    api
      .post('/project/getProjectsByID', { project_id: id })
      .then((res) => {
        setProjectDetail(res.data.data);
      })
      .catch(() => {
        message('Costing Summary not found', 'info');
      });
  };
  // const getLoanById = () => {
  //   api
  //     .post('/loan/getLoanById', { loan_id: id })
  //     .then((res) => {
  //       setLoanDetails(res.data.data[0]);
  //       setLoanStatus(res.data.data[0].status);
  //       getPreviousEarlierLoan(res.data.data[0].employee_id);
  //     })
  //     .catch(() => {
  //       message('Loan Data Not Found', 'info');
  //     });
  // };

  

    // Fetch Costing Summary
    const getCostingbySummary = () => {
      api
        .post('/projecttabcostingsummary/getTabCostingSummaryById', { project_id: id })
        .then((res) => {
          setGetCostingSummary(res.data.data);
        })
        .catch(() => {
          message('costing summary data not found', 'info');
        });
    };

  
  //Api call for getting Vehicle Fuel Data By ID
  const getTransportChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Transport Charges',
      })
      .then((res) => {
        setChargesDetails(res.data.data);

        let grandTotal = 0;

        res.data.data.forEach((elem) => {
          grandTotal += elem.amount;
        });
        setGtotal(grandTotal);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  const getLabourChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Total Labour Charges',
      })
      .then((res) => {
        setChargesDetails(res.data.data);
        console.log(chargesdetails);
        let grandTotal1 = 0;
        res.data.data.forEach((elem) => {
          grandTotal1 += elem.amount;
        });

        setGtotal1(grandTotal1);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };
  const getSalesmanCommissionById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Salesman Commission',
      })
      .then((res) => {
        console.log("getCostingSummaryChargesById",res)
        setChargesDetails(res.data.data);
        let grandTotal2 = 0;
        res.data.data.forEach((elem) => {
          grandTotal2 += elem.amount;
        });

        setGtotal2(grandTotal2);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  const getFinancesChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Finance Charges',
      })
      .then((res) => {
        setChargesDetails(res.data.data);
        let grandTotal3 = 0;

        res.data.data.forEach((elem) => {
          grandTotal3 += elem.amount;
        });

        setGtotal3(grandTotal3);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };
  
  const getOfficeOverheadsById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Office Overheads',
      })
      .then((res) => {
        setChargesDetails(res.data.data);
        setTypes(types);
        let grandTotal4 = 0;
        res.data.data.forEach((elem) => {
          grandTotal4 += elem.amount;
        });

        setGtotal4(grandTotal4);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };
  const getOtherChargesById = () => {
    api
      .post('/projecttabcostingsummary/getCostingSummaryChargesById', {
        project_id: id,
        title: 'Other Charges',
      })
      .then((res) => {
        setChargesDetails(res.data.data);
        let grandTotal5 = 0;

        res.data.data.forEach((elem) => {
          grandTotal5 += elem.amount;
        });

        setGtotal5(grandTotal5);
      })
      .catch(() => {
        message('Costing Summary Data Not Found', 'info');
      });
  };

  // Get ProjectClaim By ProjectId

  const getProjectClaimById = () => {
    api
      .post('/claim/TabClaimPortal', { project_id: id })
      .then((res) => {
        setClaimData(res.data.data[0]);
      })
      .catch(() => {
        message('Project claim not found', 'info');
      });
  };
  const getContactById = () => {
    api
      .get('/project/getcontactById', contactLinked)
      .then((res) => {
        setContactLinked(res.data.data);
      })
      .catch(() => {
        message('Project contact not found', 'info');
      });
  };



  // Edit Project

  const handleInputs = (e) => {
    setProjectDetail({ ...projectDetail, [e.target.name]: e.target.value });
  };

  const UpdateData = () => {
    api.post('/project/edit-Project', projectDetail).then(() => {
      message('Record editted successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });
  };

  //insert project claim
  const insertProjectClaim = () => {
    const newclaim = {};
    newclaim.date = new Date();
    newclaim.project_id = id;
    newclaim.status = 'In Progress';
    newclaim.amount = 0.0;
    newclaim.project_title = projectDetail.title;
    api.post('/claim/insertProjectClaim', newclaim).then(() => {
      message('Claim added successfully', 'success');
      setTimeout(() => {
        // window.location.reload()
      }, 300);
    });
  };

  // Tab PurchaseOrder LineItem Table
  const TabPurchaseOrderLineItemTable = () => {
    api.post('/purchaseorder/TabPurchaseOrderLineItemTable', { project_id: id }).then((res) => {
      let arrayOfObj = Object.entries(res.data.data).map((e) => ({ id: e[0], data: e[1] }));
      arrayOfObj = arrayOfObj.reverse();
      setTabPurchaseOrderLineItemTable(arrayOfObj);
      console.log('Tab PurchaseOrder LineItem Table', arrayOfObj);
    });
  };

  // Tab Delivery Order

  const TabDeliveryOrder = () => {
    api
      .post('/projecttabdeliveryorder/TabDeliveryOrder', { project_id: id })
      .then((res) => {
        // console.log("Tab delivery order",res.data.data)
        setTabdeliveryorder(res.data.data);
      })
      .catch(() => {
        message('Tab Delivery Order not found', 'info');
      });
  };
//checked objects
const getCheckedPoProducts = (checkboxVal, index,Obj) => {
  if (checkboxVal.target.checked === true) {
    setSelectedPoProducts([...selectedPoProducts, Obj]);
  } if(checkboxVal.target.checked!==true){
    const copyselectedPoProducts=[...selectedPoProducts];
    copyselectedPoProducts.splice(index,1);
    setSelectedPoProducts(copyselectedPoProducts);
    }
 
};
  //Add to stocks

  const addQtytoStocks = () => {
    if (selectedPoProducts) {
      selectedPoProducts.forEach((elem) => {
        if (elem.status !== 'Closed') {
          elem.status = 'Closed';
          elem.qty_updated = elem.qty_delivered;
          elem.qty_in_stock += parseFloat(elem.qty_delivered);
          api.post('/product/edit-ProductQty', elem);
          api
            .post('/purchaseorder/editTabPurchaseOrderLineItem', elem)
            .then(() => {
              api
                .post('/inventory/editInventoryStock', elem)
                .then(() => {
                  message('Quantity updated in inventory successfully.', 'success');
                })
                .catch(() => {
                  // console.log('Network connection error.');
                  message('unable to update quantity in inventory.', 'danger');
                });
              // console.log('elem', elem);
              message('Quantity added successfully.', 'success');
            })
            .catch(() => {
              // console.log('Network connection error.');
              message('unable to add quantity.', 'danger');
            });
        } else {
          message('This product is already added', 'danger');
        }
      });
    } else {
      alert('Please select atleast one product');
    }
  };

  // //checked objects
  // const getCheckedPoProducts = (checkboxVal, index,Obj) => {
  //   if (checkboxVal.target.checked === true) {
  //     setSelectedPoProducts([...selectedPoProducts, Obj]);
  //   } if(checkboxVal.target.checked!==true){
  //     const copyselectedPoProducts=[...selectedPoProducts];
  //     copyselectedPoProducts.splice(index,1);
  //     setSelectedPoProducts(copyselectedPoProducts);
  //     }

  // };

  // Delete Purchase Order
  const deletePurchaseOrder = (deletePurchaseOrderId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/purchaseorder/deletePurchaseOrder', { purchase_order_id: deletePurchaseOrderId })
          .then(() => {
            Swal.fire('Deleted!', 'Purchase Order has been deleted.', 'success');
            window.location.reload();
            setViewLineModal(false);
          })
          .catch(() => {
            message('Unable to Delete Purchase Order', 'info');
          });
      }
    });
  };

  // handleCheck

  const handleCheck = (e, item) => {
    let updatedList = [...checkId];

    if (e.target.checked) {
      //[{id:'',qty:''},{id:'',qty:''}]
      // updatedList = [...checkId, { id: item.po_product_id, qty: item.qty }];
      updatedList = [...checkId, { item }];
    } else {
      const indexOfObject = updatedList.findIndex((object) => {
        return object.id === item.po_product_id;
      });

      updatedList.splice(indexOfObject, 1);
    }
    console.log('checked',updatedList)
    setCheckId(updatedList);
  };

  const insertDeliveryHistoryOrder = (proId, deliveryOrderId) => {
    api
      .post('/projecttabdeliveryorder/insertDeliveryHistoryOrder', {
        product_id: proId.id,
        purchase_order_id: null,
        delivery_order_id: deliveryOrderId,
        status: '1',
        quantity: proId.qty,
        creation_date: '2022-12-17',
        modification_date: '2022-12-17',
        remarks: 'test',
      })
      .then(() => {
        message('Delivery Order Item Inserted', 'success');
      })
      .catch(() => {
        message('Unable to add Delivery Order Item', 'error');
      });
  };

  const insertDelivery = () => {
    const isEmpty = Object.keys(checkId).length === 0;

    if (isEmpty) {
      Swal.fire('Please select atleast one product!');
    } else {
      api
        .post('/projecttabdeliveryorder/insertdelivery_order', {
          project_id: id,
          company_id: projectDetail.company_id,
          purchase_order_id: '',
          date: new Date(),
          created_by: '1',
          creation_date: new Date(),
          modified_by: '1',
          modification_date: new Date(),
        })
        .then((res) => {
          console.log(res.data.data.insertId);

          const selectedProducts = checkId;
          setCheckId([]);
          selectedProducts.forEach((element) => {
            console.log('this is new', element);
            insertDeliveryHistoryOrder(element, res.data.data.insertId);
          });
        })
        .catch(() => {
          message('Unable to add delivery order.', 'error');
        });
    }
  };

  // deleteDeliveryOrder

  const deleteDeliveryOrder = (deliveryOrderId) => {
    Swal.fire({
      title: `Are you sure?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/projecttabdeliveryorder/deletedelivery_order', {
            delivery_order_id: deliveryOrderId,
          })
          .then((res) => {
            console.log(res);
            Swal.fire('Deleted!', 'Delivery Order has been deleted.', 'success');
            //setViewLineModal(false)

            window.location.reload();
          })
          .catch(() => {
            message('Unable to Delete Delivery Order', 'info');
          });
      }
    });
  };

  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
    console.log('inside DataForAttachment');
  };

  // Work Insert
  const insertWorkOrder = async (code) => {
    const newWorkOrderId = workOrderForm;
    newWorkOrderId.project_id = id;
    newWorkOrderId.sub_con_worker_code = code;
    api
      .post('/projecttabsubconworkorder/insertsub_con_work_order', newWorkOrderId)
      .then(() => {
        message('WorkOrder inserted successfully.', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  };
  //generateCode
  const generateCode = (type) => {
    api
      .post('/commonApi/getCodeValue', { type })
      .then((res) => {
        insertWorkOrder(res.data.data);
      })
      .catch(() => {
        insertWorkOrder('');
      });
  };
  useEffect(() => {
    getCostingbySummary();
    getOtherChargesById();
    getProjectById();
    TabDeliveryOrder();
    TabPurchaseOrderLineItemTable();
    getProjectClaimById();
    getTransportChargesById();
    getSalesmanCommissionById();
    getFinancesChargesById();
    getOfficeOverheadsById();
    getLabourChargesById();
    getContactById();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      TabPurchaseOrderLineItemTable();
    }, 2000);
  }, [addPurchaseOrderModal]);

  const getTotalOfPurchase = (pItems) => {
    let total = 0;
    pItems.forEach((a) => {
      total += parseInt(a.qty, 10) * parseFloat(a.cost_price, 10);
    });
     return total
  };

  // render table in group based on same id's
  function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = item[key];
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {});
}

  function renderTable(group) {
    return (
      <>
      {/* <p><>{console.log(group[0].company_name)}</></p> */}

      <Row key={group[0].company_name}>
                      <CardTitle
                        tag="h4"
                        className="border-bottom bg-secondary p-2 mb-0 text-white"
                      >
                        <Row>
                          <Col>{group[0].company_name}</Col>
                          <Col>
                            <Link to="" style={{ color: '#fff' }}>
                              <span
                                onClick={() => {
                                  setEditPo(true);
                                  setPOId(group);
                                }}
                              >
                                <u> Edit Po </u>
                              </span>
                            </Link>
                          </Col>
                          <Col>
                            <Link to="" style={{ color: '#fff' }}>
                              <span
                                onClick={() => {
                                  setEditPOLineItemsModal(true);
                                  setPOId(group);
                                }}
                              >
                                <u> Edit Line Items </u>
                              </span>
                            </Link>
                          </Col>
                          <Col>
                            <span>
                              <u> print pdf </u>
                            </span>
                          </Col>
                          <Col> Total : {getTotalOfPurchase(group)}</Col>
                          <Col className="d-flex justify-content-end">
                            <Button
                              color="primary"
                              className="shadow-none"
                              onClick={() => {
                                deletePurchaseOrder(group[0].purchase_order_id);
                              }}
                            >
                              X
                            </Button>
                          </Col>
                        </Row>
                      </CardTitle>
                    </Row>
      <Table key={group[0].purchase_order_id} id="example" className="display border border-secondary rounded">
        <thead>
          <tr>
            <th>D.O</th>
            <th>Title</th>
            <th>Qty</th>
            <th>UOM</th>
          <th>Unit Price</th>
            <th>Amount</th>
            <th>Status</th>
         <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {group.map((item,index) => (
            
            <tr key={item.po_product_id}>
              <td> <FormGroup>
                                <Input
                                  type="checkbox"
                                  value={item.purchase_order_id}
                                  onChange={(e) => {
                                    getCheckedPoProducts(e,index,item);
                                  }}
                                />
                              </FormGroup></td>
             
              <td>{item.item_title}</td>
              <td>{item.qty}</td>
              <td>{item.unit}</td>
              <td>{item.cost_price}</td>
              <td>{item.qty*item.cost_price}</td>
             <td>{item.status}</td>
          <td>{item.description}</td>
           <td> <FormGroup>
                                <Row>
                                  <span
                                    onClick={() => {
                                      setTransferItem(item)
                                      setTransferModal(true);
                                    }}
                                  >
                                    <u>Transfer</u>
                                  </span>
                                </Row>
                              </FormGroup></td>
            </tr>
          ))}
        </tbody>
      </Table>
      </>
    );
  }
  const groups = testJsonData && groupBy(testJsonData, 'purchase_order_id');

  return (
    <>
      <BreadCrumbs />
      <ProjectButton
        UpdateData={UpdateData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></ProjectButton>
      <Form>
        <FormGroup>
          <ComponentCard
            title={`Project Details | Code: ${projectDetail && projectDetail.project_code} | 
            Category : ${projectDetail && projectDetail.category} | 
            Company :  ${projectDetail && projectDetail.company_name}  | 
            Status : ${projectDetail && projectDetail.status} `}
          >
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    defaultValue={projectDetail && projectDetail.title}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>
                    Category <span className="required"> *</span>{' '}
                  </Label>
                  <Input
                    type="select"
                    name="category"
                    defaultValue={projectDetail && projectDetail.category}
                    onChange={handleInputs}
                  >
                    <option value="">Please Select</option>
                    <option value="Project">Project</option>
                    <option defaultValue="selected" value="Maintenance">
                      Maintenance
                    </option>
                    <option value="Tenancy Project">Tenancy Project</option>
                    <option value="Tenancy Work">Tenancy Work</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Status </Label>
                  <Input
                    type="select"
                    name="status"
                    defaultValue={projectDetail && projectDetail.status}
                    onChange={handleInputs}
                  >
                    <option value="">Please Select</option>
                    <option defaultValue="selected" value="WIP">
                      WIP
                    </option>
                    <option value="Billable">Billable</option>
                    <option value="Billed">Billed</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Latest">Latest</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Company</Label>
                  <Input
                    type="text"
                    disabled
                    name="company_name"
                    defaultValue={projectDetail && projectDetail.company_name}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Contact</Label>
                  <Input
                    type="select"
                    name="contact_id"
                    defaultValue={projectDetail && projectDetail.contact_id}
                    onChange={handleInputs}
                  >
                    <option value="">Please Select</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="start_date"
                    defaultValue={projectDetail && projectDetail.start_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Estimated Finish Date</Label>
                  <Input
                    type="date"
                    name="estimated_finish_date"
                    defaultValue={projectDetail && projectDetail.estimated_finish_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    defaultValue={projectDetail && projectDetail.description}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Project Manager</Label>
                  <Input
                    type="select"
                    name="project_manager_id"
                    defaultValue={projectDetail && projectDetail.project_manager_id}
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                    <FormGroup>
                    <Label>Ducting Cost (OR) <Link to="" color="primary">
                      <span onClick={()=>setAddDuctingCostModal(true)}><b><u>Add</u></b></span>
                    </Link></Label>
                    <Input type="text" disabled name="actual_submission_date"/>
                    </FormGroup>
                </Col> */}
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        {/* Call Modal's */}

        <DuctingCostModal
          addDuctingCostModal={addDuctingCostModal}
          setAddDuctingCostModal={setAddDuctingCostModal}
        />
        <AddPurchaseOrderModal
          projectId={id}
          addPurchaseOrderModal={addPurchaseOrderModal}
          setAddPurchaseOrderModal={setAddPurchaseOrderModal}
        />

        <ViewQuoteLogModal
          viewQuotationsModal={viewQuotationsModal}
          setViewQuotationsModal={setViewQuotationsModal}
        />
        <ViewLineItemModal viewLineModal={viewLineModal} setViewLineModal={setViewLineModal} />
        <EditQuotation editQuoteModal={editQuoteModal} setEditQuoteModal={setEditQuoteModal} />
        <EditDeliveryOrder
          editDeliveryOrder={editDeliveryOrder}
          setEditDeliveryOrder={setEditDeliveryOrder}
          data={deliveryData}
        />
       {editPo&& <EditPoModal editPo={editPo} setEditPo={setEditPo} data={POId} />}
       {editPOLineItemsModal&& <EditPOLineItemsModal
          editPOLineItemsModal={editPOLineItemsModal}
          setEditPOLineItemsModal={setEditPOLineItemsModal}
          data={POId}
        />}
        <CreateFinance financeModal={financeModal} setFinanceModal={setFinanceModal} />

        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === '1' ? 'active' : ''}
              onClick={() => {
                toggle('1');
              }}
            >
              Costing Summary
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '2' ? 'active' : ''}
              onClick={() => {
                toggle('2');
              }}
            >
              Quotations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '3' ? 'active' : ''}
              onClick={() => {
                toggle('3');
              }}
            >
              Materials Purchased
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '4' ? 'active' : ''}
              onClick={() => {
                toggle('4');
              }}
            >
              Materials used
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '5' ? 'active' : ''}
              onClick={() => {
                toggle('5');
              }}
            >
              Materials Transferred
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '6' ? 'active' : ''}
              onClick={() => {
                toggle('6');
              }}
            >
              Delivery Order
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '7' ? 'active' : ''}
              onClick={() => {
                toggle('7');
              }}
            >
              Subcon Work Order
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '8' ? 'active' : ''}
              onClick={() => {
                toggle('8');
              }}
            >
              Claim
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '9' ? 'active' : ''}
              onClick={() => {
                toggle('9');
              }}
            >
              Finance
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === '10' ? 'active' : ''}
              onClick={() => {
                toggle('10');
              }}
            >
              Employee & Attachment
            </NavLink>
          </NavItem>
        </Nav>

        {/* Tab 1 */}

        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            {/* <Row>
              <Col md="12" className='mb-4'>
                  <Button color="primary">Edit Costing Summary</Button>
              </Col>
            </Row> */}
            <CostingSummary
              getCostingSummary={getCostingSummary}
              gTotal={gTotal}
              gTotal1={gTotal1}
              gTotal2={gTotal2}
              gTotal3={gTotal3}
              gTotal4={gTotal4}
              gTotal5={gTotal5}
              
 getCostingbySummary ={getCostingbySummary}></CostingSummary>
             
              
          </TabPane>

          {/* Tab 2 */}

          <TabPane tabId="2">
          <Row className="mb-4">
              <Col md="3">
                {' '}
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    setViewQuotationsModal(true);
                  }}
                >
                  View Quote Log
                </Button>
              </Col>
            </Row>
            <Row>
              <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
                {' '}
                Quotations{' '}
              </CardTitle>
            </Row>
            <QuotationMoreDetails id={id}></QuotationMoreDetails>
            
          </TabPane>

          {/* Tab 3 Materials Purchased */}

          <TabPane tabId="3">
            <Row className="mb-4">
              <Col md="3">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    setAddPurchaseOrderModal(true);
                  }}
                >
                  Add Purchase Order
                </Button>
              </Col>
              <Col md="3">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    insertDelivery();
                  }}
                >
                  Create Delivery Order
                </Button>
              </Col>
              <Col md="3">
                <Button color="primary" className="shadow-none" onClick={() => addQtytoStocks()}>
                  Add all Qty to Stock
                </Button>
              </Col>
              <Col>
                <PdfMaterialPurchaseOrder
                  addPurchaseOrderModal={addPurchaseOrderModal}
                  tabPurchaseOrderLineItemTable={tabPurchaseOrderLineItemTable}
                ></PdfMaterialPurchaseOrder>
              </Col>
            </Row>
            {testJsonData && <>{Object.values(groups).map(renderTable)}</>}
            {tabPurchaseOrderLineItemTable &&
              tabPurchaseOrderLineItemTable.map((e) => {
                return (
                  <>
                    <Row key={e.data[0].company_name}>
                      <CardTitle
                        tag="h4"
                        className="border-bottom bg-secondary p-2 mb-0 text-white"
                      >
                        <Row>
                          <Col>{e.data[0].company_name}</Col>
                          <Col>
                            <Link to="" style={{ color: '#fff' }}>
                              <span
                                onClick={() => {
                                  setEditPo(true);
                                  setPOId(e);
                                }}
                              >
                                <u> Edit Po </u>
                              </span>
                            </Link>
                          </Col>
                          <Col>
                            <Link to="" style={{ color: '#fff' }}>
                              <span
                                onClick={() => {
                                  setEditPOLineItemsModal(true);
                                }}
                              >
                                <u> Edit Line Items </u>
                              </span>
                            </Link>
                          </Col>
                          <Col>
                            <span>
                              <u> print pdf </u>
                            </span>
                          </Col>
                          <Col> Total : {getTotalOfPurchase(e.data)}</Col>
                          <Col className="d-flex justify-content-end">
                            <Button
                              color="primary"
                              className="shadow-none"
                              onClick={() => {
                                deletePurchaseOrder(e.id);
                              }}
                            >
                              X
                            </Button>
                          </Col>
                        </Row>
                      </CardTitle>
                    </Row>

                    <Form className="mt-4">
                      <Row className="border-bottom mb-3">
                        <Col md="1">
                          <FormGroup>
                            <Label></Label>{' '}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Title</Label>{' '}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>UoM</Label>{' '}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Quantity</Label>{' '}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label>Unit Price</Label>{' '}
                          </FormGroup>
                        </Col>
                        <Col md="1">
                          <FormGroup>
                            <Label>Amount</Label>{' '}
                          </FormGroup>
                        </Col>
                        <Col md="1">
                          <FormGroup>
                            <Label>Status</Label>{' '}
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label></Label>Remarks
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label></Label>{' '}
                          </FormGroup>
                        </Col>
                      </Row>

                      {e.data.map((item) => {
                        return (
                          <Row key={item.purchase_order_id}>
                            <Col md="1">
                              <FormGroup>
                                <Input
                                  type="checkbox"
                                  value={item.purchase_order_id}
                                  onChange={(ch) => {
                                    handleCheck(ch, item);
                                  }}
                                />
                              </FormGroup>
                            </Col>

                            <Col>
                              <FormGroup>
                                <span>{item.item_title}</span>
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <span>{item.unit}</span>
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <span>{item.qty}</span>
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <span>{item.cost_price}</span>
                              </FormGroup>
                            </Col>
                            <Col md="1">
                              <FormGroup>
                                <span>{item.amount}</span>
                              </FormGroup>
                            </Col>
                            <Col md="1">
                              <FormGroup>
                                <span>{item.status}</span>
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Label>{item.description}</Label>
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormGroup>
                                <Row>
                                  <span
                                    onClick={() => {
                                      setTransferModal(true);
                                    }}
                                  >
                                    <u>Transfer</u>
                                  </span>
                                </Row>
                              </FormGroup>
                            </Col>
                          </Row>
                        );
                      })}
                    </Form>
                  </>
                );
              })}
            {transferModal && (
              <TransferModal transferModal={transferModal} setTransferModal={setTransferModal} transferItem={transferItem} />
            )}
          </TabPane>

          {/* Tab 4 */}

          <TabPane tabId="4">
            <MaterialsusedTab projectId={id} />
          </TabPane>

          {/* Tab 5 */}

          <TabPane tabId="5">
            <Row>
              <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
                {' '}
                Materials Transferred From Other Projects{' '}
              </CardTitle>
            </Row>

            <MaterialsTransferred projectId={id} />
          </TabPane>

          {/* Start Tab Content 6  Delivery Order */}
          <TabPane tabId="6">
            <Row className="mb-4">
              <CardTitle tag="h4" className="border-bottom bg-secondary p-2 mb-0 text-white">
                Delivery Order
              </CardTitle>
            </Row>
            <Form>
              <Row className="border-bottom mb-3">
                <Col>
                  <FormGroup>
                    <Label>Date</Label>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Action</Label>
                  </FormGroup>
                </Col>
                {/* <Col></Col> */}
              </Row>

              {tabdeliveryorder &&
                tabdeliveryorder.map((res) => {
                  return (
                    <Row>
                      <Col>{moment(res.date).format('DD-MM-YYYY')}</Col>
                      <Col>
                        <FormGroup>
                          <Row>
                            <Col md="1">
                              <Label>
                                <Link to="">
                                  <span
                                    onClick={() => {
                                      setDeliveryData(res.delivery_order_id);
                                      setEditDeliveryOrder(true);
                                    }}
                                  >
                                    <Icon.Edit />
                                  </span>
                                </Link>
                              </Label>
                            </Col>
                            <Col md="1">
                              <Label>
                                {' '}
                                <PdfDeliveryOrder
                                  deliveryData={deliveryData}
                                  editDeliveryOrder={editDeliveryOrder}
                                  deliverOrderId={res.delivery_order_id}
                                ></PdfDeliveryOrder>
                              </Label>
                            </Col>
                            <Col md="1">
                              <Label>
                                <Link to="">
                                  <span
                                    onClick={() => {
                                      deleteDeliveryOrder(res.delivery_order_id);
                                    }}
                                  >
                                    <Icon.Delete />
                                  </span>
                                </Link>
                              </Label>
                            </Col>
                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>
                  );
                })}
            </Form>
          </TabPane>

          {/* Start Tab Content 7  Subcon Work Order */}

          <TabPane tabId="7">
            <Row className="mb-4">
              <Col md="2">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    insertWorkOrder();
                    handleClientForms();
                    generateCode('subcon');
                  }}
                >
                  Add Work Order
                </Button>
              </Col>
            </Row>

            <Row>
              <CardTitle tag="h4" className="border-bottom bg-dark p-2 mb-0 text-white">
                {' '}
                Work Orders{' '}
              </CardTitle>
            </Row>

            <SubConWorkOrderPortal projectId={id} />
            {/* <SubconWorkPaymentHistory projectId={id} /> */}
          </TabPane>

          {/* Start Tab Content 8 */}
          {newPcModal && (
            <NewPcModal
              pc={projectDetail}
              projectClaimId={pcId}
              newPcModal={newPcModal}
              setNewPcModal={setNewPcModal}
            />
          )}
          <TabPane tabId="8">
            {!claimData && (
              <Row className="mb-4">
                <Col md="2">
                  <Button
                    color="primary"
                    className="shadow-none"
                    onClick={(e) => {
                      if (window.confirm('Are you sure you want to add a claim? ')) {
                        insertProjectClaim();
                      } else {
                        e.preventDefault();
                      }
                    }}
                  >
                    Add Claim
                  </Button>
                </Col>
              </Row>
            )}
            {claimData && (
              <>
                <Row className="mb-4">
                  <Col md="2">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        setPcId(claimData.project_claim_id);
                        setNewPcModal(true);
                      }}
                    >
                      New PC
                    </Button>
                  </Col>
                </Row>

                <Row>
                  <CardTitle tag="h4" className="border-bottom bg-dark p-2 mb-0 text-white">
                    {' '}
                    Claim{' '}
                  </CardTitle>
                </Row>

                <Form className="mt-4">
                  <Row className="border-bottom mb-3">
                    <Col>
                      <FormGroup>
                        <Label>Code</Label>{' '}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Date</Label>{' '}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Title</Label>{' '}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Action</Label>{' '}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Status</Label>{' '}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Amount</Label>{' '}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Action</Label>{' '}
                      </FormGroup>
                    </Col>
                    <Col></Col>
                  </Row>

                  <Row>
                    <Col>
                      <FormGroup>{claimData.claim_code}</FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        {claimData.claim_date
                          ? moment(claimData.claim_date).format('DD-MM-YYYY')
                          : ''}
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>{claimData.project_title}</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          <Link to="">
                            <span
                              onClick={() => {
                                setPcId(claimData.project_claim_id);
                                setPc(claimData);
                                setEditClaimModal(true);
                              }}
                            >
                              <Icon.Edit />
                            </span>
                          </Link>
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>{claimData.status}</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>{claimData.amount}</Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          {' '}
                          <span
                            onClick={() => {
                              setPcId(claimData.project_claim_id);
                              setPcItems(!pcItems);
                            }}
                          >
                            View Pc items
                          </span>
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>
                          {' '}
                          <span
                            onClick={() => {
                              setPcId(claimData.project_claim_id);
                              setEditPcModal(true);
                            }}
                          >
                            Edit Pc
                          </span>
                        </Label>
                      </FormGroup>
                    </Col>
                    {/* <Col>
                <FormGroup>
                    <Row>
                    <Col md='2'><Label><Link to=""><span onClick={()=>{setWorkData(element);setEditWorkOrderModal(true)}}><Icon.Edit /></span></Link></Label></Col>
                    <Col md='2'><Label><PdfProjectWorkOrder workOrderViewLineItem={workOrderViewLineItem}subConWorkOrdeData={subConWorkOrdeData} subConWorkOrderId={element.sub_con_work_order_id}></PdfProjectWorkOrder></Label></Col>
                    <Col md='2'><Label><Link to=""> <span onClick={()=>{setSubCon(element.sub_con_work_order_id);setWorkOrderLine(true)}}><Icon.PlusCircle /></span> </Link></Label></Col>
                
                    </Row>
                </FormGroup>
               {workOrderViewLineItem&& <WorkOrderViewLineItem workOrderViewLineItem={workOrderViewLineItem} setWorkOrderViewLineItem={setWorkOrderViewLineItem} projectId={projectId} subCon={subCon} />}
                </Col> */}
                  </Row>
                </Form>
              </>
            )}
            {editClaimModal && (
              <EditClaimModal
                projectId={id}
                projectClaimId={pcId}
                editClaimModal={editClaimModal}
                setEditClaimModal={setEditClaimModal}
                pc={pc}
              />
            )}
            {editPcModal && (
              <EditPc
                editPcModal={editPcModal}
                setEditPcModal={setEditPcModal}
                pc={projectDetail}
                projectClaimId={pcId}
              />
            )}

            {pcItems && (
              <ClaimItems
                projectId={id}
                projectClaimId={pcId}
                checkId={checkId}
                POId={POId}
                projectDetail={projectDetail}
                deliveryData={deliveryData}
                editPo={editPo}
              />
            )}
            <Col xs="12" md="3">
              <Form>
                <FormGroup>
                  <ComponentCard title="Claim Attachment">
                    <Row>
                      <Col xs="12" md="4" className="mb-3">
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            setRoomName('ProjectClaim');
                            setFileTypes(['JPG', 'PNG', 'GIF', 'PDF']);
                            dataForAttachment();
                            setAttachmentModal(true);
                          }}
                        >
                          <Icon.File className="rounded-circle" width="20" />
                        </Button>
                      </Col>
                    </Row>
                    <AttachmentModalV2
                      moduleId={id}
                      attachmentModal={attachmentModal}
                      setAttachmentModal={setAttachmentModal}
                      roomName={RoomName}
                      fileTypes={fileTypes}
                      altTagData="ProjectClaim Data"
                      desc="ProjectClaim Data"
                      recordType="ProjectClaim"
                      mediaType={attachmentData.modelType}
                    />
                    <ViewFileComponentV2
                      moduleId={id}
                      roomName="ProjectClaim"
                      recordType="ProjectClaim"
                    />
                  </ComponentCard>
                </FormGroup>
              </Form>
            </Col>
          </TabPane>

          {/* Start Tab Content 9 */}

          <TabPane tabId="9">
            <FinanceTab projectId={id} projectDetail={projectDetail}></FinanceTab>
          </TabPane>

          {/* Start Tab Content 10 */}

          <TabPane tabId="10">
            <Row>
            <AddEmployee/>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  color="primary"
                  className="shadow-none"
                  onClick={() => {
                    setAttachmentModal(true);
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>
            <AttachmentModal
              opportunityId={id}
              attachmentModal={attachmentModal}
              setAttachmentModal={setAttachmentModal}
            />
            <ViewFileComponent opportunityId={id} />
          </TabPane>

          {/* End Tab Content 10 */}
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProjectEdit;
