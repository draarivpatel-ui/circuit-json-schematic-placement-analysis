import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import { createTiTps25751EvmResetClamp } from "../assets/ti-tps25751evm-reset-clamp"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("reports TI TPS25751EVM D10 and R85, which sit in parallel, as a series pair", async () => {
  const circuitJson = await createTiTps25751EvmResetClamp()
  expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
  const analysis = analyzeSchematicPlacement(circuitJson, {
    issueTypes: ["DiodeResistorNotAligned"],
  })
  // Current behavior: D10 and R85 both connect TIVA_P3V3 and T_RST, but the wire between them is treated as a series link.
  expect(analysis.getIssues()).toMatchObject([
    {
      diodeSchematicBox: { sourceComponentName: "D10" },
      resistorSchematicBox: { sourceComponentName: "R85" },
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
