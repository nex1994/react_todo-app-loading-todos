import { useEffect, useState } from 'react';
import { ERROR } from '../App';
import classNames from 'classnames';

type Props = {
  error: (typeof ERROR)[keyof typeof ERROR];
};

const STATUS = {
  isVisible: 'isVisible',
  isHidden: 'isHidden',
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS];
export const ErrorMessage: React.FC<Props> = ({ error }) => {
  const [status, setStatus] = useState<Status>(STATUS.isHidden);

  useEffect(() => {
    setStatus(STATUS.isHidden);

    if (error !== 'noError') {
      setStatus(STATUS.isVisible);
    }

    setTimeout(() => setStatus(STATUS.isHidden), 3000);
  }, [error]);

  const errorClassName = classNames(
    { hidden: status === STATUS.isHidden },
    'notification',
    'is-danger',
    'is-light',
    'has-text-weight-normal',
  );

  return (
    <div data-cy="ErrorNotification" className={errorClassName}>
      <button data-cy="HideErrorButton" type="button" className="delete" />
      {error === 'couldntLoadTodos' && 'Unable to load todos'}
      <br />
      {error === 'noTitle' && 'Title should not be empty'}
      <br />
      {error === 'unableToAdd' && 'Unable to add a todo'}
      <br />
      {error === 'unableToDelete' && 'Unable to delete a todo'}
      <br />
      {error === 'unableToUpdate' && 'Unable to update a todo'}
    </div>
  );
};
