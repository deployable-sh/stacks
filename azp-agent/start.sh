#!/bin/bash
set -e

if [ -z "$AZP_URL" ] || [ -z "$AZP_TOKEN" ]; then
  echo "error: AZP_URL and AZP_TOKEN are required" >&2
  exit 1
fi

AZP_AGENT_NAME=${AZP_AGENT_NAME:-$(hostname)}
AZP_POOL=${AZP_POOL:-Default}
AZP_WORK=${AZP_WORK:-_work}

cleanup() {
  ./config.sh remove --unattended --auth PAT --token "$AZP_TOKEN" || true
}
trap cleanup EXIT

if [ ! -f .agent ]; then
  echo "Downloading Azure Pipelines agent..."
  AZP_AGENT_PACKAGE=$(curl -LsS -u user:"$AZP_TOKEN" \
    -H "Accept:application/json" \
    "$AZP_URL/_apis/distributedtask/packages/agent?platform=linux-x64&top=1" \
    | jq -r ".value[0].downloadUrl")
  curl -LsS "$AZP_AGENT_PACKAGE" | tar -xz

  ./config.sh --unattended \
    --agent "$AZP_AGENT_NAME" \
    --url "$AZP_URL" \
    --auth PAT \
    --token "$AZP_TOKEN" \
    --pool "$AZP_POOL" \
    --work "$AZP_WORK" \
    --replace \
    --acceptTeeEula
fi

exec ./run.sh
