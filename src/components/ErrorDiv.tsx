import React, { FC, useEffect } from 'react';

interface Props {
  msg: string;
}
const ErrorDiv: FC<Props> = (props: Props) => {
  const { msg } = props;

  useEffect(() => {
    //TODO: use a service to record front-end errors.
  }, [msg]);

  return <div>{msg}</div>;
};
export default ErrorDiv;
