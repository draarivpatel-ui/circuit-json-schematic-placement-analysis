import { expect, test } from "bun:test"
import { analyzeSchematicPlacement } from "lib/index"
import { createTiTps25751EvmLedBesidePullUps } from "../assets/ti-tps25751evm-led-beside-pull-ups"
import { createSchematicAnalysisFixtureSvg } from "../fixtures/create-schematic-analysis-fixture-svg"

test("reports TI TPS25751EVM D3 and R13, which only share a rail, as a series pair", async () => {
  const circuitJson = await createTiTps25751EvmLedBesidePullUps()
  expect(circuitJson.filter((e) => e.type.endsWith("_error"))).toEqual([])
  const analysis = analyzeSchematicPlacement(circuitJson, {
    issueTypes: ["DiodeResistorNotAligned"],
  })
  // Current behavior: D3's series resistor is R19, but the wire along the 730_LDO_3V3 rail to R13 is treated as a series link.
  expect(analysis.getIssues()).toMatchObject([
    {
      diodeSchematicBox: { sourceComponentName: "D3" },
      resistorSchematicBox: { sourceComponentName: "R13" },
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
