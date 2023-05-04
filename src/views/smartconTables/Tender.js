import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Test = () => {
  const [tenders, setTenders] = useState(null);
  const getTenders = () => {
    api.get('/tender/getTenders').then((res) => {
      setTenders(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    setTimeout(() => {
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
    }, 1000);

    getTenders();
  }, []);

  const columns = [
    {
      name: 'id',
      selector: 'opportunity_id',
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
      sortable: false,
    },
    {
      name: 'Del',
      selector: 'delete',
      cell: () => <Icon.Trash />,
      grow: 0,
      width: 'auto',
      wrap: true,
    },
    {
      name: 'Code',
      selector: 'opportunity_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Project',
      selector: 'title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Ref No',
      selector: 'office_ref_no',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Main Con',
      selector: 'company_name',
      sortable: true,
      width: 'auto',
      grow: 3,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: 'Actual Closing',
      selector: 'closinactual_closing',
      sortable: true,
      grow: 2,
      width: 'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      grow: 2,
      wrap: true,
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
    {
      name: 'Quoted By',
      selector: 'quote_ref',
      sortable: true,
      width: 'auto',
      // cell: d => <span>{d.closing.join(", ")}</span>
    },
  ];

  const deleteRecord = (id) => {
    // console.log(id)

    Swal.fire({
      title: `Are you sure? ${id}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/tender/deleteTender', { opportunity_id: id }).then((res) => {
          console.log(res);
          Swal.fire('Deleted!', 'Your Tender has been deleted.', 'success');
          getTenders();
        });
      }
    });
  };

  /* eslint-disable */
  //  $('.filterable .btn-filter').click(function(){
  //   var $panel = $(this).parents('.filterable'),
  //   $filters = $panel.find('.filters input'),
  //   $tbody = $panel.find('.table tbody');
  //   if ($filters.prop('disabled') == true) {
  //     $filters.prop('disabled', false);
  //     $filters.first().focus();
  //   } else {
  //     $filters.val('').prop('disabled', true);
  //     $tbody.find('.no-result').remove();
  //     $tbody.find('tr').show();
  //   }
  // });

  // $('.filterable .filters input').keyup(function(e){
  //   /* Ignore tab key */
  //   var code = e.keyCode || e.which;
  //   if (code == '9') return;
  //   /* Useful DOM data and selectors */
  //   var $input = $(this),
  //   inputContent = $input.val().toLowerCase(),
  //   $panel = $input.parents('.filterable'),
  //   column = $panel.find('.filters th').index($input.parents('th')),
  //   $table = $panel.find('.table'),
  //   $rows = $table.find('tbody tr');
  //   /* Dirtiest filter function ever ;) */
  //   var $filteredRows = $rows.filter(function(){
  //     var value = $(this).find('td').eq(column).text().toLowerCase();
  //     return value.indexOf(inputContent) === -1;
  //   });
  //   /* Clean previous no-result if exist */
  //   $table.find('tbody .no-result').remove();
  //   /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
  //   $rows.show();
  //   $filteredRows.hide();
  //   /* Prepend no-result row if all rows are filtered */
  //   if ($filteredRows.length === $rows.length) {
  //     $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="'+ $table.find('.filters th').length +'">No result found</td></tr>'));
  //   }
  // });
  /* eslint-disable */

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          title="Tender List"
          Button={
            <Link to="/TenderDetails">
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
              {tenders &&
                tenders.map((element) => {
                  return (
                    <tr key={element.opportunity_id}>
                      <td>{element.opportunity_id}</td>
                      <td>
                        <Link to={`/TenderEdit/${element.opportunity_id}`}>
                          <Icon.Edit2 />
                        </Link>
                      </td>
                      <td>
                        <Link to="">
                          <span onClick={() => deleteRecord(element.opportunity_id)}>
                            <Icon.Trash2 />
                          </span>
                        </Link>
                      </td>
                      <td>{element.opportunity_code}</td>
                      <td>{element.title}</td>
                      <td>{element.office_ref_no}</td>
                      <td>{element.company_name}</td>
                      <td>{element.closinactual_closing}</td>
                      <td>{element.status}</td>
                      <td>{element.quote_ref}</td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </tfoot>
        </CommonTable>

        {/* <div class="container">
  <div class="row">
    <div class="panel panel-primary filterable">
      <div class="panel-heading">
        <h3 class="panel-title">Users</h3>
        <div class="pull-right"><button class="btn btn-default btn-xs btn-filter"><span class="glyphicon glyphicon-filter"></span> Filter</button></div>
      </div>
      <table class="table">
        <thead>
          <tr class="filters">
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th><input type="text" class="form-control" placeholder="Project" disabled/></th>
            <th><input type="text" class="form-control" placeholder="Ref No" disabled/></th>
            <th><input type="text" class="form-control" placeholder="Main Con" disabled/></th>
            <th></th>
            <th><input type="text" class="form-control" placeholder="Status" disabled/></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {tenders && tenders.map(element=>{
                return (<tr key={element.title}>
                <td>{element.opportunity_id}</td>
                <td><Link to={`/TenderEdit/${element.opportunity_id}`} ><Icon.Edit2 /></Link></td>
                <td><Link to=""><span onClick={()=>deleteRecord(element.opportunity_id)}><Icon.Trash2 /></span></Link></td>
                <td>{element.opportunity_code}</td>
                <td>{element.title}</td>
                <td>{element.office_ref_no}</td>
                <td>{element.company_name}</td>
                <td>{element.closinactual_closing}</td>
                <td>{element.status}</td>
                <td>{element.quote_ref}</td>
                </tr>)
            })}
          </tbody>
      </table>
    </div>
  </div>
</div> */}
      </div>
    </div>
  );
};

export default Test;
