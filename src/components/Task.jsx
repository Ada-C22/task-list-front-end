import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onToggleComplete, onDeleteTask }) => {
  return (
    <li className="task">
      <span
        className={`tasks__item__toggle ${
          isComplete ? 'tasks__item__toggle--completed' : ''
        }`}
        onClick={() => onToggleComplete(id, isComplete)}
      >
        {title}
      </span>
      <button
        className="task__button task__button--delete"
        onClick={() => onDeleteTask(id)}
      >
        Delete
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
