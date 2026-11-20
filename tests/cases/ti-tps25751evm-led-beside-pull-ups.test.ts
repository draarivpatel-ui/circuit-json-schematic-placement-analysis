import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import { createTiTps25751EvmLedBesidePullUps } from "../assets/ti-tps25751evm-led-beside-pull-ups"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("does not treat TI TPS25751EVM D3 and R13, which only share a rail, as a series pair", async () => {
  const circuitJson = await createTiTps25751EvmLedBesidePullUps()
  expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
  const analysis = analyzeSchematicPlacement(circuitJson, {
    issueTypes: ["DiodeResistorNotAligned"],
  })
  // D3 and R13 only share the 730_LDO_3V3 rail; D3's series resistor is R19,
  // so there is nothing to align end to end.
  expect(analysis.getIssues()).toEqual([])
  expect(
    createSchematicAnalysisFixtureSvg({
      circuitJson,
      analysis,
      highlightIssues: true,
    }),
  ).toMatchSvgSnapshot(import.meta.path)
})
