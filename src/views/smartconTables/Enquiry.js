import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';

const Enquiry = () => {
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(false)


  //  get enquiry
  const getenquiry = () => {
    api.get('/enquiry/getEnquiry').then((res) => {
     setEnquiry(res.data.data)
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [ {
          extend: 'print',
          text: "Print",
          className:"shadow-none btn btn-primary",
      }],
      });
      setLoading(false)
      console(enquiry)
    }).catch(()=>{
      setLoading(false)
    });
  };

  useEffect(() => {
    // setTimeout(() => {
    //   $('#example').DataTable({
    //     pagingType: 'full_numbers',
    //     pageLength: 20,
    //     processing: true,
    //     dom: 'Bfrtip',
    //     buttons: [ {
    //       extend: 'print',
    //       text: "Print",
    //       className:"shadow-none btn btn-primary",
    //   }],
    //   });
    // }, 1000);

    getenquiry();
  }, []);

  const columns = [
    {
      name: 'id',
      selector: 'enquiry_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false
    },
    {
      name: 'Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true
    },
    {
      name: 'Email',
      selector: 'email',
      sortable: true,
      grow: 2,
      wrap: true
    },
    {
        name: 'Comments',
        selector: 'comments',
        sortable: true,
        grow: 2,
        wrap: true
      },

  ];

 
  return (
    <div className="MainDiv">
       
      <div className=" pt-xs-25">
      <BreadCrumbs />

      <CommonTable
      loading={loading}
          title="Enquiry List"
          Button={
            <Link to="/EnquiryDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
           <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {enquiry &&
              enquiry.map((element) => {
                return (
                  <tr key={element.enquiry_id}>
                    <td>{element.enquiry_id}</td>
                    <td>
                      <Link to={`/EnquiryEdit/${element.enquiry_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.first_name}</td>
                    <td>{element.email}</td>
                    <td>{element.comments}</td>
                  </tr>
                );
              })}
          </tbody>
          </CommonTable>
      </div>
    </div>
  );
};

export default Enquiry;
