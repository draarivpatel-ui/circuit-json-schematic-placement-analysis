import { expect, test } from "bun:test"
import { Circuit } from "@tscircuit/core"
import { analyzeSchematicPlacement } from "lib/index"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("still reports an LED and its series resistor joined by a bent wire", async () => {
  const circuit = new Circuit()
  circuit.pcbDisabled = true
  circuit.add(
    <board schLayout={{ layoutMode: "none" }} schMaxTraceDistance={10}>
      <net name="V3V3" isPowerNet />
      <net name="GND" isGroundNet />
      <led name="D1" color="red" schX={0} schY={2} schRotation={270} />
      <resistor name="R1" resistance="1k" schX={2} schY={-1} />
      <trace from=".D1 > .anode" to="net.V3V3" />
      <trace from=".D1 > .cathode" to=".R1 > .pin1" />
      <trace from=".R1 > .pin2" to="net.GND" />
    </board>,
  )
  await circuit.renderUntilSettled()
  const circuitJson = circuit.getCircuitJson()
  expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
  const analysis = analyzeSchematicPlacement(circuitJson, {
    issueTypes: ["DiodeResistorNotAligned"],
  })
  // D1's cathode and R1 share a private node: a real series pair.
  expect(analysis.getIssues()).toMatchObject([
    {
      diodeSchematicBox: { sourceComponentName: "D1" },
      resistorSchematicBox: { sourceComponentName: "R1" },
    },
  ])
  expect(
    createSchematicAnalysisFixtureSvg({
      circuitJson,
      analysis,
      highlightIssues: true,
    }),
  ).toMatchSvgSnapshot(import.meta.path)
})
