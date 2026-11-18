import { expect, test } from "bun:test"
import { Circuit } from "@tscircuit/core"
import {
  analyzeSchematicPlacement,
  createSchematicPlacementIssueArtifacts,
} from "lib/index"
import { expectReproNets } from "../fixtures/placement-repro-assertions"

test("suggests a fuse symbol for the ValveBoard series fuse without asking for rotation", async () => {
  const circuit = new Circuit()
  circuit.pcbDisabled = true
  circuit.add(
    <board schTraceAutoLabelEnabled={false}>
      <chip
        name="F1"
        manufacturerPartNumber="MF-PSMF050X-2"
        pinLabels={{ pin1: "IN", pin2: "OUT" }}
        schPinArrangement={{ leftSide: [1], rightSide: [2] }}
      />
      <net name="VIN12" isPowerNet />
      <net name="V12" isPowerNet />
      <trace from="net.VIN12" to=".F1 > .pin1" />
      <trace from=".F1 > .pin2" to="net.V12" />
    </board>,
  )
  await circuit.renderUntilSettled()
  const circuitJson = circuit.getCircuitJson()
  expectReproNets(circuitJson, [
    ["net.VIN12", "F1.pin1"],
    ["F1.pin2", "net.V12"],
  ])

  const issueTypes = [
    "TwoPinComponentShouldBeVertical",
    "FuseShouldUseSchematicSymbol",
  ] as const
  const analysis = analyzeSchematicPlacement(circuitJson, { issueTypes })
  const issues = analysis.getIssues()
  expect(issues).toHaveLength(1)
  expect(issues[0]).toMatchObject({
    lineItemType: "FuseShouldUseSchematicSymbol",
    severity: "warning",
    schematicBox: { sourceComponentName: "F1" },
    message: "Use a fuse symbol for F1.",
  })
  expect(analysis.getIssueCounts().FuseShouldUseSchematicSymbol).toBe(1)

  const [artifact] = createSchematicPlacementIssueArtifacts(circuitJson, {
    analysis,
    width: 900,
    height: 460,
  })
  expect(artifact?.descriptionXml).toContain('severity="warning"')
  expect(artifact?.bounds).toBeDefined()
  expect(artifact!.content).toMatchSvgSnapshot(import.meta.path)

  const withoutConventionWarning = circuitJson.filter(
    (element) => element.type !== "source_refdes_convention_warning",
  )
  expect(
    analyzeSchematicPlacement(withoutConventionWarning, {
      issueTypes,
    }).getIssues(),
  ).toHaveLength(0)
})
