//workflows.jsx
import React, { useState } from "react";
import { Octokit } from "@octokit/rest";
import { Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const Workflows = () => {
  const [responseMessage, setResponseMessage] = useState(null);

  const triggerWorkflow = async () => {
    try {
      const octokit = new Octokit({
        auth: process.env.TOKEN_TO_RUN_WORKFLOW,
      });

      const response = await octokit.request(
        "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
        {
          owner: "ipaul1996",
          repo: "git-workflow-test",
          workflow_id: "main.yml",
          ref: "main",
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            accept: "application/vnd.github+json",
          },
        }
      );

      // setResponseMessage(`Initiating deployment`);
    } catch (error) {
      setResponseMessage(`Error triggering workflow: ${error.message}`);
    }
  };

  return (
    <div>
      <Button className="btn btn-secondary" onClick={triggerWorkflow}>
        Publish
      </Button>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Workflows;
