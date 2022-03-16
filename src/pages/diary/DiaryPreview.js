import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import EditDiary from './EditDiary';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import {
  deleteDiaryEntry,
  toggleCompleteDiaryEntry,
} from '../../redux/actions/diaryEntryActions';
import moment from 'moment';

const DiaryPreview = ({ diary, service }) => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.diaryEntryDetails);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteDiaryEntry(service, diary._id));
        Swal.fire({
          position: 'bottom-end',
          icon: 'success',
          title: 'Diary entry removed.',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };
  useEffect(() => {
    success && handleClose();
  }, [success]);
  return (
    <>
      <td>{moment(diary.date).format('dddd MM/DD/YYYY')}</td>
      <td>{diary.time}</td>
      <td>{diary.content}</td>
      <td>
        <Button
          onClick={() => dispatch(toggleCompleteDiaryEntry(diary._id, service))}
        >
          {diary.completed ? 'Completed' : 'Not Completed'}
        </Button>
      </td>
      <td>
        <Button className="success me-2" onClick={() => setShow(true)}>
          Edit
        </Button>
        <EditDiary
          show={show}
          diary={diary}
          handleClose={handleClose}
          error={error}
          service={service}
        />
      </td>
      <td>
        <Button className="danger" onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </>
  );
};

export default DiaryPreview;
