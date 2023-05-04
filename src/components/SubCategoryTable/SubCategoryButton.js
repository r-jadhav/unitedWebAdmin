import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form, FormGroup } from 'reactstrap';
import ComponentCardV2 from '../ComponentCardV2';
// import DeleteButton from '../DeleteButton';


export default function SubCategoryButton({
  saveChanges,
  applyChanges,
  backToList,
  editSubCategoryData,
  // id,
  // navigate
}) {
  SubCategoryButton.propTypes = {
    saveChanges: PropTypes.func,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    editSubCategoryData: PropTypes.func,
    // id: PropTypes.string,
    // navigate: PropTypes.any
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
            <Col>
              <Button  className='shadow-none'
                color="primary"
                onClick={() => {
                  editSubCategoryData();
                  saveChanges();
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button  className='shadow-none'
                color="primary"
                onClick={() => {
                  editSubCategoryData();
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
            {/* <Col> */}
              {/* <Button  className='shadow-none'
                color="dark"
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to cancel  \n  \n You will lose any changes made',
                    )
                  ) {
                    navigate('/SubCategory');
                  } else {
                    applyChanges();
                  }
                }}
              >
                Cancel
              </Button>
            </Col>
            <Col>
            <DeleteButton
              id={id} 
              columnname="sub_category_id"
              tablename="sub_category"
            ></DeleteButton>
            </Col> */}
            <Col>
              <Button  className='shadow-none'
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
                Back to List
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}
