import React, { useState } from 'react';

interface FlowStep {
  title: string;
  action: {
    type: string;
    details: string | APICallDetails;
  };
}

interface APICallDetails {
  endpoint: string;
  method: string;
  body: string;
  // Other API call related details can be added here
}

interface Automation {
  trigger: string;
  steps: FlowStep[];
}

const CreateAutomatisering: React.FC = () => {
  const [flows, setFlows] = useState<Automation[]>([]);

  const addAutomation = (): void => {
    setFlows([...flows, { trigger: '', steps: [] }]);
  };

  const removeAutomation = (index: number): void => {
    const updatedFlows = [...flows];
    updatedFlows.splice(index, 1);
    setFlows(updatedFlows);
  };

  const addCodeStep = (flowIndex: number, code: string): void => {
    const updatedFlows = [...flows];
    updatedFlows[flowIndex].steps.push({
      title: `Step ${flows[flowIndex].steps.length + 1}`,
      action: { type: 'code', details: code },
    });
    setFlows(updatedFlows);
  };

  const addAPICallStep = (
    flowIndex: number,
    apiCallDetails: APICallDetails,
  ): void => {
    const updatedFlows = [...flows];
    updatedFlows[flowIndex].steps.push({
      title: `Step ${flows[flowIndex].steps.length + 1}`,
      action: { type: 'api', details: apiCallDetails },
    });
    setFlows(updatedFlows);
  };

  const removeStep = (flowIndex: number, stepIndex: number): void => {
    const updatedFlows = [...flows];
    updatedFlows[flowIndex].steps.splice(stepIndex, 1);
    setFlows(updatedFlows);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Automation Builder</h1>
      <div className="space-y-6">
        {flows.map((flow, flowIndex) => (
          <div key={flowIndex} className="border p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">
              Automation {flowIndex + 1}
            </h2>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Trigger Description:
              </label>
              <textarea
                className="border rounded w-full p-2"
                value={flow.trigger}
                onChange={(e) => {
                  const updatedFlows = [...flows];
                  updatedFlows[flowIndex].trigger = e.target.value;
                  setFlows(updatedFlows);
                }}
              />
            </div>
            <ul className="space-y-4">
              {flow.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="border rounded p-3">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <button
                      onClick={() => removeStep(flowIndex, stepIndex)}
                      className="text-red"
                    >
                      Remove
                    </button>
                  </div>
                  {step.action.type === 'code' ? (
                    <div>
                      <label className="block mb-2 font-semibold">
                        Insert Code:
                      </label>
                      <textarea
                        className="border rounded w-full p-2"
                        value={step.action.details as string}
                        onChange={(e) => {
                          const updatedFlows = [...flows];
                          updatedFlows[flowIndex].steps[
                            stepIndex
                          ].action.details = e.target.value;
                          setFlows(updatedFlows);
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block mb-2 font-semibold">
                        API Endpoint:
                      </label>
                      <input
                        type="text"
                        className="border rounded w-full p-2 mb-2"
                        placeholder="Enter API Endpoint"
                        value={
                          ((step.action.details as APICallDetails)?.endpoint ||
                            '') as string
                        }
                        onChange={(e) => {
                          const updatedFlows = [...flows];
                          if (
                            typeof updatedFlows[flowIndex].steps[stepIndex]
                              .action.details === 'object'
                          ) {
                            (
                              updatedFlows[flowIndex].steps[stepIndex].action
                                .details as APICallDetails
                            ).endpoint = e.target.value;
                            setFlows(updatedFlows);
                          }
                        }}
                      />
                      {/* Additional API Call fields can be added here */}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  addCodeStep(
                    flowIndex,
                    `// Insert your code for Step ${flow.steps.length + 1}`,
                  )
                }
                className="mt-4 px-3 py-1 bg-blue text-white rounded"
              >
                Insert Code
              </button>
              <button
                onClick={() =>
                  addAPICallStep(flowIndex, {
                    endpoint: '',
                    method: 'GET',
                    body: '',
                    // Other API call details can be initialized here
                  })
                }
                className="mt-4 px-3 py-1 bg-green text-white rounded"
              >
                API Call
              </button>
            </div>
            <button
              onClick={() => removeAutomation(flowIndex)}
              className="mt-4 px-3 py-1 bg-red text-white rounded"
            >
              Remove Automation
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addAutomation}
        className="mt-6 px-4 py-2 bg-green text-white rounded"
      >
        Add Automation
      </button>
    </div>
  );
};

export default CreateAutomatisering;
