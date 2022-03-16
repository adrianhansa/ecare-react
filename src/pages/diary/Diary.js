import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Col, Row, Table } from 'react-bootstrap';
import { getService } from '../../redux/actions/serviceActions';
import AddDiary from './AddDiary';
import DiaryPreview from './DiaryPreview';
import { GrAddCircle } from 'react-icons/gr';
import { getDiaryEntries } from '../../redux/actions/diaryEntryActions';

const Diary = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const { diaryEntries, loading, error } = useSelector(
    (state) => state.diaryEntryList
  );

  const { success } = useSelector((state) => state.diaryEntryDetails);

  useEffect(() => {
    dispatch(getService(slug));
    dispatch(getDiaryEntries(slug));
  }, [dispatch, slug]);

  useEffect(() => {
    success && handleClose();
  }, [success]);

  return (
    <Container fluid>
      <Row className="mt-3">
        {error && <p className="text-danger">{error}</p>}
        {loading && <p>Loading...</p>}
        <Col>
          <Row>
            <Col className="mx-auto">
              <h3 className="text-center">
                Diary Entries
                <GrAddCircle type="button" onClick={() => setShow(true)} />
              </h3>
              <Table striped hover responsive bordered>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Event</th>
                    <th>Status</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {diaryEntries &&
                    diaryEntries.map((diary) => (
                      <tr key={diary._id}>
                        <DiaryPreview diary={diary} service={slug} />
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <AddDiary show={show} handleClose={handleClose} service={slug} />
        </Col>
      </Row>
    </Container>
  );
};

export default Diary;
