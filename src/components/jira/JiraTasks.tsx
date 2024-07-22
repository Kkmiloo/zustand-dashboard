import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { Task, TaskStatus } from '../../interfaces/task.interface';
import { SingleTask } from './SingleTask';
import { DragEvent, useState } from 'react';
import { useTaskStore } from '../../stores';

import classNames from 'classnames';
import Swal from 'sweetalert2';
import { useTask } from '../../hooks/useTask';

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
  const {
    handleAddTask,
    handleDragOver,
    isDragging,
    handleDragDrop,
    handleDragLeave,
    onDragOver,
  } = useTask({ status });
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDragDrop(e)}
      className={classNames(
        '!text-black relative flex flex-col rounded-[20px] border-4  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]',
        {
          ' border-blue-500 border-dotted': isDragging,
          'border-green-500 border-dotted': isDragging && onDragOver,
        }
      )}
    >
      {/* Task Header */}
      <div className='relative flex flex-row justify-between'>
        <div className='flex items-center justify-center'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100'>
            <span className='flex justify-center items-center h-6 w-6 text-brand-500'>
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className='ml-4 text-xl font-bold text-navy-700'>{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}

      {tasks.map((task) => (
        <SingleTask key={task.id} task={task} />
      ))}
    </div>
  );
};
