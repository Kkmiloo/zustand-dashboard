import { DragEvent, useState } from 'react';
import Swal from 'sweetalert2';
import { useTaskStore } from '../stores';
import { TaskStatus } from '../interfaces/task.interface';

interface Options {
  status: TaskStatus;
}

export const useTask = ({ status }: Options) => {
  const isDragging = useTaskStore((state) => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addTask = useTaskStore((state) => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: 'Tarea',
      input: 'text',
      inputLabel: 'Ingrese la tarea',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar una tarea';
        }
      },
    });

    console.log(value);
    if (!isConfirmed) return;

    addTask(value, status);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setOnDragOver(true);
  };
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setOnDragOver(false);
  };
  const handleDragDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);

    onTaskDrop(status);
  };

  return {
    isDragging,
    onDragOver,
    handleDragLeave,
    handleDragDrop,
    handleAddTask,
    handleDragOver,
  };
};
