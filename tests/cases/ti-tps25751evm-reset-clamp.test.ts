import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import { createTiTps25751EvmResetClamp } from "../assets/ti-tps25751evm-reset-clamp"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("does not treat TI TPS25751EVM D10 and R85, which sit in parallel, as a series pair", async () => {
  const circuitJson = await createTiTps25751EvmResetClamp()
  expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
  const analysis = analyzeSchematicPlacement(circuitJson, {
    issueTypes: ["DiodeResistorNotAligned"],
  })
  // D10 and R85 both connect TIVA_P3V3 and T_RST, so they are a parallel pair
  // with nothing to align end to end.
  expect(analysis.getIssues()).toEqual([])
  expect(
    createSchematicAnalysisFixtureSvg({
      circuitJson,
      analysis,
      highlightIssues: true,
    }),
  ).toMatchSvgSnapshot(import.meta.path)
})
