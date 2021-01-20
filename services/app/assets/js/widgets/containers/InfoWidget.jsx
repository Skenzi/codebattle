import React from 'react';
import { useSelector } from 'react-redux';
import ChatWidget from './ChatWidget';
import Task from '../components/Task';
import { gameTaskSelector, gameStatusSelector, leftExecutionOutputSelector } from '../selectors';
import Output from '../components/ExecutionOutput/Output';
import OutputTab from '../components/ExecutionOutput/OutputTab';

const InfoWidget = () => {
  const taskText = useSelector(gameTaskSelector);
  const startsAt = useSelector(state => gameStatusSelector(state).startsAt);
  const timeoutSeconds = useSelector(state => gameStatusSelector(state).timeoutSeconds);
  const gameStatusName = useSelector(state => gameStatusSelector(state).status);
  const leftOutput = useSelector(state => leftExecutionOutputSelector(state));
  const isShowOutput = leftOutput && leftOutput.status;
  const idOutput = 'leftOutput';
  return (
    <>
      <div className="col-12 col-lg-6 p-1 cb-height-info">
        <div className="d-flex flex-column h-100">
          <nav>
            <div className="nav nav-tabs bg-gray text-uppercase font-weight-bold text-center" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link flex-grow-1 active  text-black rounded-0 py-2 px-5"
                id="task-tab"
                data-toggle="tab"
                href="#task"
                role="tab"
                aria-controls="task"
                aria-selected="true"
              >
                Task
              </a>
              <a
                className="nav-item nav-link flex-grow-1 text-black rounded-0 p-2 block"
                id={`${idOutput}-tab`}
                data-toggle="tab"
                href={`#${idOutput}`}
                role="tab"
                aria-controls={`${idOutput}`}
                aria-selected="false"
              >
                {isShowOutput && <OutputTab sideOutput={leftOutput} side="left" />}
              </a>
            </div>
          </nav>
          <div className="tab-content flex-grow-1 overflow-auto " id="nav-tabContent">
            <div
              className="tab-pane fade show active h-100"
              id="task"
              role="tabpanel"
              aria-labelledby="task-tab"
            >
              <Task
                task={taskText}
                time={startsAt}
                timeoutSeconds={timeoutSeconds}
                gameStatusName={gameStatusName}
              />
            </div>
            <div
              className="tab-pane h-100"
              id={idOutput}
              role="tabpanel"
              aria-labelledby={`${idOutput}-tab`}
            >
              {isShowOutput && <Output sideOutput={leftOutput} />}
            </div>

          </div>
        </div>

      </div>
      <div className="col-12 col-lg-6 p-1 cb-height-info">
        <ChatWidget />
      </div>
    </>
  );
};

export default InfoWidget;
