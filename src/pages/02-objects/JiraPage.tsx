import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {
  const pendingTasks = useTaskStore((state) =>
    state.getTaskByStatus('in-progress')
  );
  const doneTasks = useTaskStore((state) => state.getTaskByStatus('done'));
  const openTasks = useTaskStore((state) => state.getTaskByStatus('open'));

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <JiraTasks title='Pendientes' status='open' tasks={openTasks} />

        <JiraTasks
          title='Avanzando'
          status='in-progress'
          tasks={pendingTasks}
        />

        <JiraTasks title='Terminadas' status='done' tasks={doneTasks} />
      </div>
    </>
  );
};
